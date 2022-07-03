import React, { createContext, useState } from "react";

export const AppContext = createContext();

const Context = ({ children }) => {
  const userInfo =
    localStorage.getItem("user") !== "undefined"
      ? JSON.parse(localStorage.getItem("user"))
      : localStorage.clear();

  const [user, setUser] = useState(null);

  return (
    <AppContext.Provider value={{ userInfo, user, setUser }}>
      {children}
    </AppContext.Provider>
  );
};

export default Context;
