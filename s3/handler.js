'use strict';

const serverless = require('serverless-http');
const AWS = require('aws-sdk');
const s3 = new AWS.S3();
const multer = require('multer');
const multerS3 = require('multer-s3');

const express = require('express');
const app = express()

const upload = multer({
  storage: multerS3({
    s3,
    acl: 'public-read',
    bucket: process.env.bucket,
    key: (req, file, callback) => {
      const fileExtension = file.originalname.split('.')[1];
      callback(null, `${Date.now().toString()}.${fileExtension}`);
    }
  })
}).array('photo', 10); // This will help us to handle better the errors

app.post('/upload', (req, resp) => {
  upload(req, res, (err) => {
    if (err) {
      resp.send(err).status(500);
    } else {
      resp.send('File upload successfully').status(200);
    }
  });
});

module.exports.app = serverless(app);