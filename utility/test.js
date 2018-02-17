const crypto = require('crypto');
const cryptoAlgothm = 'aes192'; //`${global.locator.get('config').cryptoAlgothm}`;
const cryptoPwd = 'testabc123!@#$&%$';//`${global.locator.get('config').cryptoPwd}`;

const encodeString = (plainStr) => {
    const cipher = crypto.createCipher(cryptoAlgothm, cryptoPwd);
    let encrypted = cipher.update(plainStr, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    console.log(encrypted);
    return encrypted;
};

const decodeString = (encodeString) => {
    const decipher = crypto.createDecipher(cryptoAlgothm, cryptoPwd);
    let decrypted = '';
    try {
        decrypted = decipher.update(encodeString, 'hex', 'utf8');
        decrypted += decipher.final('utf8');
        console.log(decrypted);
    }
    catch (error) {
        console.log(error);
        return '';
    }
    return decrypted;
};

let data = encodeString('nihalahmedbismillah');
console.log(data);
let data2 = decodeString(data);
console.log(data2);
