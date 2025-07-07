import React, { useState } from 'react';
import axios from 'axios';

function RegisterPage() {
  const [form, setForm] = useState({ name: '', email: '', password: '' });

  const register = async () => {
    await axios.post(`${process.env.REACT_APP_API_URL}/register`, form);
    alert("Inscription réussie !");
    window.location.href = '/login';
  };

  return (
    <div>
      <h2>Inscription</h2>
      <input placeholder="Nom" onChange={e => setForm({ ...form, name: e.target.value })} />
      <input placeholder="Email" onChange={e => setForm({ ...form, email: e.target.value })} />
      <input placeholder="Mot de passe" type="password" onChange={e => setForm({ ...form, password: e.target.value })} />
      <button onClick={register}>S'inscrire</button>
    </div>
  );
}

export default RegisterPage;
