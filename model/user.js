
const COLLECTION_NAME = 'Users',
    dbOpt = require('../lib/db'),
    shortid = require('shortid'),
    Joi = require('joi');

/**
* Import npm package
*/

class User {

    constructor() {

    }

    static saveUser(user) {

        return new Promise((res, rej) => {

            let objUser = new UserModel();
            // TODO: need to assing each fields;
            objUser._id = shortid.generate();
            objUser.firstName = user.firstName;
            objUser.login = user.email;
            objUser.password = user.password;
            objUser.email = user.email;
            objUser.dates.createdOn = new Date().toISOString();
            //TODO: check User validation
            dbOpt.save(objUser, COLLECTION_NAME).then((data) => {
                res(data);
            }).catch((error) => {
                rej(error);
            });
        });
    }

    static validateLogin(user) {

        const schema = Joi.object().keys({
            emailId: Joi.string().email().required(),
            password: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/)
        });
        const result = Joi.validate({
            emailId: user.emailId, password: user.password
        }, schema);
        return (result.error) ? true : false;
    }
}

class Dates {

    constructo() {
        this.createdOn = new Date().toISOString();
        this.updateOn = '';
        this.activateOn = '';
        this.statusChangeOn = '';
        this.lastLoginOn = '';
        this.lastPaswordChangeOn = '';
    }
}

class UserModel {

    constructor() {

        this._id = '';
        this.firstName = '';
        this.middleName = '';
        this.lastName = '';
        this.Dob = '';
        this.gender = '';
        this.mobileNo = '';
        this.login = '';
        this.password = '';
        this.dates = new Dates();
        this.clientId = '';
        this.status = 'ACTIVE';// Active or // Deactive
    }
}


module.exports = User;