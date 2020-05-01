const { randomBytes } = require('crypto');
const {
  RawAesKeyringNode,
  RawAesWrappingSuiteIdentifier,
  KmsKeyringNode,
  getLocalCryptographicMaterialsCache,
  NodeCachingMaterialsManager,
  getClient,
  KMS,
} = require('@aws-crypto/client-node');

function makeLocalKeyRing(logger, masterKey) {
  // Note that if a master key is not provided, a random one will be generated,
  // which makes the app unscalabale across multiple instances.
  if (!(masterKey instanceof Uint8Array)) {
    logger.warn('No master key has been defined for local mode. This app will not scale.');
  }

  return new RawAesKeyringNode({
    keyNamespace: 'pencred',
    keyName: 'apply-citizen-ui-session-key',
    unencryptedMasterKey: masterKey || randomBytes(32),
    wrappingSuite: RawAesWrappingSuiteIdentifier.AES256_GCM_IV12_TAG16_NO_PADDING,
  });
}

function makeKmsKeyRing(
  logger,
  cmkId,
  cacheTtl = 30,
  cacheCapacity = 100,
  cacheReuse = 100,
  endpoint,
) {
  // Setup a KMS client provider if using a ciustom endpoint (i.e. localstack)
  logger.info(`Setting up KMS client with endpoint: ${endpoint || 'default'}`);
  const clientProvider = endpoint ? getClient(KMS, { endpoint }) : undefined;

  // Default encryption algortihm: AES-256-GCM + HKDF + ECDSA
  // ref: https://docs.aws.amazon.com/encryption-sdk/latest/developer-guide/concepts.html#crypto-algorithm
  const kmsKeyring = new KmsKeyringNode({
    generatorKeyId: cmkId, // Could use an alias here
    keyIds: [cmkId], // Cannot be an alias. Ideally should be different key
    clientProvider,
  });

  // We'll use a caching keyring for performance reasons. This will prevent
  // too many calls to the KMS service.
  logger.info(`Configured key cache: ${cacheTtl} ttl, ${cacheCapacity} capacity, ${cacheReuse} reuse`);
  return new NodeCachingMaterialsManager({
    // Keyring to encrypt/decrypt encryption keys
    backingMaterials: kmsKeyring,

    // Max. no. cached keys at any one time; oldest purged
    cache: getLocalCryptographicMaterialsCache(cacheCapacity),

    // Max age of each cached key
    maxAge: cacheTtl * 1000,

    // Allows multiple instances of the CMM to share the cache of keys;
    partition: 'pencred-apply-citizen-ui',

    // Max no. bytes encrypted with the same key
    // maxBytesEncrypted,

    // Max. no. messages that are encrypted using the same key
    maxMessagesEncrypted: cacheReuse,
  });
}

module.exports = ({
  logger,
  mode,
  kmsEndpoint,
  kmsKeyArn,
  kmsCacheTtl,
  kmsCacheCapacity,
  kmsCacheReuse,
  localMasterKey,
}) => {
  logger.info(`Creating new cryto service with mode: ${mode}`);

  let keyring;

  if (mode === 'local') {
    keyring = makeLocalKeyRing(logger, localMasterKey);
  } else if (mode === 'kms') {
    keyring = makeKmsKeyRing(
      logger,
      kmsKeyArn,
      kmsCacheTtl,
      kmsCacheCapacity,
      kmsCacheReuse,
      kmsEndpoint,
    );
  } else {
    logger.warn('Encryption is disabled');
    return null;
  }

  return keyring;
};
