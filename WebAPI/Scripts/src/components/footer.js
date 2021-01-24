import React, { Component } from 'react';
import $ from 'jquery';

export default class Footer extends Component {
    render() {
        return (
            <React.Fragment>
                <footer>
                    <div className="card">
                        <div className="card-header">
                            Kontakt
                    </div>
                        <div className="card-body">
                            <h5 className="card-title">Lorem ipsum dolor sit amet</h5>
                            <p className="card-text">Logowanie przebiegło pomyślnie</p>
                            <a href="#" className="btn btn-primary">Kontakt</a>
                        </div>
                    </div>
                </footer>
            </React.Fragment>
        );

    }
}