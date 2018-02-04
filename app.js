
const dbl = require('./dbl/dbConnect'),
    registerCrtls = require('./utility/registerControllers'),
    middlewares = require('./middlewares/allMWare'),
    express = require('express'),
    runJob = require('./lib/scheduler');

class App {

    static async run() {
        try {
            let app = express();
            await dbl.dbConnect();
            await middlewares.init(app);
            await registerCrtls.init(app);
            await runJob.runJobs();
            const PORT = global.locator.get('config').PORT || 3001;
            app.listen(PORT);

        } catch (error) {
            throw error;
        }
    }
}

App.run().then(() => {
    console.log(`server started on : 8080`);

}).catch((error) => {
    console.log(`Error!  ${JSON.stringify(error)}`);
    process.exit(1);
});