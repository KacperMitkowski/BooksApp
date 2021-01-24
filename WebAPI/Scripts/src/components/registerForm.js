import React, { Component } from 'react';


export default class RegisterForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            errorMessage: null,
            author: null,
            registrationSuccess: false
        };
        this.handleSubmit = this.handleSubmit.bind(this);
    }


    handleSubmit(event) {
        event.preventDefault();
        let login = document.getElementById("login").value;
        let password = document.getElementById("password").value;
        let firstName = document.getElementById("first_name").value;
        let lastName = document.getElementById("last_name").value;

        fetch("api/apiAuthor", {
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
                let result = JSON.parse(data);
                this.setState({
                    errorMessage: result.errorMessage,
                    registrationSuccess: result.registrationSuccess
                })
            }).catch(error => this.setState({ errorMessages: ["Wystąpił błąd. Przepraszamy za kłopoty techniczne"] }));
    }

    render() {
        if (this.state.registrationSuccess && this.state.registrationSuccess == true) {
            return(
                <div class="alert alert-success" role="alert">
                Udana rejestracja!
            </div>)
        }
        
        return (
            <React.Fragment>
                {this.state.errorMessage ? 
                    <div class="alert alert-danger" role="alert">
                        {this.state.errorMessage}
                    </div>
                    : null}
                <form onSubmit={this.handleSubmit} id="registrationForm">
                    <div class="form-row">
                        <div class="form-group col-md-6">
                            <label for="login">Login</label>
                            <input type="text" class="form-control" id="login" name="login" placeholder="Wprowadź login" />
                        </div>
                        <div class="form-group col-md-6">
                            <label for="password">Password</label>
                            <input type="password" class="form-control" id="password" name="password" placeholder="Wprowadź hasło" />
                        </div>
                    </div>
                    <div class="form-row">
                        <div class="form-group col-md-6">
                            <label for="first_name">Imię</label>
                            <input type="text" class="form-control" id="first_name" name="first_name" placeholder="Wprowadź imię" />
                        </div>
                        <div class="form-group col-md-6">
                            <label for="last_name">Nazwisko</label>
                            <input type="text" class="form-control" id="last_name" name="last_name" placeholder="Wprowadź nazwisko" />
                        </div>
                    </div>
                    <button class="btn btn-primary">Zarejestruj</button>
                </form>
            </React.Fragment>
        );
    }
}