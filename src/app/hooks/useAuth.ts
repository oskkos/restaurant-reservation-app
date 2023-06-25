import axios from 'axios';
import { useContext } from 'react';
import { AuthenticationContext } from '../context/AuthContext';

const useAuth = () => {
  const { setAuthState } = useContext(AuthenticationContext);
  const signin = async (
    {
      email,
      password,
    }: {
      email: string;
      password: string;
    },
    onSuccess: () => void,
  ) => {
    setAuthState({ data: null, errors: null, loading: true });
    try {
      const response = await axios.post('/api/auth/signin', {
        email,
        password,
      });
      setAuthState({ data: response.data, errors: null, loading: false });
      onSuccess();
    } catch (e: any) {
      setAuthState({
        data: null,
        errors: e.response.data.errors as string[], // TODO: this might not exist
        loading: false,
      });
    }
  };
  const signup = async (
    {
      firstName,
      lastName,
      city,
      phone,
      email,
      password,
    }: {
      firstName: string;
      lastName: string;
      city: string;
      phone: string;
      email: string;
      password: string;
    },
    onSuccess: () => void,
  ) => {
    setAuthState({ data: null, errors: null, loading: true });
    try {
      const response = await axios.post('/api/auth/signup', {
        firstName,
        lastName,
        city,
        phone,
        email,
        password,
      });
      setAuthState({ data: response.data, errors: null, loading: false });
      onSuccess();
    } catch (e: any) {
      setAuthState({
        data: null,
        errors: e.response.data.errors as string[], // TODO: this might not exist
        loading: false,
      });
    }
  };

  return {
    signin,
    signup,
  };
};

export default useAuth;
