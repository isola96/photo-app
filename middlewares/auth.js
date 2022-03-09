/**
 * Authentication Middleware
 */

 const debug = require('debug')('photos:auth');
 const { User } = require('../models');
 const bcrypt = require('bcrypt');

 
 /**
  * HTTP Basic Authentication
  */
 const basic = async (req, res, next) => {
     debug("Hello from auth.basic!");
 
     if (!req.headers.authorization) {
         debug("Authorization header missing");
 
         return res.status(401).send({
             status: 'fail',
             data: 'Authorization required',
         });
     }
 
     debug("Authorization header: %o", req.headers.authorization);
 
     const [authSchema, base64Payload] = req.headers.authorization.split(' ');
 
     if (authSchema.toLowerCase() !== "basic") {
         debug("Authorization schema isn't basic");
 
         return res.status(401).send({
             status: 'fail',
             data: 'Authorization required',
         });
     }
 
     const decodedPayload = Buffer.from(base64Payload, 'base64').toString('ascii');
 
     const [email, password] = decodedPayload.split(':');
 
     const user = await new User({ email }).fetch({ require: false });
     
     if (!user) {
         return res.status(401).send({
             status: 'fail',
             data: 'Authorization failed because of the email',
         });
     }

     const comparedPasswords = await bcrypt.compare(password, user.get('password'));
     if (!comparedPasswords) {
        return res.status(401).send({
            status: 'fail',
            data: 'Authorization failed because of the password',
        });
     };
 
     req.user = user;
 
     next();
 }
 
 module.exports = {
     basic,
 }