import { createContext, useState, ReactNode } from "react";

interface AuthContextType {
  isAuthenticated: boolean;
  login: (token: string, refreshToken: string) => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(
    !!localStorage.getItem("accessToken")
  );

  const login = (token: string, refreshToken: string) => {
    setIsAuthenticated(true);
    localStorage.setItem("accessToken", token); // Save token
    localStorage.setItem("refreshToken", refreshToken); // Save token
  };

  const logout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem("accessToken"); // Remove token
    localStorage.removeItem("refreshToken"); // Remove token
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
