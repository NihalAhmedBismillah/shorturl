
/**
 * Import npm modules
 */

const User = require('../model/login'),
    _ = require('lodash');

class UserController {

    static init(app) {

        return new Promise((resolve, reject) => {

            app.get('/api/v1/users', (req, res) => {
                res.status(200);
                res.send('implemented!');
            });
           
            app.post('/api/v1/users', (req, res) => {
                // TODO: Test only
                let body = req.body;
                let user = {
                    firstName: body.firstName,
                    login: body.email,
                    password: body.password,
                    email: body.email
                };
                User.saveUser(user).then((data) => {
                    res.send(data);
                }).catch((error) => {
                    console.log(`Error [User Save] ${JSON.stringify(errro)}`);
                    //TODO: Need to change
                    res.status(501);
                    res.send('Sorry! not implemented!');
                });
            });
            resolve(true);
        });
    }
}

module.exports = UserController;