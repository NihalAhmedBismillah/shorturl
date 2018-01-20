
const dbl = require('./dbl/dbOperation');
const shortUrlCrtl = require('./route/shortUrlController');
const middlewares = require('./middlewares/allMWare');
const express = require('express');
const runJob = require('./lib/scheduler');

class App {

    static async run() {
        try {
            let app = express();
            await dbl.dbConnect();
            await middlewares.init(app);
            await shortUrlCrtl.init(app);
            runJob.runJobs();
            return app.listen(8080, "127.0.0.1");

        } catch (error) {
            throw error;
        }
    }
}

App.run().then((data) => {
    console.log('server started on : 8080');

}).catch((error) => {
    console.log(`Error!  ${error}`);
    process.exit(1);
});