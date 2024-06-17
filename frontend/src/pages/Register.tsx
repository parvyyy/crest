import React from 'react';
import axios, { AxiosResponse } from 'axios';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { TextInput, Button, Label, Alert } from "flowbite-react";
import { HiUser, HiMail, HiLockClosed } from 'react-icons/hi';

import { TokenContext } from '../App.tsx';

const Register  = () => {
  const navigate = useNavigate();

  const tokManager = React.useContext(TokenContext);
  if (!tokManager) {
    throw new Error("Must be within a valid TokenProvider")
  }
  
  const { token, updateToken } = tokManager;

  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [confirmedPassword, setConfirmedPassword] = React.useState('');
  const [name, setName] = React.useState('')

  const [error, setError] = React.useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    e.stopPropagation();

    // Password Validation
    const registerBody = { email, password, name };

    try {
      const resp = await axios.post('http://localhost:5000/auth/register', registerBody);
      console.log(resp)
      updateToken(resp.data.token)
      navigate('/dashboard');
    } catch (error) {
      console.log(error)
      setError(error.response.data.error);
    }

    return;
  }

  return (
    <div className='flex flex-col justify-center items-center h-screen'>
      {/* {token && <Navigate to='/dashboard' replace={true} />} */}
      {error && (
        <Alert color='failure' onDismiss={() => setError("")}>
          <span className='font-medium'>{error}</span>
        </Alert>
      )}

      <form 
        className='flex flex-col gap-6 w-full max-w-xl px-4 py-8'
        onSubmit={handleSubmit}
      >
      <div>
          <Label value='Name' />
          <TextInput
            id='register-name'
            type='text'
            icon={HiUser}
            onChange={(e) => setName(e.target.value)}
            placeholder='parvyyy'
            required
          />
        </div>
        <div>
          <Label value='Email' />
          <TextInput
            id='register-email'
            type='email'
            icon={HiMail}
            onChange={(e) => setEmail(e.target.value)}
            placeholder='parvyyy@email.com'
            required
          />
        </div>
        <div>
          <Label value='Password' />
          <TextInput
            id='register-password'
            type='password'
            icon={HiLockClosed}
            onChange={(e) => setPassword(e.target.value)}
            placeholder='******'
            required
          />
        </div>
        <div>
          <Label value='Confirm Password' />
          <TextInput
            id='register-confirm-password'
            type='password'
            icon={HiLockClosed}
            onChange={(e) => setConfirmedPassword(e.target.value)}
            placeholder='******'
            required
          />
        </div>
        <Button 
          id='register-submit' 
          className='bg-violet-600 enabled:hover:bg-violet-700' 
          type='submit'
        >
          Register
        </Button>
        <Label>
          Already have an account?{' '}
          <Link to='/login' className='text-violet-600 hover:underline'>
            Log-in
          </Link>
        </Label>
      </form>
    </div>
  )
}

export default Register;