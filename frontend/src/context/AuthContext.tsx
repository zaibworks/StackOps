import { createContext, useContext, useEffect, useState } from "react";
import api from "../api/axios.js";

type AuthProvideProps={
  children:React.ReactNode
}

interface userType{
  id:number
  email:string
  name:string
}
interface AuthContextType{
  user: userType | null
  setUser: React.Dispatch<React.SetStateAction<userType | null>>
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }:AuthProvideProps) => {
 const [user, setUser] = useState<userType | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("token");

      if (!token) return;

      try {
        const response = await api.get("/user/me");
        setUser(response.data);
      } catch (err) {
        console.log(err);
        localStorage.removeItem("token");
      }
    };

    fetchUser();
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};