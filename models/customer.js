const Joi = require('joi');
const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 50
    },
    isVip: {
        type: Boolean,
        default: false
    },
    phone: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50
    },
    bonusPoints: Number
});

function validateCustomer(customer) {
    const schema = Joi.object().keys({
        name: Joi.string().min(3).max(50).required(),
        isVip: Joi.boolean().required(),
        phone: Joi.string().min(5).max(50).required(),
        bonusPoints: Joi.number().min(0)
    }) 
    return schema.validate(customer)

    
}

const Customer = mongoose.model('Customer', customerSchema);

module.exports={
    Customer:Customer,
    validate:validateCustomer
}