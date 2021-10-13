const jwt = require('jsonwebtoken')
const { SECRET_KEY } = require('../config')

module.exports = function auth(req, res, next) {
    
    const token = req.headers['x-auth-token']
    if(!token){
        return res.status(401).send('Token bo\'lmaganligi uchun murojaat rad etildi')
    }

    try {
        const decoded = jwt.verify(token, SECRET_KEY)
        req.user = decoded
        next()
    } catch (error) {
        res.status(400).send('Token xato!')
    }

   
   

}