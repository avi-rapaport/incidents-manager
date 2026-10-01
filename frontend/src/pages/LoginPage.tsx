import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useLogin } from '../hooks/useAuthApi';

const LoginPage = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const navigate = useNavigate();

  const { mutate: register, isPending } = useLogin();

  const handleRegister = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    const dataToSubmit = { email: email.trim(), password: password.trim() };

    register(dataToSubmit, {
      onSuccess: () => navigate('/incidents'),
      onError: (error) => alert(error.message),
    });
  };

  if (isPending) return <h1>Verify user info...</h1>;

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

        <button type="submit">Login</button>
      </form>

      <h4>Don't have an account?</h4>
      <Link to="/register">Register</Link>
    </div>
  );
};

export default LoginPage;
