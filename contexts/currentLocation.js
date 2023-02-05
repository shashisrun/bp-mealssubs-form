import React from 'react';

const LocationContext = React.createContext();

export const useLocation = () => React.useContext(LocationContext);

export function LocationProvider({ children }) {
    const [location, setLocation] = React.useState();

    return (
        <LocationContext.Provider value={{ location, setLocation }}>{children}</LocationContext.Provider>
    );
}