
/**
 * Import npm module
 */

const ejs = require('ejs');
const bodyParser = require('body-parser');

class ClsMiddleware {

    static init(app) {

        return new Promise((resolve, reject) => {
            app.use(bodyParser.json());
            app.use(bodyParser.urlencoded({ extended: true }));

            app.set('view engine', 'ejs');

            app.get('/', (req, res) => {
                res.render('main/shortulr');

            });
            app.get('/favicon.ico', (req, res) => {
               
                res.status(204);
            });
            app.use((err, req, res, next) => {
                console.error(err.stack);
                res.status(500).send('Something broke!');
            });
            resolve();
        });
    }
}

module.exports = ClsMiddleware;
