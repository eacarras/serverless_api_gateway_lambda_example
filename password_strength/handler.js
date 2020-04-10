'use strict';

const verifyLength = require('./constraints/verify_password_length');
const verifyStrength = require('./constraints/verify_password_strength');


module.exports.password = async event => {
  try {
    const { password } = event.pathParameters;

    await verifyLength(password);
    const { score } = await verifyStrength(password);

    return {
      statusCode: 200,
      body: JSON.stringify({
        message: `You password is strong!. Score: ${score}.`
      })
    }
  } catch (e) {
    // If verify password return a Promise.reject() we will enter here
    return {
      statusCode: 400,
      body: JSON.stringify({
        message: 'Error! ' + e.message + '.',
        score: e.score ? `Score: ${e.score}` : 'Improve the length of your pass to see this.'
      })
    }
  } 
};
