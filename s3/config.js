const {
  SECRET_ACCESS_KEY,
  ACCESS_KEY,
  DEFAULT_REGION,
  SIGNATURE_VERSION,
  DEFAULT_BUCKET,
  SIGNATURE_EXPIRES,
} = process.env;

module.exports = {
  awsConfig: {
    credentials: {
      accessKeyId: ACCESS_KEY,
      secretAccessKey: SECRET_ACCESS_KEY,
    },
    region: DEFAULT_REGION,
    signatureVersion: SIGNATURE_VERSION,
  },
  awsGetObjectParams: {
    Bucket: DEFAULT_BUCKET,
    // Expires: +SIGNATURE_EXPIRES * 60,
  },
  awsPutObjectParams: {
    Bucket: DEFAULT_BUCKET,
    // Expires: +SIGNATURE_EXPIRES,
    ACL: "private",
  },
  s3Options: {
    bucket: DEFAULT_BUCKET,
    region: DEFAULT_REGION,
    signatureVersion: SIGNATURE_VERSION,
    signatureExpires: +SIGNATURE_EXPIRES,
    ACL: "private",
    uniquePrefix: true,
  },
};
