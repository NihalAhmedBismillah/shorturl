
const COLLECTION_NAME = 'Users',
    dbOpt = require('../lib/db'),
    shortid = require('shortid'),
    Joi = require('joi');

/**
 * Import npm package
 */

class Login {

    constructor() {

    }

    static  userLogin(user) {

        //Task 1 : validate use request   
        let result  = this.validateLogin(user);
        if (result) {
            return new Promise((res) => {
                res(undefined);
            });
        } else {
            let query = { login: user.emailId, password: user.password };
            return dbOpt.findOne(query, COLLECTION_NAME);
        }
    }
    static getUserByEmailId(email) {

        let query = { login: email };
        return dbOpt.findOne(query, COLLECTION_NAME);

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


module.exports = Login;