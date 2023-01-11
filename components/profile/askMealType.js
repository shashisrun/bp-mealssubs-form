import React from "react";
import { useAuth } from "../../contexts/authContext";
import { addNamedDocument, getDocument } from "../../config/firebase";
import { FaAppleAlt, FaFish, FaEgg } from "react-icons/fa";

export default function AskMealType() {
    const [mealType, setMealType] = React.useState('');
    const [error, setError] = React.useState('');
    const { user, setUser } = useAuth();

    return (
        <>
            <div className="my-2">
                    You are
                <div className="my-1">
                    <label className="btn btn-default py-1 bg-secondary hover:bg-primary w-full" htmlFor="vegetarian">
                        <FaAppleAlt size={24} />
                        <span className="mx-2">
                            Vegetarian
                        </span>
                    </label>
                    <input type="radio" name="mealType" className="radio radio-accent" hidden id="vegetarian" onClick={(event) => setMealType('vegetarian')} />
                </div>
                <div className="my-1">
                    <label className="btn btn-default py-1 bg-secondary hover:bg-primary w-full" htmlFor="eggiterian">
                        <FaEgg size={24} />
                        <span className="mx-2">
                            Eggiterian
                        </span>
                    </label>
                    <input type="radio" name="mealType" className="radio radio-accent" hidden id="eggiterian" onClick={(event) => setMealType('eggiterian')} />
                </div>
                <div className="my-1">
                    <label className="btn btn-default py-1 bg-secondary hover:bg-primary w-full" htmlFor="non-vegetarian">
                        <FaFish size={24} />
                        <span className="mx-2">
                            Non Vegetarian
                        </span>
                    </label>
                    <input type="radio" name="mealType" className="radio radio-accent" hidden id="non-vegetarian" onClick={(event) => setMealType('non-vegetarian')} />
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
                        if (mealType === '') {
                            setError('Please Select your meal type');
                        } else {
                            try {
                                await addNamedDocument('users', {
                                    mealType: mealType
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