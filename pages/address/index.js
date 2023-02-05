import React from "react"
import { getDocument, updateDocument } from "../../config/firebase"
import { useAuth } from "../../contexts/authContext";
import { useLocation } from "../../contexts/currentLocation";
import Link from "next/link";
import { useRouter } from "next/router";
export default function Address() {
    const [addresses, setAddresses] = React.useState([]);
    const [forward, setForward] = React.useState();
    const [continueText, setContinueText] = React.useState('Continue');
    const { user, setUser } = useAuth();
    const { setLocation } = useLocation();
    const router = useRouter()
    React.useEffect(() => {
        if (user && user.profile && user.profile.locations) {
            const locations = [...user.profile.locations]
            setAddresses(locations)
            const { forwardURL, title } = router.query
            if (forwardURL) setForward(forwardURL);
            if (title) setContinueText(title);
        }
    }, [user])

    return (
        <>
            <div className="max-w-2xl mx-auto">
                <ul className="w-96 mx-auto py-5">
                    {addresses.map((address, index) => {
                        return (
                            <>
                                <li key={index}>
                                    <div className="card bg-base-100 shadow-xl my-5">
                                        <div className="card-body">
                                            <h2 className="card-title">
                                                {address.house}
                                            </h2>
                                            <p>
                                                {address.street}
                                            </p>
                                            <div className="card-actions justify-end">
                                                {!address.default ? 
                                                    <button className="btn btn-primary" onClick={async () => {
                                                        const locations = [...user.profile.locations]
                                                        for (let i = 0; i < locations.length; i++){
                                                            if (locations[i].default) {
                                                                locations[i].default = false;
                                                            }
                                                            if (locations[i].lat === address.lat && locations[i].lng === address.lng && locations[i].house === address.house) {
                                                                locations[i].default = true;
                                                            }
                                                        }
                                                        await updateDocument(`users`, {
                                                            locations: locations
                                                        }, user.uid)
                                                        const profile = await getDocument('users', user.uid);
                                                        setUser({ ...user, profile: profile });
                                                    }}>Set as default</button>
                                                    : <button className="btn btn-disabled">default</button>
                                                }
                                                <button className="btn btn-error" onClick={async () => {
                                                    const locations = [...user.profile.locations]
                                                    for (let i = 0; i < locations.length; i++) {
                                                        if (locations[i].lat === address.lat && locations[i].lng === address.lng && locations[i].house === address.house) {
                                                            locations.splice(i, 1)
                                                        }
                                                    }
                                                    await updateDocument(`users`, {
                                                        locations: locations
                                                    }, user.uid)
                                                    const profile = await getDocument('users', user.uid);
                                                    setUser({ ...user, profile: profile });
                                                }}>Delete</button>
                                            </div>
                                        </div>
                                    </div>
                                </li>
                            </>
                        )
                    })}
                </ul>
                <div className="sticky bottom-5">
                    {forward ?
                        <button className="btn btn-primary w-full my-5" onClick={() => {
                            const location = addresses.filter((address) => address.default)
                            setLocation(location[0]);
                            router.push(forward)
                        }}>
                            {continueText}
                        </button>
                    : <></>}
                    <Link href={'/address/add'} className="btn btn-primary w-full">
                        Add Address
                    </Link>
                </div>
            </div>
        </>
    )
}