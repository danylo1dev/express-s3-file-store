const aws = require("aws-sdk");
require("dotenv").config();
const {
  SECRET_ACCESS_KEY,
  ACCESS_KEY,
  DEFAULT_REGION,
  SIGNATURE_VERSION,
  DEFAULT_BUCKET,
  SIGNATURE_EXPIRES,
} = process.env;

aws.config.update({
  accessKeyId: ACCESS_KEY,
  secretAccessKey: SECRET_ACCESS_KEY,
  region: DEFAULT_REGION,
  signatureVersion: SIGNATURE_VERSION,
});

const getS3PutLink = (uniqueS3Key, mimeType, bucket = DEFAULT_BUCKET) => {
  return new Promise(async (resolve, reject) => {
    const options = {
      bucket,
      region: DEFAULT_REGION,
      signatureVersion: SIGNATURE_VERSION,
      signatureExpires: +SIGNATURE_EXPIRES,
      ACL: "private",
      uniquePrefix: true,
    };
    const s3 = new aws.S3(options);
    const params = {
      Bucket: DEFAULT_BUCKET,
      Key: uniqueS3Key,
      Expires: +SIGNATURE_EXPIRES,
      ContentType: mimeType,
      ACL: "private",
    };
    console.log(params);
    s3.getSignedUrl("putObject", params, (err, signedLink) => {
      if (err) {
        reject(err);
      }
      resolve(signedLink);
    });
  });
};

module.exports = getS3PutLink;
