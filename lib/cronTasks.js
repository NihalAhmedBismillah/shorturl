/**
 * Import npm package
 */

const DbOpt = require('../lib/db'),
    COLLECTION_NAME = 'ShortUrls';


class CornTasks {

    static removeExpireUrlTask() {

        return new Promise((resolve, reject) => {

            let query = { createdOn: { $lt: new Date().toISOString() } };

            DbOpt.remove(query, COLLECTION_NAME).then((data) => {

                console.log(`Remove expired url from database completed !`);

            }).catch((error) => {
                console.log(`Failed! to remove  expired url! ${JSON.stringify(error)}`);
            });
            resolve();
        });
    }

    static validateRegisteredUsersTask() {

        return new Promise((resolve, reject) => {
            console.log(`Validate Registered users task running!`);
            resolve();
            //TODO:Need to add build logic here for validate
        });
    }
}

module.exports = CornTasks;