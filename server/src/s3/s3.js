const express = require("express");
const router = express.Router();
const aws = require("aws-sdk");
const fs = require("fs");
const path = require("path");

// Configuration for aws s3
aws.config.update({ region: "eu-west-1" });
const s3 = new aws.S3();
const defaultBucket = "randohub";

const uploadFile = (file, bucket = defaultBucket) => {
  const uploadParams = { Bucket: bucket };
  const fileStream = fs.createReadStream(file);
  fileStream.on("error", (err) => {
    console.log("File Error", err);
  });
  uploadParams.Body = fileStream;
  uploadParams.Key = path.basename(file);

  s3.upload(uploadParams, (err, data) => {
    if (err) console.log("Error", err);
    if (data) console.log("Upload Success", data.Location);
  });
};

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
    else res.status(200).send(data);
  });
});

const listBuckets = () =>
  s3.listBuckets((err, data) => {
    if (err) console.log("Error: " + err);
    else console.log(data.Buckets);
  });

module.exports = router;
