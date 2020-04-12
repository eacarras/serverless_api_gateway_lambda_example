'use strict';
const serverless = require('serverless-http');
const express = require('express');
const app = express();


app.get('/', (req, resp) => {
  resp.send('Hello from Express World')
})

module.exports.handleExpress = serverless(app);