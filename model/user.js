
const COLLECTION_NAME = 'Users',
    dbOpt = require('../lib/db'),
    shortid = require('shortid'),
    Joi = require('joi'),
    _ = require('lodash');
const DEFAULTPAGESIZE = 3;
/**
* Import npm package
*/

class User {

    constructor() {

    }

    static getUserList(pageNo) {

        let pageSize = DEFAULTPAGESIZE;
        return dbOpt.findWithPaginantion(pageNo, pageSize, COLLECTION_NAME);
    }

    static getUserByEmailId(email) {

        let query = { login: email };
        return dbOpt.findOne(query, COLLECTION_NAME);

    }
    static saveUser(user) {

        return new Promise((res, rej) => {

            let objUser = _.assign(new UserModel(), user);
            objUser._id = shortid.generate();
            let error = User.validateLogin(objUser);
            if (!error) {
                dbOpt.save(objUser, COLLECTION_NAME).then((data) => {
                    res(data);
                }).catch((error) => {
                    rej(error);
                });
            } else {
                res(error);
            }
        });
    }

    static validateLogin(user) {

        const schema = Joi.object().keys({
            email: Joi.string().email().required(),
            password: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/),
            login: Joi.string().email().required(),
            firstName: Joi.string().required(),
            gender: Joi.string().required()
        });
        const result = Joi.validate({
            email: user.email, password: user.password, login: user.login, firstName: user.firstName, gender: user.gender
        }, schema);
        return (result.error) ? result.error : undefined;
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
        this.email = '';
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