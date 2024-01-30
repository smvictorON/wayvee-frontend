import React, { createContext, ReactNode, useState } from "react";
import useAuth from "../hooks/useAuth";

interface UserContextProps {
  authenticated: boolean;
  register: (user: any) => Promise<void>;
  logout: () => void;
  login: (user: any) => Promise<void>;
  loading: boolean;
  setLoading: (loading: boolean) => void;

}

const Context = createContext<UserContextProps>({
  authenticated: false,
  register: async () => {},
  logout: () => {},
  login: async () => {},
  loading: false,
  setLoading: () => {},
});

interface UserProviderProps {
  children: ReactNode;
}

const UserProvider = ({ children }: UserProviderProps) => {
  const { authenticated, register, logout, login } = useAuth();
  const [loading, setLoading] = useState(false);

  return (
    <Context.Provider value={{ authenticated, register, logout, login, loading, setLoading }}>
      {children}
    </Context.Provider>
  );
};

export { Context, UserProvider };
