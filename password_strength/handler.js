'use strict';
const { verifyLength, verifyStrength } = require('./constraints');


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
    /*
      If any verification of the password return a Promise.reject() 
      we will enter here
    */
    return {
      statusCode: 400,
      body: JSON.stringify({
        message: 'Error! ' + e.message + '.',
        score: e.score ? `Score: ${e.score}` : 'Improve the length of your pass to see this.'
      })
    }
  } 
};
