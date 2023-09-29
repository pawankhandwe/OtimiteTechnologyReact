import { useState, createContext, ReactNode, useContext } from "react";

const AuthContext = createContext<any>(null);

interface AuthProviderProps {
    children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
    const [user, setUser] = useState(false);
    

    return (
        <AuthContext.Provider value={{ user,setUser}}>
            {children}
        </AuthContext.Provider>
    );
};
 
export const useAuth=()=>{
    return useContext(AuthContext)
}