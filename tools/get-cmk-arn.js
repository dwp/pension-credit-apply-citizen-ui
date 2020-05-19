const { KMS } = require('@aws-crypto/client-node');

const AWS_ACCESS_KEY_ID = process.env.AWS_ACCESS_KEY_ID || 'foo';
const AWS_SECRET_ACCESS_KEY = process.env.AWS_SECRET_ACCESS_KEY || 'bar';
const AWS_REGION = process.env.AWS_REGION || 'eu-west-2';
const AWS_KMS_ENDPOINT = process.env.AWS_KMS_ENDPOINT || 'http://localhost:4566';

const alias = process.argv[process.argv.length - 1];

async function getKeyArn(keyAlias) {
  const kms = new KMS({
    endpoint: AWS_KMS_ENDPOINT,
    region: AWS_REGION,
    credentials: {
      accessKeyId: AWS_ACCESS_KEY_ID,
      secretAccessKey: AWS_SECRET_ACCESS_KEY,
    },
  });

  const info = await kms.describeKey({
    KeyId: keyAlias,
  }).promise();

  return info.KeyMetadata.Arn;
}

getKeyArn(alias).then(console.log).catch(console.error);
