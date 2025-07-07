import React, { useState } from 'react';
import axios from 'axios';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const login = async () => {
    const res = await axios.post(`${process.env.REACT_APP_API_URL}/login`, { email, password });
    localStorage.setItem('token', res.data.token);
    window.location.href = '/';
  };

  return (
    <div>
      <h2>Connexion</h2>
      <input onChange={e => setEmail(e.target.value)} placeholder="Email" />
      <input onChange={e => setPassword(e.target.value)} type="password" placeholder="Mot de passe" />
      <button onClick={login}>Connexion</button>
    </div>
  );
}

export default LoginPage;
