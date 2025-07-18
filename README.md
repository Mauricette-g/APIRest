# API REST - Gestion des réservations de catway


Lien d'accès : ── Page d'accueil - (https://api-rest-tau.vercel.app/)
               ── Interface admin - (https://api-rest-tau.vercel.app/admin)

---

Backend (API REST) : Node.js + Express

Frontend (interface utilisateur et admin) : React.js 

Base de données : MongoDB (MongoDB Atlas ou local)

Authentification : JWT


catway-reservation-app/
├── controllers/
├── models/
├── routes/
├── middlewares/
├── env
├── app.js
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── App.js
│   │   └── .env
├── package.json




##  Endpoints

### Catways

| Méthode | Endpoint                | Description                        |
|---------|-------------------------|------------------------------------|
| GET     | `/catways`              | Lister tous les catways (admin)    |
| GET     | `/catways/dispo`        | Lister tous les catways dispo      |
| POST    | `/catways/create-catway`| Créer un catway (admin)            |
| PUT     | `/catways/{id}`         | Modifier un catway (admin)         |
| DELETE  | `/catways/{id}`         | Supprimer un catway par ID (admin) |

---

### Réservations

| Méthode | Endpoint                         | Description                    |
|---------|----------------------------------|--------------------------------|
| GET     | `/reservations`                  | Lister toutes les réservations |
| POST    | `/reservations/faire-reservation`| Créer une réservation          |
| PUT     | `/reservations/{id}`             | Modifier une réservation       |
| DELETE  | `/reservations/{id}`             | Supprimer une réservation      |

---

### Utilisateurs

| Méthode | Endpoint         | Description                           |
|---------|------------------|---------------------------------------|
| GET     | `/users`         | Lister tous les utilisateurs (admin)  |
| POST    | `/users/add`     | Créer un utilisateur (admin)          |
| PUT     | `/users/{id}`    | Modifier un utilisateur (admin)       |
| DELETE  | `/users/{id}`    | Supprimer un utilisateur (admin)      |

---

## 🔧 Exemples de requêtes - Postnam

### 1. Créer un catway

POST /catways
Content-Type: application/json

{
  "catwayNumber": 1,
  "type": long,
  "catwayState": true
}


PUT /catways/1/reservations/1
Content-Type: application/json

{
  "user_id": 10,
  "catway_id": 1,
  "checkIn": "2025-07-10",
  "checkOut": "2025-07-15"
}



## Réponses types
-200 OK : Requête réussie

-201 Created : Ressource créée

-400 Bad Request : Données invalides

-404 Not Found : Ressource non trouvé

