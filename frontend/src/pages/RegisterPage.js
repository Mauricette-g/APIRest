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
      <input class="me-2" placeholder="Nom" onChange={e => setForm({ ...form, name: e.target.value })} />
      <input class="me-2" placeholder="Email" onChange={e => setForm({ ...form, email: e.target.value })} />
      <input class="me-2" placeholder="Mot de passe" type="password" onChange={e => setForm({ ...form, password: e.target.value })} />
      <button class="btn btn-primary me-2" onClick={register}>S'inscrire</button>
    </div>
  );
}

export default RegisterPage;
