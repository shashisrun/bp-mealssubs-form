import React from "react";
import { useAuth } from "../../contexts/authContext";
import { addNamedDocument, getDocument } from "../../config/firebase";
import Title from "../title";


export default function AskVegDays() {
    const [vegDays, setVegDays] = React.useState([]);
    const { user, setUser } = useAuth();

    const days = [
        'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'
    ];
    return (
        <>
            <div className="form-control w-full">
                <label className="label">
                    <span className="label-text">
                        <Title text={'Do you have any vegetarian days?, if yes select below or click next'} />
                    </span>
                </label>
            </div>
            
            <div className="form-control">
                {days.map((day, index) => {
                    return (
                        <label className="label cursor-pointer" key={index}>
                            <span className="label-text">{day}</span>
                            <input type="checkbox" checked={vegDays.includes(day)} className="checkbox" onChange={() => {
                                if (vegDays.includes(day)) {
                                    const selectedDays = [...vegDays]
                                    selectedDays.splice(vegDays.indexOf(day), 1);
                                    setVegDays(selectedDays)
                                } else {
                                    const selectedDays = [...vegDays]
                                    selectedDays.push(day)
                                    setVegDays(selectedDays)
                                }
                            }} />
                        </label>
                    )
                })}
            </div>
            <div className="my-2">
                <button
                    className="btn btn-primary w-full"
                    onClick={async (event) => {
                            event.preventDefault();
                            try {
                                await addNamedDocument('users', {
                                    vegDays: vegDays
                                }, user.uid)
                                const profile = await getDocument('users', user.uid);
                                setUser({ ...user, profile: profile });
                            } catch (error) {
                                console.log(error);
                            }
                        }
                    }
                >Next</button>
            </div>
        </>
    )
}