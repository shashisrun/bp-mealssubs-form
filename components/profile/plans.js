import React from "react";
import { useAuth } from "../../contexts/authContext";
import { addDocument, addNamedDocument, getDocument, getDocuments, updateDocument } from "../../config/firebase";
import razorpayPayment from '../../utils/razorpayPayment'

import CustomizedPlan from "./customizedPlan";

export default function Plans() {
    const [plans, setPlans] = React.useState([]);
    const [selectedPlan, setSelectedPlan] = React.useState();
    const [error, setError] = React.useState('');
    const { user, setUser } = useAuth();

    React.useEffect(() => {
        if (!plans.length)
        getDocuments('plans').then((data) => {
            setPlans(data);
        });
    }, [plans])

    const createOrder = (customizedPlan) => {
        let data;
        if (customizedPlan) {
            data = {
                ...customizedPlan,
                isSuccessfull: false,
                userId: user.uid,
            }
        } else {
            data = {
                ...selectedPlan,
                isSuccessfull: false,
                userId: user.uid,
            }
        }
        addDocument('orders', data).then(async (res) => {
            let order = await fetch('/createOrder', {
                method: 'POST',
                body: JSON.stringify(res)
            })
            order = order.json();
            const options = {
                key: process.env.NEXT_PUBLIC_RZP_ID, // Enter the Key ID generated from the Dashboard
                name: "BodyPower Cafe",
                currency: 'INR',
                amount: res.price * 100,
                order_id: order.id,
                description: res.name,
                handler: function (response) {
                    handler(response);
                },
                prefill: {
                    name: user.name ? user.name : '',
                    email: user.email ? user.email : '',
                    contact: user.phoneNumber ? user.phoneNumber : '',
                },
            };

            const handler = (response) => {
                console.log(response)

                if (response.razorpay_payment_id) {
                    alert(res.id)
                    console.log('res')
                    console.log(res)
                    updateDocument('orders', {
                        isSuccessfull: true,
                        razorPayId: response.razorpay_payment_id,
                        razorPayOrderId: response.razorpay_order_id ? response.razorpay_order_id : '',
                        razorPaySignature: response.razorpay_signature ? response.razorpay_signature : ''
                    }, res.id)
                    updateDocument('users', {
                        activePlan: customizedPlan ? {
                            ...customizedPlan,
                            orderId: res.id
                        } : {
                            ...selectedPlan,
                            orderId: res.id
                        },
                        mealCounts: res.duration
                    }, user.uid).then(async () => {
                        const profile = await getDocument('users', user.uid);
                        setUser({ ...user, profile: profile });
                    })
                }
            }
            razorpayPayment(options)
        })
    }

    return (
        <>
            <div className="my-2">
                <div className="form-control w-full max-w-xs">
                    <label className="label">
                        <span className="label-text">
                            Select a Plan
                        </span>
                    </label>
                </div>
                <div className="my-3">
                    {plans.map((plan, index) => {
                        return(
                            <>
                                <div tabIndex={0} className={`collapse collapse-plus ${selectedPlan === plan ? 'collapse-open' : ''} border border-base-300 bg-base-100 rounded-box`} key={index} onClick={() => setSelectedPlan(plan)}>
                                    <div className="collapse-title text-xl font-medium">
                                        {plan.name}
                                    </div>
                                    <div className="collapse-content">
                                        {plan.id === 'customizedPlan' ? <>
                                            <CustomizedPlan plan={plan} onClick={createOrder} />
                                        </> : <>
                                            <p>{plan.description}</p>
                                            <div className="flex flex-row items-center flex-wrap">
                                                <button className="btn btn-primary mx-2 my-2"
                                                    onClick={createOrder}
                                                >
                                                    {`INR ${plan.price} per ${plan.duration} days`}
                                                </button>
                                            </div>
                                        </>}
                                    </div>
                                </div>
                            </>
                        )
                    })}
                </div>
            </div>
            <div className="my-1">
                {error}
            </div>
            {}
            {/* <div className="my-2">
                <button
                    className="btn btn-primary w-full"
                    onClick={async (event) => {
                        event.preventDefault();
                        if (selectedPlan) {
                            try {
                                await addNamedDocument('users', {
                                    workoutFrequency: workoutFrequency
                                }, user.uid)
                                const profile = await getDocument('users', user.uid);
                                setUser({ ...user, profile: profile });
                            } catch (error) {
                                console.log(error);
                            }
                        } else {
                            setError('Please Select a Plan');
                        }
                    }
                    }
                >Next</button>
            </div> */}
        </>
    )
}