const LocalKeyProvider = require('<redacted>/LocalKeyProvider');
const KmsKeyProvider = require('<redacted>/KmsKeyProvider');
const CryptoService = require('<redacted>');

function makeLocalKeyProvider() {
  return new LocalKeyProvider({
    keySize: 256,
    keyCipher: Buffer.from('ONLY USED FOR LOCAL'),
  });
}

function makeKmsKeyProvider(cmkId, endpointUrl) {
  return new KmsKeyProvider({
    cmkId,
    keySpec: 'AES_256',
    endpointUrl,
  });
}

module.exports = ({
  logger, mode, keyAlias, awsEndpointUrl,
}) => {
  logger.info(`Creating new cryto service with mode: ${mode}`);

  let keyProvider;

  if (mode === 'local') {
    keyProvider = makeLocalKeyProvider();
  } else if (mode === 'kms') {
    keyProvider = makeKmsKeyProvider(keyAlias, awsEndpointUrl);
  } else {
    logger.warn('Encryption is disabled');
    return null;
  }

  return new CryptoService(keyProvider);
};
