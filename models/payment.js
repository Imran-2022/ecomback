const { Schema, model } = require('mongoose');

module.exports.PaymentDetails = model("PaymentDetails", Schema({
    user: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    transationId: String,
    productDetails:Array,
    totalAmount:Number,
}))

