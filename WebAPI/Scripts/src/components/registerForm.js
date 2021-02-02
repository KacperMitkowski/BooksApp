import React, { Component } from 'react';


export default class RegisterForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            errorMessage: null,
        };
        this.handleSubmit = this.handleSubmit.bind(this);
    }


    handleSubmit(event) {
        event.preventDefault();
        let login = document.getElementById("login").value;
        let password = document.getElementById("password").value;
        let firstName = document.getElementById("first_name").value;
        let lastName = document.getElementById("last_name").value;

        fetch("/api/apiAuthor/post", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                login: login,
                password: password,
                first_name: firstName,
                last_name: lastName
            })
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if (data.errorMessage && data.registrationSuccess == false) {
                    this.setState({
                        errorMessage: data.errorMessage,
                    })
                }
                else {
                    alert("Pomyślna rejestracja użytkownika");
                    window.location = "/";
                }
            }).catch(error => this.setState({ errorMessage: ["Wystąpił błąd. Przepraszamy za kłopoty techniczne"] }));
    }

    render() {
        return (
            <React.Fragment>
                <div className="row mb-5">
                    <div className="col-12 text-center">
                        <a className="btn btn-danger btn-lg" href="/">Powrót</a>
                    </div>
                </div>
                <form onSubmit={this.handleSubmit} id="registrationAuthorForm">
                    <div className="container" style={{ width: "50%", margin: "0 auto", textAlign: 'center' }}>
                        {this.state.errorMessage ?
                            <div class="alert alert-danger" role="alert">
                                {this.state.errorMessage}
                            </div>
                            : null}
                        <div className="row mt-5 mb-5">
                            <div className="col-6">
                                <label for="login">Login</label>
                                <input type="text" class="form-control" id="login" name="login" placeholder="Wprowadź login" />
                            </div>
                            <div class="col-6">
                                <label for="password">Password</label>
                                <input type="password" class="form-control" id="password" name="password" placeholder="Wprowadź hasło" />
                            </div>
                        </div>
                        <div className="row mt-5 mb-5">
                            <div className="col-6">
                                <label for="first_name">Imię</label>
                                <input type="text" class="form-control" id="first_name" name="first_name" placeholder="Wprowadź imię" />
                            </div>
                            <div className="col-6">
                                <label for="last_name">Nazwisko</label>
                                <input type="text" class="form-control" id="last_name" name="last_name" placeholder="Wprowadź nazwisko" />
                            </div>
                        </div>
                        <button class="btn btn-primary btn-lg">Zarejestruj</button>
                    </div>
                </form>
            </React.Fragment>
        );
    }
}