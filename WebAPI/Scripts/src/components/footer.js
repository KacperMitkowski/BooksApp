import React, { Component } from 'react';
import $ from 'jquery';

export default class Footer extends Component {
    render() {
        return (
            <React.Fragment>
                <footer>
                    <div className="row" style={{ width: "50%", margin: "80px auto" }}>
                        <div className="col-12">
                            <h5 className="card-title text-center">Zapraszam na mojego githuba</h5>
                            <a target="_blank" href="https://github.com/KacperMitkowski" className="btn btn-primary btn-lg" style={{ width: "25%", margin: "0 auto", display: "block" }}>Github</a>
                        </div>
                    </div>

                </footer>
            </React.Fragment>
        );

    }
}