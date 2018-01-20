

const shortUrl = require('./shortUrl');
const CronJob = require('cron').CronJob;


class ClsRunJob {

    static runJobs() {

        return new Promise((resolve, rject) => {

            let job = new CronJob({
                cronTime: '*/2 * * * *', // TODO : Need to put on config file
                onTick: shortUrl.removeExpireUrl,
                start: true,
            });
            resolve();
        });

    }

}

module.exports = ClsRunJob;