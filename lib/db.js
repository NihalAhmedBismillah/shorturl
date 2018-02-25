
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
                return (!error) ? res(result.result) : rej(error);
            });
        });
    }

    static updateFields(updateOptions, collectionName) {

        return new Promise((res, rej) => {

            if (!updateOptions || !collectionName) return rej('Invalid paramater');
            let db = global.locator.get('db');
            let collection = db.collection(collectionName);
            collection.update(updateOptions.query, { $set: updateOptions.updateFields }, { upsert: true }, (error, result) => {
                if (!error) {
                    res(result);
                } else {
                    rej(error);
                }
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

    static findWithPaginantion(pageNo, pageSize, collectionName) {

        return new Promise((resolve, reject) => {

            if (!collectionName) return rej('Invalid paramater');
            let db = global.locator.get('db');
            let collection = db.collection(collectionName);
            collection.find({}).count((error, count) => {
                if (!error) {
                    collection.find({})
                        .skip((pageSize * pageNo) - pageSize)

                        .limit(pageSize).toArray((error, result) => {
                            if (!error) {
                                resolve({ users: result, currentPage: pageNo, totalPages: Math.ceil(count / pageSize) });
                            } else {
                                reject(error);
                            }
                        });
                } else {
                    reject(error);
                }
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
            if (!query || !collectionName)
                return rej('Invalid paramater');
            let db = global.locator.get('db');
            let collection = db.collection(collectionName);
            collection.findOne(query, (error, result) => {
                if (!error) {
                    if (result) {
                        res(result);
                    } else {
                        res();
                    }
                }
                else {
                    rej(error);
                }
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