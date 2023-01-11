import loadScript from './loadScript'

export default async function razorpayPayment(options) {
    const res = await loadScript('https://checkout.razorpay.com/v1/checkout.js');

    if (!res) {
        alert("Razorpay SDK Failed to load");
        return;
    }
    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
}