import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Header extends Component {
    render() {
        return (
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                
                <a className="navbar-brand" href="/" id="icon"></a>
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
                            <a href="/login" className='nav-link'>Logowanie autora</a>
                        </li> : null }
                        <li className="nav-item">
                            <a href="/register" className='nav-link'>Rejestracja autora</a>
                        </li>
                    </ul>
                </div>
                {this.props.loggedAuthor ?
                    <div style={{ marginRight: "50px", fontSize: "20px" }}>
                        Zalogowany użytkownik: <span style={{ color: "#3ead44"}}> {this.props.loggedAuthor} </span>
                        <button className="btn btn-outline-warning btn-lg" style={{ marginLeft: "30px" }} onClick={() => this.logoutAuthor()}>Wyloguj</button>
                    </div>
                    
                    : null}
            </nav>
        );
    }

    logoutAuthor() {
        sessionStorage.clear();
        alert("Pomyślne wylogowanie");
        window.location = "/";
    }
}