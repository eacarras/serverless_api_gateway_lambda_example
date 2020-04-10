module.exports = password => {
    if (password.length < 8) {
        return Promise.reject({
            message: 'The password is too short..'
        });
    }
    return Promise.resolve('The password have the correct length');
}