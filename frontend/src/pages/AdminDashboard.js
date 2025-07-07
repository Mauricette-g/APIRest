import React, { useEffect, useState } from 'react';
import axios from 'axios';

function AdminDashboard() {
  const [reservations, setReservations] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    axios.get(`${process.env.REACT_APP_API_URL}/:id/reservations`, {
      headers: { Authorization: `Bearer ${token}` }
    }).then(res => setReservations(res.data));
  }, []);

  const updateStatus = async (id, status) => {
    const token = localStorage.getItem('token');
    await axios.put(`${process.env.REACT_APP_API_URL}/:id/reservations/${id}`, { status }, {
      headers: { Authorization: `Bearer ${token}` }
    });
    window.location.reload();
  };

  return (
    <div>
      <h2>Dashboard Admin</h2>
      <ul>
        {reservations.map(r => (
          <li key={r._id}>
            {r.userId?.email} - Catway {r.catwayId?.catwayNumber} : {r.checkIn} à {r.checkOut} 
            <button onClick={() => updateStatus(r._id, 'confirmed')}>Confirmer</button>
            <button onClick={() => updateStatus(r._id, 'cancelled')}>Annuler</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AdminDashboard;
