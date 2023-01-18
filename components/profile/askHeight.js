import React from "react";
import { useAuth } from "../../contexts/authContext";
import { addNamedDocument, getDocument } from "../../config/firebase";
import Title from "../title";
import Image from "next/image";

export default function AskHeight() {
    const [height, setHeight] = React.useState('');
    const [error, setError] = React.useState('');
    const { user, setUser } = useAuth();

    return (
        <>
            <div className="my-2">
                <div className="form-control w-full">
                    <label className="label">
                        <span className="label-text">
                            <Title text={"What is your height"} />
                        </span>
                    </label>
                    <input type="text" placeholder="Enter your height (cm)" className="input input-bordered w-full"
                        value={height}
                        onChange={(event) => setHeight(event.target.value)}
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
                        if (height === '') {
                            setError('Please enter a valid height');
                        } else {
                            try {
                                await addNamedDocument('users', {
                                    height: parseInt(height)
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
            {/* <div className="my-5">
                <Image src={'/assets/height.png'} width={1080} height={1080} className="w-64 mx-auto" />
            </div> */}
        </>
    )
}