import React from "react";
import { useAuth } from "../../contexts/authContext";
import { addNamedDocument, getDocument } from "../../config/firebase";

export default function AskName() {
    const [name, setName] = React.useState('');
    const [error, setError] = React.useState('');
    const { user, setUser } = useAuth();

    return (
        <>
            <div className="my-2">
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">What is your name?</span>
                    </label>
                    <input type="text" placeholder="Enter your name" className="input input-bordered w-full bg-base-100 text-primary"
                        value={name}
                        onChange={(event) => setName(event.target.value)}
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
                            if (name === '' && name.length < 3) {
                                setError('Please enter a valid name');    
                            } else {
                                try {
                                    await addNamedDocument('users', {
                                        name: name
                                    }, user.uid)
                                    const profile = await getDocument('users', user.uid);
                                    setUser({...user, profile : profile});
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