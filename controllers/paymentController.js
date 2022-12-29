const stripe = require("stripe")('sk_test_51LQPBwIORs89t3JLVCmfpQ6cL7iQxPF96pcYOAosn7S1nJFxdkb5rmeMLYa2Y1Rs8heLjQqXPsgS63mMCB4GLljt00sN4eXokY');

module.exports.createPaymentIntent = async (req, res) => {
    const { price } = req.body;
    const items = price * 100;
    // Create a PaymentIntent with the order amount and currency
        try{
            const paymentIntent = await stripe.paymentIntents.create({
                amount:items,
                currency: "usd",
                payment_method_types:['card']
            });
            res.send({
                clientSecret: paymentIntent.client_secret,
            });
        }catch(err){
            console.log(err,"err")
        }
}