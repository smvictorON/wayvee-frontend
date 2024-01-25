import React, { createContext, ReactNode, useState } from "react";
import useAuth from "../hooks/useAuth";

interface UserContextProps {
  authenticated: boolean;
  register: (user: any) => Promise<void>;
  logout: () => void;
  login: (user: any) => Promise<void>;
  loading: boolean;

}

const Context = createContext<UserContextProps>({
  authenticated: false,
  register: async () => {},
  logout: () => {},
  login: async () => {},
  loading: false,
});

interface UserProviderProps {
  children: ReactNode;
}

const UserProvider = ({ children }: UserProviderProps) => {
  const { authenticated, register, logout, login } = useAuth();
  const [loading, setLoading] = useState(false);

  return (
    <Context.Provider value={{ authenticated, register, logout, login, loading }}>
      {children}
    </Context.Provider>
  );
};

export { Context, UserProvider };
