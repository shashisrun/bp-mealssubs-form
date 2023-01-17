import React from "react";
import { useAuth } from "../../contexts/authContext";
import { addNamedDocument, getDocument } from "../../config/firebase";
import Title from "../title";

export default function AskAge() {
    const [age, setAge] = React.useState('');
    const [error, setError] = React.useState('');
    const { user, setUser } = useAuth();

    return (
        <>
            <div className="my-2">
                <div className="form-control w-full">
                    <label className="label">
                        <span className="label-text">
                            <Title text="What is your age" />
                        </span>
                    </label>
                    <input type="text" placeholder="Enter your age" className="input input-bordered w-full"
                        value={age}
                        onChange={(event) => setAge(event.target.value)}
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
                        if (age === '') {
                            setError('Please enter a valid age');
                        } else {
                            try {
                                await addNamedDocument('users', {
                                    age: parseInt(age)
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