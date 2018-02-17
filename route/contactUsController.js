
class ContactUsController {

    constructor() {

    }
   static init(app) {

        return new Promise((resolve, reject) => {
            app.get('/contact', (req, res) => {
                res.render('main/contactus');
            });
            app.post('/contact', (req, res) => {

                let fromData = req.body;
                console.log(JSON.stringify(fromData));
                // contactUsModel.saveContactUs(fromData).then((data) => {
                //     res.render('main/home');
                // }).catch((error) => {
                //     res.status(404).send('Not found!');
                // });
                res.send({ status: 'save' });
            });
            resolve(true);
        });
    }
}

module.exports = ContactUsController;