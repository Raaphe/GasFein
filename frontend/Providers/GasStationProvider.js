import React, { createContext, useState } from "react";

export const GasStationsContext = createContext();

export const GasStationsProvider = ({ children }) => {
  const [nearByStations, setnearByStations] = useState([]);

  return (
    <GasStationsContext.Provider value={{ nearByStations, setnearByStations }}>
      {children}
    </GasStationsContext.Provider>
  );
};
