/**
 * Import npm modules
 */


const shortUrl = require('./../lib/shortUrl');


class ShortUrlController {

    static init(app) {

        return new Promise((resolve, reject) => {

            app.post('/', (req, res) => {

                shortUrl.saveShortUrl(req).then((data) => {
                    res.render('main/index', { link: data.shortUrl });
                });
            });
            app.get('/:shorturl', (req, res) => {

                shortUrl.getShortUrls(req).then((data) => {
                    if (data && data.longUrl) {
                        res.redirect(data.longUrl);
                    } else {
                        res.status(404).send('Not found!');
                    }
                });
            });
            app.get('/listshorturl', (req, res, next) => {

                res.send('ok');
            });
            resolve(true);
        });
    }
}

module.exports = ShortUrlController;