
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
            jwt.verify(token, secret, function (err, decoded) {
                if (err) {
                    return res.status('403').json({ success: false, message: 'Failed to authenticate token.' });
                } else {
                    req.user = decoded;
                    next();
                }
            });
        } else {
            return res.status(403).send({
                success: false,
                message: 'No token provided.'
            });
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
