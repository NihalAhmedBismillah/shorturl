
/**
 * Import npm packages
 */

class Db {


    constructor() {

        //  this.db = global.locator.get('db');
    }

    /**
     * Insert document
     */

    static save(data, collectionName) {

        return new Promise((res, rej) => {

            if (!data || !collectionName) return rej('Invalid paramater');
            let db = global.locator.get('db');
            let collection = db.collection(collectionName);
            collection.save(data, (error, result) => {
                return (!error) ? res(result.result.upserted[0]) : rej(error);
            });
        });
    }

    static find(query, collectionName) {

        return new Promise((res, rej) => {

            if (!query || !collectionName) return rej('Invalid paramater');
            let db = global.locator.get('db');
            let collection = db.collection(collectionName);
            collection.find(query).toArray((error, result) => {
                return (!error) ? res(result) : rej(error);
            });
        });
    }
    static findInclude(query, includeFields, collectionName) {

        return new Promise((res, rej) => {

            if (!data || !includeFields || !collectionName) return rej('Invalid paramater');
            includeFields['_id'] = 1;
            let db = global.locator.get('db');
            let collection = db.collection(collectionName);
            collection.find(query, includeFields).toArray((err, result) => {
                return (!error) ? res(result) : rej(error);
            });
        });
    }
    static findOne(query, collectionName) {

        return new Promise((res, rej) => {

            if (!query || !collectionName) return rej('Invalid paramater');
            let db = global.locator.get('db');
            let collection = db.collection(collectionName);
            collection.findOne(query, (error, result) => {
                return (!error) ? res(result) : rej(error);
            });
        });
    }

    static findOneInclude(query, includeFields, collectionName) {

        return new Promise((res, rej) => {

            if (!query || includeFields || !collectionName) return rej('Invalid paramater');
            let db = global.locator.get('db');
            includeFields['_id'] = 1;
            let collection = db.collection(collectionName);
            collection.findOne(query, includeFields, (error, result) => {
                return (!error) ? res(result) : rej(error);
            });
        });
    }

    static remove(query, collectionName) {

        return new Promise((res, rej) => {

            if (!query || !collectionName) return rej('Invalid paramater');
            let db = global.locator.get('db');
            let collection = db.collection(collectionName);
            collection.remove(query, (error, result) => {
                return (!error) ? res(result) : rej(error);
            });
        });
    }
}

module.exports = Db;