


class Login {

    constructor() {

    }

    static async userLogin(req) {

        let formData = req.body;

        //Task 1 : validate use request
        let user = {
            emailId: req.body.emailId,
            password: req.body.password
        }
        if (!this.validateLogin(user)) {
            throw new Error('Invalid user and password!');
        }

        //Task 2 : check with data base use name and password


        //Task 3 : generate token for use and send in header


    }
    static getUserByEmailId(email) {
        return new Promise((res, rej) => {

        });
    }

    static validateLogin(user) {

        const schema = Joi.object().keys({
            emailId: Joi.string().email().required(),
            password: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/)
        });
        const result = Joi.validate({
            emailId: user.emailId, password: user.password
        }, schema);
        return (result.error) ? true : false;
    }
}

module.exports = Login;