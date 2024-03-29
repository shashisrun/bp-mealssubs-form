import React from 'react';
import { useAuth } from '../contexts/authContext';
import { useLocation } from '../contexts/currentLocation';
import AskGender from '../components/profile/askGender';
import AskHeight from '../components/profile/askHeight';
import AskWeight from '../components/profile/askWeight';
import ShowBMI from '../components/profile/showBMI';
import AskGoal from '../components/profile/askGoal';
import AskPhysicalActivity from '../components/profile/askPhysicalActivity';
import AskWorkoutFrequency from '../components/profile/askWorkoutFrequency';
import Plans from '../components/profile/plans';
import AskMealType from '../components/profile/askMealType';
import AskVegDays from '../components/profile/askVegDays';
import { addNamedDocument, getDocument, updateDocument, deleteField } from "../config/firebase";
import AskAge from '../components/profile/askAge';
import { useRouter } from "next/router";
import Title from '../components/title';
import { useDeliveryPrice } from '../contexts/deliveryPrice';

export default function CompleteProfile() {
    const { user, setUser } = useAuth();
    const { location, setLocation } = useLocation();
    const [currentStep, setCurrentStep] = React.useState(-1)
    const { deliveryPrice } = useDeliveryPrice();
    const [showComponet, setShowComponent] = React.useState(() => {
        return (
            <>
                <div className="w-full h-full">
                    <progress className="progress w-2/3"></progress>
                </div>
            </>
        )
    })
    const router = useRouter();

    const steps = [
        'gender',
        'age',
        'height',
        'weight',
        'bmi',
        'goal',
        'physicalActivity',
        'workoutFrequency',
        'mealType',
        'vegDays',
        'activePlan',
    ]


    React.useEffect(() => {
        const completeProfile = async () => {
            if (!user.profile.isRegistrationComplete) {
                addNamedDocument('users', {
                    isRegistrationComplete: true
                }, user.uid).then(() => {
                    getDocument('users', user.uid).then((profile) => {
                        setUser({ ...user, profile: profile });
                        console.log(profile);
                    })
                })
            }
        }
        if (user) {
            if (!location) {
                router.push({
                    pathname: '/address',
                    query: {
                        forwardURL: '/completeProfile',
                        title: 'Continue with default address'
                    }
                })
            }
        if (deliveryPrice) {
            if (deliveryPrice.price) {
                    console.log(user.profile);
                    const profileFields = Object.keys(user.profile)
                    console.log(profileFields)
                    if (!profileFields.includes(steps[0])) {
                        setCurrentStep(1);
                        setShowComponent(() => <AskGender />)
                    }
                    else if (!profileFields.includes(steps[1])) {
                        setCurrentStep(2);
                        setShowComponent(() => <AskAge />)}
                    else if (!profileFields.includes(steps[2])) {
                        setCurrentStep(3);
                        setShowComponent(() => <AskHeight />)}
                    else if (!profileFields.includes(steps[3])) {
                        setCurrentStep(4);
                        setShowComponent(() => <AskWeight />)}
                    else if (!profileFields.includes(steps[4])) {
                        setCurrentStep(5);
                        setShowComponent(() => <ShowBMI />)}
                    else if (!profileFields.includes(steps[5])) {
                        setCurrentStep(6);
                        setShowComponent(() => <AskGoal />)}
                    else if (!profileFields.includes(steps[6])) {
                        setCurrentStep(7);
                        setShowComponent(() => <AskPhysicalActivity />)}
                    else if (!profileFields.includes(steps[7])) {
                        setCurrentStep(8);
                        setShowComponent(() => <AskWorkoutFrequency />)}
                    else if (!profileFields.includes(steps[8])) {
                        setCurrentStep(9);
                        setShowComponent(() => <AskMealType />)}
                    else if (user.profile.mealType !== 'vegetarian' && !profileFields.includes(steps[9])) {
                        setCurrentStep(10);
                        setShowComponent(() => <AskVegDays />)}
                    else if (!profileFields.includes(steps[10])) {
                        setCurrentStep(11);
                        setShowComponent(() => <Plans />)}
                    else {
                        completeProfile();
                        setCurrentStep(-1);
                        setShowComponent(() => {
                            return (
                                <>
                                    <h1 className='text-2xl text-center font-bold'>{`Thank you for buying ${user.profile.activePlan.name} of INR ${user.profile.activePlan.price}, your plan for ${user.profile.activePlan.duration} day(s) is active now.`}</h1>
                                    <p className='text-l text-center'>Our team will connect with you and guide you in your diet journey.</p>
                                    <p className='text-l text-center'>You can also call us on +917391089755 or e-mail us at cafe.delivery@bodypower.com for any further query.</p>
                                    
                                    <a href='https://www.bodypower.com/' className='btn btn-primary w-full my-3'>Go to home</a>
                                </>
                            )
                        })
                    }
            } else {
                setShowComponent(() => {
                    console.log(deliveryPrice)
                    return (
                        <>
                            <div className="w-full h-full">
                                {deliveryPrice.errorMessage}
                            </div>
                        </>
                    )
                })
            }
        } else {
            setShowComponent(() => {
                console.log(deliveryPrice)
                return (
                    <>
                        <div className="w-full h-full">
                            we are looking for kitchen around you
                        </div>
                    </>
                )
            })
        }
        }
    }, [user, deliveryPrice]);

    return (
        <>
            <div className='max-w-lg mx-auto px-3'>
            {currentStep > 0 ? <>
                <div className='my-5'>
                    <button className='btn btn-accent' onClick={() => {
                        let data = {}
                        data[steps[currentStep - 1]] = deleteField();
                        updateDocument('users', data, user.uid).then(() => {
                            getDocument('users', user.uid).then((data) => setUser({ ...user, profile: {...data} }))
                        })
                    }}> &lt; Go Back</button>
                </div>
            </> : <></>}
                {showComponet}
            </div>
        </>
    )
}