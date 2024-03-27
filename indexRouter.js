const express = require("express");
const router = express.Router();
const mime = require("mime-types");
const getS3PutLink = require("./getS3PutLink");

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
module.exports = router;
