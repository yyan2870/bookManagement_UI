import React from "react";
import { parseAuth } from "./utils/tokenParser";

const AuthContext = React.createContext(null);

function AuthProvider({ children }) {
  const [user, setUser] = React.useState(null);

  const signin = (newUser, callback) => {
    const parsed = parseAuth(newUser.token);
    console.log('parsed', JSON.stringify(parsed));
    const rolePart = parseAuth(newUser.token).rolePart;
    setUser(newUser);
    sessionStorage.setItem("token", parsed.authPart);
    sessionStorage.setItem("role", atob(rolePart));
    callback();
  };

  const signout = (callback) => {
    setUser(null);
    callback();
  };

  const value = { user, signin, signout };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
/* eslint-disable */
function u_atob(ascii) {
  return Uint8Array.from(atob(ascii), c => c.charCodeAt(0));
}
/* eslint-enable */


export { AuthProvider, AuthContext };