import React, { useEffect, useState } from 'react';
import axios from 'axios';

function HomePage() {
  const [catways, setCatways] = useState([]);
  const [selectedCatway, setSelectedCatway] = useState(null);
  const [dates, setDates] = useState({ checkIn: '', checkOut: '' });
  const token = localStorage.getItem('token');

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_URL}/catways/dispo`)
      .then(res => setCatways(res.data));
  }, []);

  const reserve = async () => {
    await axios.post(`${process.env.REACT_APP_API_URL}/catways/:id/reservations/faire-reservation`, {
      catwayId: selectedCatway,
      checkIn: dates.checkIn,
      checkOut: dates.checkOut
    }, {
      headers: { Authorization: `Bearer ${token}` }
    });
    alert('Réservation faite !');
  };

  return (

    <div>
      <h2>Catways disponibles</h2>

      <ul>
        {catways.map(catway => (
          <li key={catway._id}>
            {catway.catwayNumber} - {catway.type} - {catway.boatName}
            <button onClick={() => setSelectedCatway(catway._id)}>Réserver</button>
          </li>
        ))}
      </ul>

      {selectedCatway && (
        <div>
          <h3>Réserver</h3>
          <input type="date" onChange={e => setDates({ ...dates, checkIn: e.target.value })} />
          <input type="date" onChange={e => setDates({ ...dates, checkOut: e.target.value })} />
          <button onClick={reserve}>Confirmer</button>
        </div>
      )}
    </div>
  );
}

export default HomePage;
