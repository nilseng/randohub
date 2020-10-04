const express = require("express");
const router = express.Router();
const aws = require("aws-sdk");
const fs = require("fs");
const path = require("path");
const multer = require("multer");
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Configuration for aws s3
aws.config.update({ region: "eu-west-1" });
const s3 = new aws.S3();
const defaultBucket = "randohub";

router.post("/object", upload.array("images"), (req, res) => {
  if (!req.body || !req.body.imageIds)
    return res.status(400).json({ Error: "No imageIds in request" });
  if (!req.files || !req.files.length === 0)
    return res.status(400).json({ Error: "No files in request" });
  const uploadParams = {
    Bucket: req.body.bucket ? req.body.bucket : defaultBucket,
  };
  for ([i, file] of req.files.entries()) {
    uploadParams.Body = file.buffer;
    if (Array.isArray(req.body.imageIds))
      uploadParams.Key = `${req.body.imageIds[i]}${path.extname(
        file.originalname
      )}`;
    else
      uploadParams.Key = `${req.body.imageIds}${path.extname(
        file.originalname
      )}`;
    s3.upload(uploadParams, (err, data) => {
      if (err) console.log("Error", err);
      if (data) console.log("Upload Success", data.Location);
      if (i === req.files.length - 1)
        res.status(200).json("File(s) sucessfully uploaded");
    });
  }
});

const listObjects = (bucket = defaultBucket) => {
  const bucketParams = { Bucket: bucket };
  s3.listObjectsV2(bucketParams, (err, data) => {
    if (err) console.log("Error", err);
    else console.log("Success", data);
  });
};

router.get("/object/:key", (req, res) => {
  if (!req.params.key) return res.status(400).json("Missing object key");
  const params = {
    Bucket: req.params.bucket ? req.params.bucket : defaultBucket,
    Key: req.params.key,
  };
  s3.getObject(params, (err, data) => {
    if (err) res.status(400).json(err);
    else res.status(200).send(data.Body);
  });
});

const listBuckets = () =>
  s3.listBuckets((err, data) => {
    if (err) console.log("Error: " + err);
    else console.log(data.Buckets);
  });

module.exports = router;
