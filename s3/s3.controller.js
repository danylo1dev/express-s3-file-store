const service = require("./s3.service");

module.exports = {
  getPutLink: async (req, res) => {
    const { fileName } = req.body;
    const result = await service.getPutLink(fileName);
    res.json(result);
  },
  finalizeUpload: async (req, res) => {
    const { key } = req.body;
    const signedLink = getS3SignedLink(key);
    res.json(signedLink);
  },
};
