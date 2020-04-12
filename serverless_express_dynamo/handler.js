'use strict';
const serverless = require('serverless-http');
const express = require('express');
const app = express();
const AWS = require('aws-sdk');
const bodyParser = require('body-parser');

const USERS_ENV = process.env.USERS_ENV;

const dynamoDb = AWS.DynamoDB.DocumentClient();
app.use(bodyParser.urlencoded({ extended: true, }));


app.get('/', (_, resp) => {
  resp.send('The endpoint is working without problems...');
});

app.post('/user', (req, resp) => {
  const { userId, name } = req.body;
  const params = {
    TableName: USERS_ENV,
    Item: {
      userId, name,
    }
  };

  dynamoDb.put(params, (error) => {
    if (error) {
      resp.status(400).json({
        error_message: 'No se ha podido insertar usuario, ' + error;
      });
    }

    resp.json({ userId, name });
  });
});

module.exports.handleExpress = serverless(app);