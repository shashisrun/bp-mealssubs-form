import React from "react";
import { useAuth } from "../../contexts/authContext";
import { addNamedDocument, getDocument } from "../../config/firebase";
import { FaWeight, FaBicycle, FaDumbbell } from "react-icons/fa";
import Title from "../title";

export default function AskGoal() {
    const [goal, setGoal] = React.useState('');
    const [error, setError] = React.useState('');
    const { user, setUser } = useAuth();

    return (
        <>
            <div className="my-2">
                <div className="form-control w-full">
                    <label className="label">
                        <span className="label-text">
                            <Title text={"Your goal is"} />
                        </span>
                    </label>
                </div>
                
                
                <div className="my-1">
                    <label className={`btn btn-ghost py-1 ${goal === 'Drop Body Fat' ? 'bg-primary text-accent' : 'bg-accent'} hover:bg-primary w-full`} htmlFor="dropfat">
                        <FaWeight size={24} />
                        <span className="mx-2">
                        Drop Body Fat
                        </span>
                    </label>
                    <input type="radio" name="goal" className="radio radio-accent" hidden id="dropfat" onClick={(event) => setGoal('Drop Body Fat')} />
                </div>
                <div className="my-1">
                    <label className={`btn btn-ghost py-1 ${goal === 'Add Muscle' ? 'bg-primary text-accent' : 'bg-accent'} hover:bg-primary w-full`} htmlFor="addmuscle">
                        <FaDumbbell size={24} />
                        <span className="mx-2">
                        Add Muscle
                        </span>
                    </label>
                    <input type="radio" name="goal" className="radio radio-accent" hidden id="addmuscle" onClick={(event) => setGoal('Add Muscle')} />
                </div>
                <div className="my-1">
                    <label className={`btn btn-ghost py-1 ${goal === 'Maintain' ? 'bg-primary text-accent' : 'bg-accent'} hover:bg-primary w-full`} htmlFor="maintain">
                        <FaBicycle size={24} />
                        <span className="mx-2">
                        Maintain
                        </span>
                    </label>
                    <input type="radio" name="goal" className="radio radio-accent" hidden id="maintain" onClick={(event) => setGoal('Maintain')} />
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
                        if (goal === '') {
                            setError('Please enter a valid goal');
                        } else {
                            try {
                                await addNamedDocument('users', {
                                    goal: goal
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