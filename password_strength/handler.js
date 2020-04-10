'use strict';

const verifyLength = require('./constraints/verify_password_length');


module.exports.password = async event => {
  try {
    const { password } = event.pathParameters;
    await verifyLength(password);

    return {
      statusCode: 200,
      body: JSON.stringify({
        message: 'You password is strong!.'
      })
    }
  } catch (e) {
    // If verify password return a Promise.reject() we will enter here
    return {
      statusCode: 400,
      body: JSON.stringify({
        message: 'Error! ' + e.message + '.'
      })
    }
  } 
};
