import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Header extends Component {
    render() {
        return (
            <nav class="navbar navbar-expand-lg navbar-light bg-light">
                
                <a class="navbar-brand" href="/">LOGO</a>
                <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarNavDropdown">
                    <ul class="navbar-nav">
                        <li class="nav-item active">
                            <a class="nav-link" href="/">Strona główna</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="#">Autorzy</a>
                        </li>
                        <li class="nav-item">
                            <Link to="/login" className='nav-link'>Logowanie</Link>
                        </li><li class="nav-item">
                            <Link to="/register" className='nav-link'>Rejestracja</Link>
                        </li>
                        <li class="nav-item dropdown">
                            <a class="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                Dodatkowe akcje
                            </a>
                            <div class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                                <a class="dropdown-item" href="#">Akcja 1</a>
                                <a class="dropdown-item" href="#">Akcja 2</a>
                                <a class="dropdown-item" href="#">Akcja 3</a>
                            </div>
                        </li>
                    </ul>
                </div>
            </nav>
        );
    }
}