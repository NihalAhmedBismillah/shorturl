
const async = require('async');
const shortid = require('shortid');
const COLLECTION_NAME = 'ShortUrls';
const IP_INFO = 'freegeoip.net/json';
const BASE_URL = 'http://localhost:8080';
const request = require('request');

let shoutUrlModel = require('../model/shortUrl');

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
                let objShortUrl = new shoutUrlModel();
                let id = shortid.generate();
                objShortUrl._id = id;
                objShortUrl.shortUrl = `${BASE_URL}/${id}`;
                objShortUrl.longUrl = formData.long_url;
                objShortUrl.userInfo = data;
                objShortUrl.clientId = shortid.generate();// TODO: It should be come from client logged id
                let db = global.db;
                let collection = db.collection(COLLECTION_NAME);

                collection.save(objShortUrl, (error, result) => {
                    (!error) ? resolve(objShortUrl) : reject(error);
                });

            }).catch((error) => {
                reject(err);
            });
        });
    }

    // get Product List 
    static getShortUrls(req) {

        let shortid = req.params.shorturl;
        return new Promise((resolve, reject) => {
            let db = global.db;
            let collection = db.collection(COLLECTION_NAME);
            collection.findOne({ '_id': shortid }, (error, result) => {
                if (!error) {
                    resolve(result);
                } else {
                    reject(error);
                }
            });
        });
    }

    static removeExpireUrl() {

        return new Promise((resolve, reject) => {
            console.log('Remove  old url is running!');
            let db = global.locator.get('db');
            let collection = db.collection(COLLECTION_NAME);
            let query = { createdOn: { $lt: new Date().toISOString() } };
            collection.remove(query, (error, result) => {
                if (!error) {
                    console.log('Remove  old url from database completed !');
                } else {
                    console.log('Failed! to remove  old url  !');
                }
            });
            resolve();
        });
    }
}

module.exports = shortUrl;