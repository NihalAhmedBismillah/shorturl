
/**
 * Import npm module
 */

const ejs = require('ejs'),
    bodyParser = require('body-parser'),
    logger = require('morgan'),
    methodOverride = require('method-override'),
    cookieParser = require('cookie-parser'),
    session = require('cookie-session'),
    cors = require('cors'),
    jwt = require('jsonwebtoken'),
    helmet = require('helmet');

class ClsMiddleware {

    static apiRoutes(req, res, next) {

        if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
            let token = req.headers.authorization.split(' ')[1];
            let secret = `${global.locator.get('config').secret}`;
            jwt.verify(token, secret, (error, decoded) => {
                if (error) {
                    return res.status('403').json({ success: false, message: error.message });
                } else {
                    // check if x-api-key is valid or not   
                    ClsMiddleware.checkXApiKey(req, res, (error, result) => {
                        if (!error) {
                            req.user = decoded;
                            next();
                        } else {
                            return res.status('403').json(error);
                        }
                    });
                }
            });
        } else {
            return res.status(403).send({
                success: false,
                message: 'No token provided.'
            });
        }
    }

    static checkXApiKey(req, res, callback) {
        const xapikey = `${global.locator.get('config').x_api_key}`;
        const reqxapikey = (req.headers['x-api-key']) ? req.headers['x-api-key'] : undefined;
        if (!reqxapikey) return callback({ status: false, message: 'Please pass x-api-key in http header.' });
        if (req.headers['x-api-key'] === xapikey) {
            callback(undefined);
        } else {
            callback({ status: false, message: 'Invalid x-api-key provided.' });
        }
    }
    static init(app) {

        return new Promise((resolve, reject) => {

            app.use(logger('dev'));
            app.set('view engine', 'ejs');
            app.use(logger('dev'));
            app.use(bodyParser.json());
            app.use(bodyParser.urlencoded({ extended: false }));
            app.use(methodOverride('_method'));
            app.use(session({
                keys: ['key1', 'key2', 'key3']
            }));
            app.use(cookieParser());
            app.use(cors());
            app.options('*', cors());
            app.use(helmet());
            app.use(helmet.noCache());
            app.use(helmet.frameguard());

            app.get('/', (req, res) => {
                res.render('main/shortulr');
            });

            app.get('/favicon.ico', (req, res) => {

                res.status(204);
                res.send();
            });
            app.use('/api/v1', ClsMiddleware.apiRoutes);
            app.use((err, req, res, next) => {
                console.error(err.stack);
                res.status(500).send('Something broke!');
            });
            resolve();
        });
    }
}

module.exports = ClsMiddleware;
