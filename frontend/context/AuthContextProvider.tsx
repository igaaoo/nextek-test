'use client';
import { ReactNode, useEffect, useState } from 'react';
import AuthContext, { AuthContextType } from './AuthContext';
import { redirect, usePathname } from 'next/navigation';
import { sessionName, sessionExpires } from '@/config/session';
import jwt from 'jsonwebtoken';
import { siteConfig } from '@/config/site';

import { deleteCookie, getCookie, hasCookie, setCookie } from 'cookies-next';
import { jwtType } from '@/types/jwtType';

interface AuthContextProviderProps {
  children: ReactNode;
}

const AuthContextProvider = ({ children }: AuthContextProviderProps) => {
  let pathName = usePathname();

  const [token, setToken] = useState('');
  const [user, setUser] = useState('');
  const [role, setRole] = useState('');


  const login = (token: string) => {
    setToken(token);
    setCookie(sessionName, token, { maxAge: sessionExpires });

    const decodedToken = jwt.decode(token) as jwtType;

    setUser(decodedToken.email);
    setRole(decodedToken.role);
  };

  const logout = () => {
    deleteCookie(sessionName);
    setToken('');
  };


  const contextValue: AuthContextType = {
    token,
    user,
    role,
    login,
    logout,
  };


  useEffect(() => {
    if (hasCookie(sessionName)) {
      login(getCookie(sessionName)!.toString());
      siteConfig.mainNav.map((item) => {
        if (item.href == pathName) {
          handlePrivateRoute(item);
        }
      });
    } else {
      if (pathName != '/login') {
        redirect('/login');
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [role]);


  function handlePrivateRoute(item: any) {
    if (item.security === 'private' && role === 'user') {
      redirect('/');
    }
  }


  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
