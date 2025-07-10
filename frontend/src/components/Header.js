import React from 'react';
//import { Link, useNavigate } from 'react-router-dom';

function Header() {

  //const token = localStorage.getItem('token');

  return (
        <header class="d-flex flex-wrap align-items-center justify-content-center justify-content-md-between py-3 mb-4 border-bottom"> 
        <div class="col-md-3 mb-2 mb-md-0"> 
            <a href="/" class="d-inline-flex link-body-emphasis text-decoration-none"> 
            <h1 class="px-2">Port de Russel</h1>
            </a> 
        </div> 
 
        <div class="nav col-12 col-md-auto mb-2 px-2"> 
            <li><a href="/" class="nav-link px-2 link-secondary">Accueil</a></li> 
            <button type="button" class="btn btn-outline-primary me-2"><a href="/login" class="nav-link px-2 link-secondary">Connexion </a></button> 
            <button type="button" class="btn btn-primary"><a href="/register" class="nav-link px-2 link-secondary">S'inscrire</a></button> 
        </div> 
    </header> 

  );
}

export default Header;

