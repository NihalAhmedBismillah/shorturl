
class ClsShortUrl {

  
    constructor() {
       this._id ='' ;
       this.shortUrl= '';
       this.longUrl = '';
       this.userInfo = {};
       this.createdOn = new Date().toISOString();
    }
   
}

module.exports = ClsShortUrl;