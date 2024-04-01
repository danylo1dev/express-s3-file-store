const aws = require("aws-sdk");
const config = require("./config");
const mime = require("mime-types");
const {
  S3Client,
  PutObjectCommand,
  GetObjectCommand,
} = require("@aws-sdk/client-s3");

aws.config.update(config.awsConfig);

const client = new S3Client({ ...config.awsConfig, ...config.s3Options });

const getS3PutLink = async (uniqueS3Key, mimeType) => {
  const params = {
    Key: uniqueS3Key,
    ContentType: mimeType,
    ...config.awsPutObjectParams,
  };
  const putObjectCommand = new PutObjectCommand(params);
  const response = await client.send(putObjectCommand);
  return response;
};
const getS3SignedLink = async (key) => {
  const params = {
    Key: key,
    ...config.awsGetObjectParams,
  };
  const getObjectCommand = new GetObjectCommand(params);
  const response = await client.send(getObjectCommand);
  return response;
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
