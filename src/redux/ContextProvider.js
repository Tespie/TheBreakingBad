import React, { createContext, useEffect, useState } from 'react';

export const ContextData = createContext();

export const ContextProvider = ({ children }) => {

    const [reviewInfo, setReviewInfo] = useState([]);
    const [applyFilter, setApplyFilter] = useState([]);
    const [routeName, setRouteName] = useState(null);


    return (
        <ContextData.Provider value={{
            applyFilter,
            routeName,
            setRouteName,
            setApplyFilter,
            reviewInfo,
            setReviewInfo
        }}>
            {children}
        </ContextData.Provider>
    );
};