import React from "react";
import { useAuth } from "../../contexts/authContext";
import { addNamedDocument, getDocument } from "../../config/firebase";


export default function AskWeight() {
    const [weight, setWeight] = React.useState('');
    const [error, setError] = React.useState('');
    const { user, setUser } = useAuth();

    return (
        <>
            <div className="my-2">
                <div className="form-control w-full max-w-xs">
                    <label className="label">
                        <span className="label-text">
                            Your weight?
                        </span>
                    </label>
                    <input type="text" placeholder="Enter your weight (kg)" className="input w-full bg-secondary"
                        value={weight}
                        onChange={(event) => setWeight(event.target.value)}
                    />
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
                        if (weight === '') {
                            setError('Please enter a valid weight');
                        } else {
                            try {
                                await addNamedDocument('users', {
                                    weight: parseInt(weight)
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