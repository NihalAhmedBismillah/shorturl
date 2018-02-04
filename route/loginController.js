/**
 * Import npm modules
 */

const User = require('../model/login');

class LoginController {

    static init(app) {

        return new Promise((resolve, reject) => {

            app.get('/login', (req, res) => {

                res.render('main/login');

            });
            app.post('/password', (req, res) => {

                res.render('main/password');

            });

            app.get('/home', (req, res) => {

                res.render('main/home');

            });
            app.get('/user', (req, res) => {
                res.status(501);
                res.send('Sorry! not implemented!');
            });
            app.post('/user', (req, res) => {
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
                })
            });

            resolve(true);
        });
    }
}

module.exports = LoginController;