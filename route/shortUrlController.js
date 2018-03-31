/**
 * Import npm modules
 */
const shortUrl = require('./../model/shortUrl');
const NodeCache = require("node-cache");
const appCache = new NodeCache({ stdTTL: 100, checkperiod: 120 });

class ShortUrlController {

    static init(app) {

        return new Promise((resolve, reject) => {

            app.post('/', (req, res) => {

                shortUrl.saveShortUrl(req).then((data) => {
                    res.render('main/index', { link: data.shortUrl });
                }).catch((error) => {

                    res.status(404).send('Not found!');
                });
            });
            app.get('/:shorturl', (req, res) => {

                //Check in local cache.....
                if (!req.params && !req.params.shorturl) {
                    return res.status(40).send('Invalid paramater');
                }
                const shortid = req.params.shorturl;
                //get cache
                appCache.get(shortid, (error, value) => {

                    if (!error && value) {
                        console.log('<=======Getting form App cache=====>');
                        res.redirect(value);

                    } else {
                        shortUrl.getShortUrls(req).then((data) => {

                            if (data && data.longUrl) {
                                //set cache 
                                appCache.set(shortid, data.longUrl, (error, status) => {
                                    if (!error && status)
                                        console.log('<=======App cache set=======>');
                                    else
                                        console.log('<=======App cache not set=======>');
                                });
                                res.redirect(data.longUrl);
                            } else {
                                res.status(404).send('Not found!');
                            }
                        }).catch((error) => {
                            res.status(404).send('Not found!');
                        });
                    }

                });
            });
            app.get('/listshorturl', (req, res, next) => {

                res.send('ok');
            });
            app.get('/api/v1/remove/appcache', (req, res, next) => {
                appCache.flushAll();
                appCache.getStats();
                res.status(200).send({ data: 'App cache deleted!' });
            });
            resolve(true);
        });
    }
}

module.exports = ShortUrlController;