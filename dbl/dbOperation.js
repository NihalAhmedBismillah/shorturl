
/**
 * Import npm module
 */

const config = require('../config.json');
const MongoClient = require('mongodb').MongoClient;
let locator = new Map();
class ClsMongodb {

  // connect monogodb data base
  static dbConnect() {

    return new Promise((resolve, reject) => {
      //map config json file in locator
      locator.set('config', config);
      //
      if (global.db === undefined) {

        MongoClient.connect(config.dbConnectionUrl + config.dbName, (error, db) => {
          if (error) {
            console.log('Database connection error occur!', JSON.stringify(error));
            reject(error);
          }
          else {
            locator.set('db', db);
            global.db = db;
            // assign locator in global variable
            global.locator = locator;
            resolve(true);
          }
        });
      } else {
        resolve(true);
      }
    });
  }

  // save data in to data base
  static insert() {

    return new Promise((resolve, reject) => {
      // TODO some async operation 
      resolve();
    })

  }



}
module.exports = ClsMongodb;


