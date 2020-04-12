'use strict';
const serverless = require('serverless-http');
const express = require('express');
const app = express();
const AWS = require('aws-sdk');
const bodyParser = require('body-parser');

const USERS_ENV = process.env.USERS_ENV;
const IS_OFFLINE = process.env.IS_OFFLINE;

let dynamoDb;
if (IS_OFFLINE === 'true') {
  dynamoDb = new AWS.DynamoDB.DocumentClient({
    region: 'localhost',
    endpoint: 'http://localhost:8000',
  });
} else {
  dynamoDb = AWS.DynamoDB.DocumentClient();
}
app.use(bodyParser.urlencoded({ extended: true, }));


// Generic route
app.get('/', (_, resp) => {
  resp.send('The endpoint is working without problems...');
});

// Route for insert an user
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
        error_message: 'User can not be inserted, ' + error,
      });
    }

    resp.json({ userId, name });
  });
});

// Route for get all the users
app.get('/users', (_, resp) => {
  const params = {
    TableName: USERS_ENV,
  };

  dynamoDb.scan(params, (error, result) => {
    if (error) {
      resp.status(400).json({
        error_message: 'We can not get the users, ' + error,
      });
    }

    const { Items } = result;
    resp.json({
      success: true,
      message: 'Users getted successfully.',
      users: Items,
    });
  });
});

// Route for get one specific user
app.get('/user/:userId', (req, resp) => {
  const params = {
    TableName: USERS_ENV,
    Key: {
      userId: req.params.userId,
    },
  };

  dynamoDb.get(params, (error, result) => {
    if (error) {
      return resp.status(400).json({
        error_message: 'We can not get the user specified, ' + error,
      });
    }

    if (result.Item) {
      const { userId, name } = result.Item;
      return resp.json({
        userId, name,
      });
    }
    
    resp.status(404).json({ error: 'User not found..', });
  });
});

module.exports.handleExpress = serverless(app);