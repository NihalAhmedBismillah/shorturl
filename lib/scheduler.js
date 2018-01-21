

const shortUrl = require('./shortUrl');
const CronJob = require('cron').CronJob,
    _ = require('lodash');


class ClsRunJob {

    static runJobs() {

        return new Promise((resolve, rject) => {
            // schedule cron jobs 
            let schedules = global.locator.get('config').schedules;
            _.each(schedules, (x) => {
                new CronJob({
                    cronTime: x.cronTime,
                    onTick: shortUrl[x.actionFunName],//TODO: need to do some dynamic setting
                    start: x.startFlag,
                });
            });
            resolve();
        });

    }

}

module.exports = ClsRunJob;