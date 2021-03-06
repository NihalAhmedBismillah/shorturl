/**
 * Import npm modules
 */

const User = require('../model/login'),
    jwt = require('jsonwebtoken'),
    _ = require('lodash');

class LoginController {

    static init(app) {

        return new Promise((resolve, reject) => {

            app.get('/login', (req, res) => {

                res.render('main/login', { data: {} });

            });
            app.get('/emailnext', (req, res) => {

                res.render('main/login', { data: {} });

            });
            app.post('/emailnext', (req, res) => {
                let formData = req.body;
                User.getUserByEmailId(formData && formData.emailId && formData.emailId.toLowerCase()).then((userData) => {
                    if (userData) {
                        if (_.isEqual(formData.emailId.toLowerCase(), userData.email.toLowerCase())) {
                            res.render('main/password', { data: { emailId: userData.email, firstName: userData.firstName, lastName: userData.lastName } });
                        } else {
                            //TODO:Send error message
                            res.render('main/login', { data: { error: 'Invalid email Id!' } });
                        }
                    } else {
                        res.render('main/login', { data: { error: 'Sorry! we are not found your email id.' } });
                    }
                }).catch((error) => {
                    res.status(500);
                    console.log(`Error : ${JSON.stringify(error)}`);
                    res.send(`Internal Server Error`);
                });
            });
            app.get('/home', (req, res) => {

                if (req.session && req.session.email) {
                    //TODO:Need to put on  in function 
                    User.getUserByEmailId(req.session.email.toLowerCase()).then((data) => {
                        if (data && _.isEqual(req.session.password.toLowerCase(), data.password.toLowerCase())) {
                            //  Create session
                            let session = {};
                            session.userId = data._id;
                            session.email = data.email;
                            session.password = data.password;
                            session.firstName = data.firstName;
                            session.lastName = data.lastName;
                            req.session = session;
                            // create user data
                            let resutl = {
                                header: data,
                                home: data,
                                footer: data
                            };

                            delete data.password;
                            // create a token
                            let secret = `${global.locator.get('config').secret}`;
                            let auth_token = jwt.sign(data, secret, {
                                expiresIn: 60 * 60 * 24 // expires in 24 hours
                            });
                            resutl.auth_token = auth_token;
                            let user = { data: resutl };
                            res.render('main/home', user);

                        } else {
                            res.render('main/password', { data: { emailId: data.email, firstName: data.firstName, lastName: data.lastName, error: 'Invalid Password!' } });
                        }
                    }).catch((error) => {
                        res.status(500);
                        console.log(`Error : ${JSON.stringify(error)}`);
                        res.send(`Internal Server Error`);
                    });
                } else {
                    res.render('main/login', { data: {} });
                }
            });
            app.post('/home', (req, res) => {

                let formData = req.body,
                    password = formData.password;
                User.getUserByEmailId(formData && formData.emailId && formData.emailId.toLowerCase()).then((data) => {

                    if (data && _.isEqual(password.toLowerCase(), data.password.toLowerCase())) {
                        //  Create session
                        let session = {};
                        session.userId = data._id;
                        session.email = data.email;
                        session.password = data.password;
                        session.firstName = data.firstName;
                        session.lastName = data.lastName;
                        req.session = session;
                        // create user data
                        let resutl = {
                            header: data,
                            home: data,
                            footer: data
                        };
                        delete data.password;
                        // create a token
                        let secret = `${global.locator.get('config').secret}`;
                        let auth_token = jwt.sign(data, secret, {
                            expiresIn: 60 * 60 * 24//300 // putting 5 mints token expire time.  60 * 60 * 24 // expires in 24 hours
                        });
                        resutl.auth_token = auth_token;
                        let user = { data: resutl };
                        res.render('main/home', user);

                    } else {
                        res.render('main/password', { data: { emailId: data.email, firstName: data.firstName, lastName: data.lastName, error: 'Invalid Password!' } });
                    }
                }).catch((error) => {
                    res.status(500);
                    console.log(`Error : ${JSON.stringify(error)}`);
                    res.send(`Internal Server Error`);
                });
            });

            app.get('/logout', (req, res) => {

                try {
                    if (req.session && req.session.email) {

                        req.session.userId = null;
                        req.session.email = null;
                        req.session.password = null;
                        req.session.firstlName = null;
                        req.session.lastName = null;
                        // res.clearCookie('remember_me');
                        // res.clearCookie('username');
                        // res.clearCookie('username');
                        res.render('main/shortulr');

                    } else {
                        res.render('main/shortulr');
                    }
                } catch (error) {
                    res.render('main/shortulr');
                }
            });

            app.post('/jsonwebtoken', (req, res) => {
                LoginController.checkXApiKey(req, (error, result) => {
                    if (!error) {
                        User.getUserByEmailId(req.body.email.toLowerCase()).then((data) => {

                            if (data) {
                                delete data.password;
                                // create a token
                                let secret = `${global.locator.get('config').secret}`;
                                let auth_token = jwt.sign(data, secret, {
                                    expiresIn: 60 * 60 * 24// 60 * 60 * 24 // expires in 24 hours
                                });
                                res.status('200').json({
                                    success: true,
                                    message: 'token generated!',
                                    token: auth_token
                                });
                            } else {
                                res.status(404).json({"Error":"User not found"});
                            }

                        }).catch((error) => {
                            res.status(500);
                            console.log(`Error : ${JSON.stringify(error)}`);
                            res.send(`Internal Server Error`);
                        });
                    } else {
                        return res.status('403').json(error);
                    }
                });
            });
            resolve(true);
        });
    }

    static checkXApiKey(req, callback) {

        const xapikey = `${global.locator.get('config').x_api_key}`;
        const reqxapikey = (req.headers['x-api-key']) ? req.headers['x-api-key'] : undefined;
        const body = req.body;
        if (!reqxapikey) return callback({ status: false, message: 'Please pass x-api-key in http header.' });
        if (!body && !body.email) return callback({ status: false, message: 'Please pass email id' });
        if (req.headers['x-api-key'] === xapikey) return callback(undefined);
        else
            callback({ status: false, message: 'Invalid x-api-key provided.' });

    }
}

module.exports = LoginController;