/**
 * Import npm package
 */

const async = require('async'),
    shortid = require('shortid'),
    COLLECTION_NAME = 'ShortUrls',
    IP_INFO = 'freegeoip.net/json',
    db = require('../lib/db'),
    request = require('request');

class ShortUrlModel {

    constructor() {
        this._id = '';
        this.shortUrl = '';
        this.longUrl = '';
        this.userInfo = {};
        this.createdOn = new Date().toISOString();
        this.clientId = '';
    }

}

class shortUrl {

    static getUserInfo(ip) {

        return new Promise((resolve, reject) => {

            // request.get(`${IP_INFO}/${ip}`, (error, response, body) => {
            //     if (!error)
            //         resolve(body);
            //     else reject(error);
            // });
            resolve({ name: 'data' });

        });
    }

    static getClientAddress(req) {
        return (req.headers['x-forwarded-for'] || '').split(',')[0]
            || req.connection.remoteAddress;
    }
    static saveShortUrl(req) {

        return new Promise((resolve, reject) => {

            let formData = req.body;
            this.getUserInfo(this.getClientAddress(req)).then((data) => {
                return data;
            }).then((data) => {
                let objShortUrl = new ShortUrlModel();
                let id = shortid.generate();
                objShortUrl._id = id;
                objShortUrl.shortUrl = `${global.locator.get('config').baseUrl}/${id}`;
                objShortUrl.longUrl = formData.long_url;
                objShortUrl.userInfo = data;
                objShortUrl.clientId = shortid.generate();// TODO: It should be come from client logged id
                db.save(objShortUrl, COLLECTION_NAME).then((result) => {
                    resolve(objShortUrl);
                });
            }).catch((error) => {
                reject(err);
            });
        });
    }

    // get Product List 
    static getShortUrls(req) {

        if (!req.params && !req.params.shorturl) throw new Error('Invalid paramater');
        let shortid = req.params.shorturl;
        return db.findOne({ '_id': shortid }, COLLECTION_NAME);
    }
}

module.exports = shortUrl;