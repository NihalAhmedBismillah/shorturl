/**
 * Import npm package
 */

const async = require('async'),
    shortid = require('shortid'),
    IP_INFO = 'freegeoip.net/json',
    db = require('../lib/db'),
    request = require('request'),

 COLLECTION_NAME = 'ContactUs';

class ContactUsModel {

    static saveContactUs(data) {

        return new Promise((resolve, reject) => {

            let id = shortid.generate();
            data._id = id;
            db.save(data, COLLECTION_NAME).then((result) => {
                resolve(objShortUrl);
            });
        }).catch((error) => {
            reject(err);
        });

    }

    // get Product List 
    static getShortUrls(id) {
        return db.findOne({ '_id': id }, COLLECTION_NAME);
    }
}

module.exports = ContactUsModel;