'use client';
import { ChangeEvent, useState } from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import AuthModalInputs from './AuthModalInputs';

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

  const [inputs, setInputs] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    city: '',
    password: '',
  });

  const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
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
          <div className="p-2 h-[600px]">
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
              <button className="uppercase bg-red-600 w-full text-white p-3 rounded text-sm mb-5 disabled:bg-gray-400">
                {mode === 'Signin' ? 'Sign in' : 'Create account'}
              </button>
            </div>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
