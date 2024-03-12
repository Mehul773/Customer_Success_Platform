import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";

export const UserContext = createContext({});

export function UserContextProvider({ children }) {
  const [myUser, setMyUser] = useState(null);
  const { user, isAuthenticated } = useAuth0();

  useEffect(() => {
    const checkUser = async () => {
      if (isAuthenticated && user) {
        const response = await axios.post("/check-user", { user });
        setMyUser(response.data);
      }
    };
    checkUser();
  }, [user, isAuthenticated]);

  return (
    <UserContext.Provider
      value={{
        myUser,
        setMyUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}
