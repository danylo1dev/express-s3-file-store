const aws = require("aws-sdk");
const config = require("./config");

aws.config.update(config.awsConfig);

const getS3PutLink = (uniqueS3Key, mimeType) => {
  return new Promise(async (resolve, reject) => {
    const options = {
      ...config.s3Options,
    };
    const s3 = new aws.S3(options);
    const params = {
      Key: uniqueS3Key,
      ContentType: mimeType,
      ...config.awsPutObjectParams,
    };
    s3.getSignedUrl("putObject", params, (err, signedLink) => {
      if (err) {
        reject(err);
      }
      resolve(signedLink);
    });
  });
};

module.exports = getS3PutLink;
