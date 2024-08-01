import React, { createContext, useContext, useState } from 'react';

const UserContext = createContext(null);

export const useUserContext = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};


//Edits to be made to the Login Component, step 1
// import { useUserContext } from './userContext';
// setUser({ username: response.data.username, token: token });
//navigate('/dashboard')
