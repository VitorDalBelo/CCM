import React, { createContext } from "react";
import useAuth from "../../hooks/useAuth";

export type AuthContextType = {
    loading: boolean;
    user: any; 
    isAuth: boolean;
    handleLogin: (email:string,senha:string) => Promise<void>;
    handleLogout: () => void;
    setUser: (user: any) => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const AuthProvider = ({ children }:any) => {
	const { loading, user, isAuth, handleLogin, handleLogout ,setUser} = useAuth();

	return (
        <AuthContext.Provider value={{ loading, user, isAuth, handleLogin, handleLogout, setUser }}>
            {children}
        </ AuthContext.Provider >
	);
};

export { AuthContext, AuthProvider };