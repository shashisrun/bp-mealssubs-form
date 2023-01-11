import React from 'react';
import { useAuth } from '../contexts/authContext';
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

export default function CompleteProfile() {
    const { user, setUser } = useAuth();
    const [currentStep, setCurrentStep] = React.useState(-1)
    const [showComponet, setShowComponent] = React.useState(() => {
        return (
            <>
                <div className="w-full h-full">
                    <progress class="progress w-2/3"></progress>
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
            console.log(user.profile);
            const profileFields = Object.keys(user.profile)
            console.log(profileFields)
            if (!profileFields.includes(steps[0])) {
                setCurrentStep(0);
                setShowComponent(() => <AskGender />)
            }
            else if (!profileFields.includes(steps[1])) {
                setCurrentStep(1);
                setShowComponent(() => <AskAge />)}
            else if (!profileFields.includes(steps[2])) {
                setCurrentStep(2);
                setShowComponent(() => <AskHeight />)}
            else if (!profileFields.includes(steps[3])) {
                setCurrentStep(3);
                setShowComponent(() => <AskWeight />)}
            else if (!profileFields.includes(steps[4])) {
                setCurrentStep(4);
                setShowComponent(() => <ShowBMI />)}
            else if (!profileFields.includes(steps[5])) {
                setCurrentStep(5);
                setShowComponent(() => <AskGoal />)}
            else if (!profileFields.includes(steps[6])) {
                setCurrentStep(6);
                setShowComponent(() => <AskPhysicalActivity />)}
            else if (!profileFields.includes(steps[7])) {
                setCurrentStep(7);
                setShowComponent(() => <AskWorkoutFrequency />)}
            else if (!profileFields.includes(steps[8])) {
                setCurrentStep(8);
                setShowComponent(() => <AskMealType />)}
            else if (user.profile.mealType !== 'vegetarian' && !profileFields.includes(steps[9])) {
                setCurrentStep(9);
                setShowComponent(() => <AskVegDays />)}
            else if (!profileFields.includes(steps[10])) {
                setCurrentStep(10);
                setShowComponent(() => <Plans />)}
            else {
                completeProfile();
                setCurrentStep(-1);
                setShowComponent(() => {
                    return (
                        <>
                            <ImageViewer src={successfull} width={1080} height={1080} classname='w-full' />
                            
                                Your profile registration is complete
                            
                            <button
                                className='btn btn-primary w-full'
                                onClick={(event) => {
                                    event.preventDefault()
                                    router.push('/')
                                }}
                            >Go to home</button>
                        </>
                    )
                })
            }
        }
    }, [user]);
    
    return (
        <>
            <div className='max-w-lg mx-auto'>
                {showComponet}
                {currentStep > 0 ? <>
                    <div className='my-5'>
                        <button className='btn btn-secondary w-full' onClick={() => {
                            let data = {}
                            data[steps[currentStep - 1]] = deleteField();
                            updateDocument('users', data, user.uid).then(() => {
                                getDocument('users', user.uid).then((data) => setUser({ ...user, profile: {...data} }))
                            })
                        }}>Go Back</button>
                    </div>
                </> : <></>}
            </div>
        </>
    )
}