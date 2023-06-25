'use client';
import React, { useState, createContext, useEffect } from 'react';
import { getCookie } from 'cookies-next';
import axios from 'axios';

interface User {
  firstName: string;
  lastName: string;
  email: string;
  city: string;
  phone: string;
}
interface State {
  loading: boolean;
  errors: string[] | null;
  data: User | null;
}
interface AuthState extends State {
  setAuthState: React.Dispatch<React.SetStateAction<State>>;
}

const fetchUser = async (
  setAuthState: (value: React.SetStateAction<State>) => void,
) => {
  setAuthState({ data: null, errors: null, loading: true });
  try {
    const jwt = getCookie('jwt');

    if (!jwt) {
      setAuthState({ data: null, errors: null, loading: false });
      return;
    }

    const response = await axios.get('/api/auth/whoami', {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });
    axios.defaults.headers.common['Authorization'] = `Bearer ${jwt}`;
    setAuthState({ data: response.data, errors: null, loading: false });
  } catch (e: any) {
    setAuthState({
      data: null,
      errors: e.response.data.errors as string[], // TODO: this might not exist
      loading: false,
    });
  }
};

export const AuthenticationContext = createContext<AuthState>({
  loading: false,
  data: null,
  errors: null,
  setAuthState: () => {},
});

export default function AuthContext({
  children,
}: {
  children: React.ReactNode;
}) {
  const [authState, setAuthState] = useState<State>({
    loading: false,
    data: null,
    errors: null,
  });

  useEffect(() => {
    fetchUser(setAuthState);
  }, []);
  return (
    <AuthenticationContext.Provider value={{ ...authState, setAuthState }}>
      {children}
    </AuthenticationContext.Provider>
  );
}
