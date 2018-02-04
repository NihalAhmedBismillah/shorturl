/**
 * Import npm modules
 */


//const shortUrl = require('./../lib/shortUrl');

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
            resolve(true);
        });
    }
}

module.exports = LoginController;