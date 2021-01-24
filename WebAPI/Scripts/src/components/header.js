import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Header extends Component {
    render() {
        return (
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                
                <a className="navbar-brand" href="/">LOGO</a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNavDropdown">
                    <ul className="navbar-nav">
                        <li className="nav-item active">
                            <a className="nav-link" href="/">Strona główna</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#">Autorzy</a>
                        </li>
                        {!this.props.loggedAuthor ? // Show login button if author not logged in
                        <li className="nav-item">
                            <a href="/login" className='nav-link'>Logowanie</a>
                        </li> : null }
                        <li className="nav-item">
                            <a href="/register" className='nav-link'>Rejestracja</a>
                        </li>
                        <li className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                Dodatkowe akcje
                            </a>
                            <div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                                <a className="dropdown-item" href="#">Akcja 1</a>
                                <a className="dropdown-item" href="#">Akcja 2</a>
                                <a className="dropdown-item" href="#">Akcja 3</a>
                            </div>
                        </li>
                    </ul>
                </div>
                {this.props.loggedAuthor ? 
                    <div>
                        Zalogowany użytkownik: {this.props.loggedAuthor}
                        <button className="btn btn-outline-warning" onClick={() => this.logoutAuthor()}>Wyloguj</button>
                    </div>
                    
                    : null}
            </nav>
        );
    }

    logoutAuthor() {
        sessionStorage.removeItem("author");
        sessionStorage.removeItem("token");
        alert("Pomyślne wylogowanie");
        window.location = "/";
    }
}