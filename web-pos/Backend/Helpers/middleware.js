const response = require('../Helpers/response'),
    jwt = require('jsonwebtoken'),
    secretKey = process.env.SECRET_KEY || '123456';

exports.validateUser = (req, res, next) => {
    let token = req.headers['authorization'];
    if(!token) return res.status(401).json({status:401, message: "Unauthorized!"});
    token = token.replace('Bearer ', '');
    jwt.verify(token, secretKey, (err, decoded) => {
        if (err) {
            response.error(res, "Invalid token");
        } else {
            req.body.user_id = decoded.id;
            req.body.username = decoded.username;
            return;
            next();
        }
    });
}