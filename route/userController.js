
/**
 * Import npm modules
 */

const User = require('../model/user'),
    _ = require('lodash');

class UserController {

    static init(app) {

        return new Promise((resolve, reject) => {

            app.get('/api/v1/users/:emailid', (req, res) => {

                if (req.params && req.params.emailid) {
                    User.getUserByEmailId(req.params.emailid).then((user) => {
                        res.setHeader('Content-Type', 'application/json');
                        res.status(200);
                        res.send(JSON.stringify({ data: { user } }));
                    }).catch((error) => {
                        res.status(400);
                        res.json({ error: { message: 'Bad parameter request', statusCode: '400' } });
                    });
                } else {
                    res.status(400);
                    res.send({ error: { message: 'Bad parameter request', statusCode: '400' } });// TODO: need to implement generic error handling, in next sprint will be impement with some analysis 
                }
            });
            app.get('/api/v1/users/list/:pageNo', (req, res) => {

                if (req.params && req.params.pageNo) {
                    let pageNo = parseInt(req.params.pageNo, 10);
                    if (!_.isNaN(pageNo)) {
                        User.getUserList(pageNo).then((user) => {
                            res.setHeader('Content-Type', 'application/json');
                            res.status(200);
                            res.send(JSON.stringify({ data: user }));
                        }).catch((error) => {
                            res.status(400);
                            res.json({ error: { message: 'Bad parameter request', statusCode: '400' } });
                        });
                    } else {
                        res.status(400);
                        res.send({ error: { message: 'Bad parameter request', statusCode: '400' } });// TODO: need to implement generic error handling, in next sprint will be impement with some analysis 
                    }
                } else {
                    res.status(400);
                    res.send({ error: { message: 'Bad parameter request', statusCode: '400' } });// TODO: need to implement generic error handling, in next sprint will be impement with some analysis 
                }
            });
            app.post('/api/v1/users', (req, res) => {

                let user = req.body;
                user.Dob = (user.Dob) ? new Date(user.Dob).toISOString() : '';
                User.saveUser(user).then((data) => {
                    res.send(data);
                }).catch((error) => {
                    console.log(`Error [User Save] ${JSON.stringify(errro)}`);
                    //TODO: Need to change
                    res.status(501);
                    res.send({ error: { message: 'server side error', statusCode: '501' } });
                });
            });
            app.delete('/api/v1/users/soft/:email', (req, res) => {

                //TODO: Need to implement delete
                res.send('soft');
            });
            app.delete('/api/v1/users/hard/:email', (req, res) => {
                //TODO: Need to implement delete
                res.send('hard');
            });
            resolve(true);
        });
    }
}

module.exports = UserController;