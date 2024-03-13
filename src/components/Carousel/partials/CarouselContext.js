import React, { useState } from 'react';

export const CarouselContext = React.createContext({});

export const CarouselContextProvider = ({ children }) => {
    const [swiper, set_swiper] = useState(null);

    return (
        <CarouselContext.Provider value={{ swiper, set_swiper }}>
            {children}
        </CarouselContext.Provider>
    );
};