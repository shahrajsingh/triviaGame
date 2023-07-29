import React, { createContext, useState, useContext, useEffect } from 'react';
import { useNavigate,useLocation } from 'react-router-dom';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const exemptedRoutes = {
      "/signup": 1,
      "/create2fa":2,
      "/complete2fa": 3
    };

    if (isAuthenticated) {
      navigate('/');
    }else if(exemptedRoutes[location.pathname]){
        const user = window.localStorage.getItem("userEmail");
        if(!user && location.pathname !== "/signup"){
          navigate("/login");
        }
    } else {
      navigate('/login');
    }
  }, [isAuthenticated, location.pathname, navigate]);

  return (
    <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
