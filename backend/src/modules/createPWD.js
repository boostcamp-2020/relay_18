const crypto = require('crypto-promise');


const createPWD = async (pwd) =>{
    let cryptoPWD = await crypto.hmac('sha1', 'secret')(pwd);
    return cryptoPWD.toString('hex');
}

module.exports = createPWD;