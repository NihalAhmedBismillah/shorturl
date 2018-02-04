
/**
 * Import npm module
 */

const ejs = require('ejs'),
    bodyParser = require('body-parser'),
    logger = require('morgan'),
    methodOverride = require('method-override'),
    cookieParser = require('cookie-parser'),
    cors = require('cors'),
    jwt = require('jsonwebtoken'),
    helmet = require('helmet');

class ClsMiddleware {

    static init(app) {

        return new Promise((resolve, reject) => {

            app.use(logger('dev'));
            app.set('view engine', 'ejs');
            app.use(logger('dev'));
            app.use(bodyParser.json());
            app.use(bodyParser.urlencoded({ extended: false }));
            app.use(methodOverride('_method'));
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
