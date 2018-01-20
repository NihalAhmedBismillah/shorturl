

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
            shortUrl.removeExpireUrl().then(() => {
                return;
            }).catch((error) => {
                console.log(error);
            });
            resolve();
        });

    }

}

module.exports = ClsRunJob;