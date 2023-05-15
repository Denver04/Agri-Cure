import React from "react";

// eslint-disable-next-line react-refresh/only-export-components
export const drawerContext = React.createContext();

// eslint-disable-next-line react/prop-types
export const DrawerProvider = ({ children }) => {
    const [leftmenu, setleftmenu] = React.useState(false);

    const updateLeftmenu = (value) => {
        setleftmenu(value);
    };
  
    return (
      <drawerContext.Provider value={{  leftmenu , updateLeftmenu }}>
        {children}
      </drawerContext.Provider>
    );
};