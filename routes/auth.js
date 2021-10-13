const { User } = require('../models/user')
const express = require('express')
const _ = require('lodash')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const Joi = require('joi')
const router = express.Router()
const { SECRET_KEY } = require('../config')

router.post('/', async (req, res) => {
  const { error } = validate(req.body)
  if (error)
    return res.status(400).send(error.details[0].message)

  let user = await User.findOne({ email: req.body.email })
  if (!user)
    return res.status(400).send('Email yoki password noto\'g\'ri')
  const isValid = await bcrypt.compare(req.body.password, user.password)
  if(!isValid)
    return res.status(400).send('Email yoki password noto\'g\'ri')

   const token = jwt.sign({_id:user._id, isAdmin:user.isAdmin}, SECRET_KEY)
   res.header('x-auth-token', token).send(true)
})

function validate(req){
    const schema = Joi.object().keys({
        password: Joi.string().min(5).max(20).required(),
        email: Joi.string().min(5).max(255).required().email()
    })
    return schema.validate(req)
}


module.exports = router 