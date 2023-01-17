import React from "react";
import { useAuth } from "../../contexts/authContext";
import { addNamedDocument, getDocument } from "../../config/firebase";
import Title from "../title";


export default function AskPhysicalActivity() {
    const [physicalActivity, setPhysicalActivity] = React.useState('');
    const [error, setError] = React.useState('');
    const { user, setUser } = useAuth();

    return (
        <>
            <div className="my-2">
                <div className="form-control w-full">
                    <label className="label">
                        <span className="label-text">
                            <Title text={'Your Physical Activity (Steps per Day)'} />
                        </span>
                    </label>
                </div>
                <div className="my-1">
                    <label className={`btn btn-ghost py-1 ${physicalActivity === 'Low (< 2500)' ? 'bg-primary text-accent' : 'bg-accent'} hover:bg-primary w-full`} htmlFor="low">{`Low (< 2500)`}</label>
                    <input type="radio" name="physicalActivity" className="radio radio-accent" hidden id="low" onClick={(event) => setPhysicalActivity('Low (< 2500)')} />
                </div>
                <div className="my-1">
                    <label className={`btn btn-ghost py-1 ${physicalActivity === 'Average (2500 - 5000)' ? 'bg-primary text-accent' : 'bg-accent'} hover:bg-primary w-full`} htmlFor="average">{`Average (2500 - 5000)`}</label>
                    <input type="radio" name="physicalActivity" className="radio radio-accent" hidden id="average" onClick={(event) => setPhysicalActivity('Average (2500 - 5000)')} />
                </div>
                <div className="my-1">
                    <label className={`btn btn-ghost py-1 ${physicalActivity === 'High (5000 - 10000)' ? 'bg-primary text-accent' : 'bg-accent'} hover:bg-primary w-full`} htmlFor="high">{`High (5000 - 10000)`}</label>
                    <input type="radio" name="physicalActivity" className="radio radio-accent" hidden id="high" onClick={(event) => setPhysicalActivity('High (5000 - 10000)')} />
                </div>
                <div className="my-1">
                    <label className={`btn btn-ghost py-1 ${physicalActivity === 'Very High (10000+)' ? 'bg-primary text-accent' : 'bg-accent'} hover:bg-primary w-full`} htmlFor="veryhigh">{`Very High (10000+)`}</label>
                    <input type="radio" name="physicalActivity" className="radio radio-accent" hidden id="veryhigh" onClick={(event) => setPhysicalActivity('Very High (10000+)')} />
                </div>
            </div>
            <div className="my-1">
                {error}
            </div>
            <div className="my-2">
                <button
                    className="btn btn-primary w-full"
                    onClick={async (event) => {
                        event.preventDefault();
                        if (physicalActivity === '') {
                            setError('Please enter a valid physicalActivity');
                        } else {
                            try {
                                await addNamedDocument('users', {
                                    physicalActivity: physicalActivity
                                }, user.uid)
                                const profile = await getDocument('users', user.uid);
                                setUser({ ...user, profile: profile });
                            } catch (error) {
                                console.log(error);
                            }
                        }
                    }
                    }
                >Next</button>
            </div>
        </>
    )
}