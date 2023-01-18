const Razorpay = require('razorpay');
export default function handler(req, res) {
    const instance = new Razorpay({
        key_id: process.env.NEXT_PUBLIC_RZP_ID,
        key_secret: process.env.NEXT_PUBLIC_RZP_KEY,
    });
    instance.payments.capture(req.id, req.price*100).then((data) => {
        res.json(data);
    }).catch((error) => {
        res.json(error);
    });
}
