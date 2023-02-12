import React from 'react';
import { useLocation } from './currentLocation';

const DeliveryPriceContext = React.createContext();

export const useDeliveryPrice = () => React.useContext(DeliveryPriceContext);

export function DeliveryPriceProvider({ children }) {
    const [deliveryPrice, setDeliveryPrice] = React.useState();
    const { location } = useLocation()

    React.useEffect(() => {
        if (location) {
            fetch('/api/getNearestKitchen', {
                method: 'POST',
                body: JSON.stringify({
                    lat: location.lat,
                    lng: location.lng
                })
            }).then(async (data) => {
                const deliverydetails = await data.json()
                console.log(deliverydetails)
                setDeliveryPrice(deliverydetails);
            })
        }
    }, [location])

    return (
        <DeliveryPriceContext.Provider value={{ deliveryPrice, setDeliveryPrice }}>{children}</DeliveryPriceContext.Provider>
    );
}