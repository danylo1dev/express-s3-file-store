const express = require("express");
const router = express.Router();
const mime = require("mime-types");
const getS3PutLink = require("./getS3PutLink");
const getS3SignedLink = require("./getS3SignedLink");

router.post("/get-put-link", async (req, res) => {
  const { fileName, fileSize, fileType } = req.body;

  const uniqueKeyName = `${Date.now().toString()}-${encodeURIComponent(
    fileName
  )}`;
  const mimeType = mime.lookup(fileName);
  const signedLink = await getS3PutLink(uniqueKeyName, mimeType);
  res.json({
    signedLink,
    mimeType,
    uniqueKeyName,
  });
});
router.post("/finalize-upload", async (req, res) => {
  const { key } = req.body;
  const signedLink = getS3SignedLink(key);
  res.json(signedLink);
});
module.exports = router;
