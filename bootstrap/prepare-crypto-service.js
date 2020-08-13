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
  cacheTtl,
  cacheCapacity,
  cacheReuse,
  endpoint,
) {
  // Setup a KMS client provider if using a custom endpoint (i.e. localstack)
  logger.info(`Setting up KMS client with endpoint: ${endpoint || 'default'}`);
  const clientProvider = endpoint ? getClient(KMS, { endpoint }) : undefined;

  // Prepare keyring
  const kmsKeyring = new KmsKeyringNode({
    generatorKeyId: cmkId, // Could use alias here only if same key's full ARN is in keyIds too
    keyIds: [cmkId], // Cannot be an alias. Ideally should be different key
    clientProvider,
  });

  // We'll use a caching keyring for performance reasons. This will prevent
  // too many calls to the KMS service.
  logger.info(`Configured key cache: ${cacheTtl} ttl, ${cacheCapacity} capacity, ${cacheReuse} reuse`);
  return new NodeCachingMaterialsManager({
    // Keyring to encrypt/decrypt encryption keys
    backingMaterials: kmsKeyring,

    // Max. no. cached keys to hold at any one time; the oldest will be purged
    // to make way for new keys.
    cache: getLocalCryptographicMaterialsCache(cacheCapacity),

    // Max age of each cached key (ms)
    // Once the key reaches this age it is purged from the cache and will need
    // to be re-fetched from KMS.
    maxAge: cacheTtl * 1000,

    // Allows multiple local instances of the CMM to share the cache of keys.
    // This only makes a difference is multiple in-memory caches are created.
    partition: 'pencred-apply-citizen-ui',

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
