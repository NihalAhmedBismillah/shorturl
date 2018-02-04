/**
 * Import npm packages 
 */

const shortUrlCrtl = require('./../route/shortUrlController');
const loginCrtl = require('./../route/loginController');
/**
 * Description : Register all controllors.
 */
class registerControllers {

    constructor() {

    }
    // 
    static async init(app) {
      
        try {

            // Register all controllers here    
            await loginCrtl.init(app);
            await shortUrlCrtl.init(app);

        } catch (error) {
            throw error;
        }
    }
}

module.exports = registerControllers;