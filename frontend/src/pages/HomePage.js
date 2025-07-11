import React, { useEffect, useState } from 'react';
import axios from 'axios';

function HomePage() {
  const [catways, setCatways] = useState([]);
  const [reservations] = useState([]);
  const [selectedCatway, setSelectedCatway] = useState(null);
  const [checkIn, setStartDate] = useState('');
  const [checkOut, setEndDate] = useState('');

  const token = localStorage.getItem('token');

  useEffect(() => {
  const fetchCatways = async () => {
    try {
      const res = await axios.get(`${process.env.REACT_APP_API_URL}/catways/dispo`);
      setCatways(res.data);
    } catch (err) {
      console.error('Erreur chargement catways', err);
    }
  };

  fetchCatways();
}, []);


  const createReservation = async () => {
    try {
      await axios.post(
        `${process.env.REACT_APP_API_URL}/catways/:id/reservations/faire-reservation`,
        { catwayId: selectedCatway, checkIn, checkOut },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert('Réservation créée');
      setSelectedCatway(null);
    } catch (err) {
      alert('Erreur lors de la réservation');
      console.error(err);
    }
  };

  const updateReservation = async (id) => {
    try {
      await axios.put(
        `${process.env.REACT_APP_API_URL}/catways/:id/reservations/${id}`,
        { checkIn, checkOut },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert('Réservation modifiée');
    } catch (err) {
      alert('Erreur modification');
    }
  };

  const deleteReservation = async (id) => {
    try {
      await axios.delete(`${process.env.REACT_APP_API_URL}/catways/:id/reservations/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert('Réservation annulée');
    } catch (err) {
      alert('Erreur suppression');
    }
  };

  return (
    <div className="container mt-4">
      <h2> Catways disponibles</h2>
      <div className="row">
        {catways.map((catway) => (
          <div key={catway._id} className="col-md-4 mb-3">
            <div className="card p-3">
              <h5>{catway.catwayNumber}</h5>
              <p>Type : {catway.type}</p>
              <p>Bateau : {catway.boatName || '-'}</p>
              <button
                className="btn btn-success"
                onClick={() => setSelectedCatway(catway._id)}
              >
                Réserver
              </button>
            </div>
          </div>
        ))}
      </div>

      {selectedCatway && (
        <div className="mt-4">
          <h4>Nouvelle Réservation</h4>
          <input
            type="date"
            value={checkIn}
            onChange={(e) => setStartDate(e.target.value)}
            className="form-control mb-2"
          />
          <input
            type="date"
            value={checkOut}
            onChange={(e) => setEndDate(e.target.value)}
            className="form-control mb-2"
          />
          <button className="btn btn-primary" onClick={createReservation}>
            Réserver
          </button>
          <button className="btn btn-secondary ms-2" onClick={() => setSelectedCatway(null)}>
            Annuler
          </button>
        </div>
      )}

      <hr />
      <h3>Mes Réservations</h3>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Catway</th>
            <th>Début</th>
            <th>Fin</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {reservations.map((res) => (
            <tr key={res._id}>
              <td>{res.catway?.catwayNumber}</td>
              <td>
                <input
                  type="date"
                  value={res.checkIn?.slice(0, 10)}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="form-control"
                />
              </td>
              <td>
                <input
                  type="date"
                  value={res.endDate?.slice(0, 10)}
                  onChange={(e) => checkOut(e.target.value)}
                  className="form-control"
                />
              </td>
              <td>{res.status}</td>
              <td>
                <button
                  className="btn btn-warning btn-sm me-2"
                  onClick={() => updateReservation(res._id)}
                >
                  Modifier
                </button>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => deleteReservation(res._id)}
                >
                  Annuler
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default HomePage;
