import React from 'react';
import Router from 'next/router'
import { useAuth } from '../contexts/authContext'
import { setUpRecaptcha, addNamedDocument, getDocument, serverTimestamp } from '../config/firebase';
import AskName from '../components/profile/askName';
import Title from '../components/title';

export default function Home() {
    const [phone, setPhone] = React.useState('+91');
    const [confirmObject, setConfirmObject] = React.useState(null);
    const [otp, setOtp] = React.useState('');
    const [error, setError] = React.useState();
    const { user, setUser } = useAuth();


    React.useEffect(() => {
        console.log(user)
        if (user && user.profile && user.profile.name) {
            Router.push('/completeProfile')
        }
    }, [user])

    const sendOTP = async (event) => {
        event.preventDefault();
        // setSentOtp(true)
        try {
            const reponse = await setUpRecaptcha(phone)
            setConfirmObject(reponse);
        } catch (error) {
            setError(error.message);
        }
    }

    const verifyOTP = async (event) => {
        event.preventDefault();
        // setSentOtp(true)
        try {
            setError(null);
            const reponse = await confirmObject.confirm(otp)
            console.log(reponse.user.phoneNumber);
            const getUser = await getDocument('users', reponse.user.uid);
            if (!getUser) {
                const responseNew = await addNamedDocument('users', {
                    phone: reponse.user.phoneNumber,
                    isRegistrationComplete: false,
                    isActive: true,
                    lastLogin: serverTimestamp(),
                    createdAt: serverTimestamp()
                }, reponse.user.uid)
                if (responseNew) {
                    const profile = await getDocument('users', user.uid);
                    setUser({ ...user, profile: profile });
                }
            } else {
                const responseNew = await addNamedDocument('users', {
                    ...getUser,
                    lastLogin: serverTimestamp()
                }, reponse.user.uid)
                if (responseNew) {
                    const profile = await getDocument('users', user.uid);
                    setUser({ ...user, profile: profile });
                }
            }
        } catch (error) {
            setError(error.message);
        }
    }

    return (
        <>
            <div className='w-full max-w-lg mx-auto'>
                {!user
                    ?
                    <div className="container mx-auto px-5 py-5">
                        {!confirmObject ?
                            <>
                                <div className="my-2">
                                    <div className="form-control">
                                        <label className="label">
                                            <span className="label-text">
                                                <Title text={"What is your phone number?"} />
                                            </span>
                                        </label>
                                        <input type="text" placeholder="Enter your phone" className="input input-bordered w-full bg-base-100 text-primary"
                                            value={phone}
                                            onChange={(event) => {
                                                const re = /^[0-9\b]+$/;
                                                if ((event.target.value.split("+")[1] === '' || re.test(event.target.value.split("+")[1])) && event.target.value.length <= 13) {
                                                    setPhone(event.target.value)
                                                }
                                            }}
                                        />
                                    </div>
                                </div>
                                <div className="my-1">
                                    {error}
                                </div>
                                <div className="my-2">
                                    <button
                                        className="btn btn-primary w-full"
                                        onClick={sendOTP}
                                    >Send OTP</button>
                                </div>
                                <div className="my-2">
                                    <div id='recaptcha-container'></div>
                                </div>
                            </>
                            :
                            <>
                                <div className="my-2">
                                    <div className="form-control">
                                        <label className="label">
                                            <span className="label-text">
                                                <Title text={"Please provide OTP"} />
                                            </span>
                                        </label>
                                        <input type="text" placeholder="Enter OTP" className="input input-bordered w-full bg-base-100 text-primary"
                                            value={otp}
                                            onChange={(event) => {
                                                const re = /^[0-9\b]+$/;
                                                if ((event.target.value === '' || re.test(event.target.value)) && event.target.value.length <= 6) {
                                                    setOtp(event.target.value)
                                                }
                                            }}
                                        />
                                    </div>
                                </div>
                                <div className="my-1">
                                    {error}
                                </div>
                                <div className="my-2">
                                    <button
                                        className="btn btn-primary w-full"
                                        onClick={verifyOTP}
                                    >Verify</button>
                                </div>
                            </>
                        }
                    </div>
                    :
                    <>
                        {user.profile && !user.profile.name
                            ? <AskName />
                            : <></>
                        }
                    </>
                }
            </div>
        </>
    )
}