const aws = require("aws-sdk");
const config = require("./config");

aws.config.update(config.awsConfig);

const getS3SignedLink = (key) => {
  const s3 = new aws.S3({});
  const params = {
    Key: key,
    ...config.awsGetObjectParams,
  };
  const signedUrl = s3.getSignedUrl("getObject", params);
  return signedUrl;
};

module.exports = getS3SignedLink;
