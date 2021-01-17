// const bcrypt = require('bcryptjs');
const crypto = require('crypto');

const getHashedPassword = (password) => {
    const secret = 'abcdefg';
    const hash = crypto.createHmac('sha256', secret)
                   .update(password)
                   .digest('hex');
    console.log(hash);
    return hash;
//     const sha256 = crypto.createHash('sha256');
//     const hash = sha256.update(password).digest('base64');
//     return hash;
}

function comparePass(userPassword, databasePassword) {
    return getHashedPassword(userPassword.toString()) == databasePassword;
}

module.exports = {
  comparePass,
  getHashedPassword
};
