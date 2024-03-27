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
const getS3SignedLink = (key) => {
  const s3 = new aws.S3({});
  const params = {
    Key: key,
    ...config.awsGetObjectParams,
  };
  const signedUrl = s3.getSignedUrl("getObject", params);
  return signedUrl;
};

module.exports = {
  getPutLink: async (fileName) => {
    const uniqueKeyName = `${Date.now().toString()}-${encodeURIComponent(
      fileName
    )}`;
    const mimeType = mime.lookup(fileName);
    const signedLink = await getS3PutLink(uniqueKeyName, mimeType);
    return {
      signedLink,
      mimeType,
      uniqueKeyName,
    };
  },
  finalizeUpload: async (req, res) => {
    const { key } = req.body;
    return getS3SignedLink(key);
  },
};
