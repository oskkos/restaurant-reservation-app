'use client';
import { ChangeEvent, useContext, useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import AuthModalInputs from './AuthModalInputs';
import useAuth from '../hooks/useAuth';
import { AuthenticationContext } from '../context/AuthContext';
import { Alert, CircularProgress } from '@mui/material';
import { createSemanticDiagnosticsBuilderProgram } from 'typescript';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
};

const signinButton = (onClick: () => void) => {
  return (
    <button
      className="bg-blue-400 text-white border p-1 px-4 rounded mr-3"
      onClick={onClick}
    >
      Sign in
    </button>
  );
};
const signoutButton = (onClick: () => void) => {
  return (
    <button className="border p-1 px-4 rounded mr-3" onClick={onClick}>
      Sign up
    </button>
  );
};

export default function AuthModal({ mode }: { mode: 'Signin' | 'Signup' }) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const { signin, signup } = useAuth();
  const { loading, data, errors } = useContext(AuthenticationContext);

  const [inputs, setInputs] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    city: '',
    password: '',
  });

  const [disabled, setDisabled] = useState(true);

  useEffect(() => {
    if (mode === 'Signin') {
      setDisabled(!inputs.email || !inputs.password);
      return;
    }

    setDisabled(
      !inputs.firstName ||
        !inputs.lastName ||
        !inputs.email ||
        !inputs.phone ||
        !inputs.city ||
        !inputs.password,
    );
  }, [inputs, mode]);

  const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  const onSignClick = () => {
    if (mode === 'Signin') {
      signin({ email: inputs.email, password: inputs.password }, handleClose);
    } else {
      signup(inputs, handleClose);
    }
  };

  return (
    <div>
      {mode === 'Signin' ? signinButton(handleOpen) : signoutButton(handleOpen)}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          {loading ? (
            <div className="py-24 px-2 h-[600px] flex justify-center">
              <CircularProgress />
            </div>
          ) : (
            <div className="p-2 h-[600px]">
              {errors ? (
                <Alert severity="error" className="mb-4">
                  {errors.join('\n')}
                </Alert>
              ) : null}
              <div className="uppercase font-bold text-center pb-2 border-b mb-2">
                {mode === 'Signin' ? 'Sign in' : 'Create account'}
              </div>
              <div className="m-auto">
                <h2 className="text-2xl font-light text-center">
                  {mode === 'Signin'
                    ? 'Log into your account'
                    : 'Create your OpenTable account'}
                </h2>
                <AuthModalInputs
                  inputs={inputs}
                  onInputChange={onInputChange}
                  mode={mode}
                />
                <button
                  className="uppercase bg-red-600 w-full text-white p-3 rounded text-sm mb-5 disabled:bg-gray-400"
                  disabled={disabled}
                  onClick={onSignClick}
                >
                  {mode === 'Signin' ? 'Sign in' : 'Create account'}
                </button>
              </div>
            </div>
          )}
        </Box>
      </Modal>
    </div>
  );
}
