import React, { useEffect, useState } from 'react';
import axios from 'axios';

function AdminDashboard() {
  const [catwayNumber, setCatway] = useState('');
  const [type, setType] = useState('');
  const [catwayState, setStatut] = useState(false);
  const [boatName, setBN] = useState('');
  const [catways, setCatways] = useState([]);
  const [selectedCatway, setSelectedCatway] = useState(null);

  const fetchCatways = async () => {
    const token = localStorage.getItem('token');
    try {
      const res = await axios.get(`${process.env.REACT_APP_API_URL}/catways/`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setCatways(res.data);
    } catch (error) {
      console.error('Erreur chargement catways:', error);
    }
  };

  useEffect(() => {
  fetchCatways();
  }, []);



  const create = async () => {
    const token = localStorage.getItem('token');
    await axios.post(`${process.env.REACT_APP_API_URL}/catways/create-catway`, {catwayNumber, type, catwayState, boatName, },{
      headers: { Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json' }
    });
    fetchCatways();
  }



   // 🖊 Modifier un catway
  const handleUpdate = async () => {
    const token = localStorage.getItem('token');
    try {
      await axios.put(`${process.env.REACT_APP_API_URL}/catways/${selectedCatway}`,
        { catwayNumber, type, catwayState, boatName },
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );
      setSelectedCatway(null);
      fetchCatways(); 
    } catch (err) {
      alert('Erreur modification');
      console.error(err);
    }
  };


  // 🗑 Supprimer un catway
  const handleDelete = async (id) => {
    const token = localStorage.getItem('token');
    try {
      await axios.delete(`${process.env.REACT_APP_API_URL}/catways/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      alert('Catway supprimé');
      fetchCatways();
    } catch (err) {
      alert('Erreur suppression');
      console.error(err);
    }
  };


  //  formulaire de modification
  const startEditing = (catway) => {
    setSelectedCatway(catway._id);
    setCatway(catway.catwayNumber);
    setType(catway.type);
    setBN(catway.boatName);
    setStatut(catway.catwayState);
  };




  return (
    <div class="container mt-4">
      <h2>Liste des Catways</h2>
      <table class="table table-bordered mt-3">
        <thead>
          <tr>
            <th>Numéro</th>
            <th>Type</th>
            <th>Bateau</th>
            <th>Disponible</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {catways.map((catway) => (
            <tr key={catway._id}>
              <td>{catway.catwayNumber}</td>
              <td>{catway.type}</td>
              <td>{catway.boatName || '-'}</td>
              <td>{catway.catwayState ? '✅' : '❌'}</td>
              <td>
                <button
                  class="btn btn-primary btn-sm me-2"
                  onClick={() => startEditing(catway)}
                >
                  Modifier
                </button>
                <button
                  class="btn btn-danger btn-sm"
                  onClick={() => handleDelete(catway._id)}
                >
                  Supprimer
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {selectedCatway && (
        <div class="mt-4">
          <h4>✏️ Modifier Catway</h4>
          <div class="d-flex flex-wrap gap-2">
            <input
              value={catwayNumber}
              onChange={(e) => setCatway(e.target.value)}
              placeholder="Numéro"
              class="form-control"
              style={{ width: '150px' }}
            />
            <input
              value={type}
              onChange={(e) => setType(e.target.value)}
              placeholder="Type"
              class="form-control"
              style={{ width: '150px' }}
            />
            <input
              value={boatName}
              onChange={(e) => setBN(e.target.value)}
              placeholder="Nom bateau"
              class="form-control"
              style={{ width: '150px' }}
            />
            <label>
              <input
                type="checkbox"
                checked={catwayState}
                onChange={(e) => setStatut(e.target.checked)}
                class="form-check-input"
              />
              Disponible
            </label>
            <button class="btn btn-success" onClick={handleUpdate}>
              Enregistrer
            </button>
            <button
              class="btn btn-secondary"
              onClick={() => setSelectedCatway(null)}
            >
              Annuler
            </button>
          </div>
        </div>
      )}

            <div>
        <h2>Créer catway</h2>
        <div class="d-flex">
          <div><input class="me-2" onChange={e => setCatway(e.target.value)} placeholder="catwayNumber" /></div>
          <div><input class="me-2" onChange={e => setType(e.target.value)}  placeholder="type" /></div>
          <div class="me-2">
            <input  onChange={e =>setStatut(e.target.checked)}  type="checkbox" /></div>
          <div class="me-2"> 
            <input class="me-2" onChange={e => setBN(e.target.value)}  placeholder="boat name" />
          </div>
          <div ><button class="btn btn-success" onClick={create}>Créer</button></div>
        </div>
        
      </div>

    </div>
  );
}

export default AdminDashboard;
