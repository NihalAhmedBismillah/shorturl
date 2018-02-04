

const cronTasks = require('./cronTasks'),
    CronJob = require('cron').CronJob,
    _ = require('lodash');


class RunCronJob {

    static runJobs() {

        return new Promise((resolve, rject) => {
            // schedule cron jobs 
            let schedules = global.locator.get('config').schedules;
            _.each(schedules, (x) => {
                let option = {
                    cronTime: x.cronTime,
                    onTick: cronTasks[x.actionFunName],//TODO: need to do some dynamic setting
                    start: x.startFlag,
                };
                new CronJob(option);
            });
            resolve();
        });

    }

}

module.exports = RunCronJob;