import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useRegister } from '../hooks/useAuthApi';

const RegisterPage = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const navigate = useNavigate();

  const { mutate: register, isPending } = useRegister();

  const handleRegister = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    const dataToSubmit = { email: email.trim(), password: password.trim() };

    register(dataToSubmit, {
      onSuccess: () => navigate('/incidents'),
      onError: (error) => alert(error.message),
    });
  };

  if (isPending) return <h1>Saving user info...</h1>;

  return (
    <div className="page">
      <h1>Welcome to Incidents map manager</h1>

      <form onSubmit={handleRegister} className="form">
        <input
          className="input"
          type="text"
          placeholder="email"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          className="input"
          type="text"
          placeholder="password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button type="submit">Register</button>
      </form>

      <h4>Already have an account?</h4>
      <Link to="/login">Login</Link>
    </div>
  );
};

export default RegisterPage;
