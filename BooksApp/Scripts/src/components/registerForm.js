import React, { Component } from 'react';


export default class RegisterForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            errorMessages: [],
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

        fetch("Author/Create", {
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
                this.setState({
                    errorMessages: data.errorMessages,
                    author: data.author,
                    registrationSuccess: data.registrationSuccess
                })
            }).catch(error => this.setState({ errorMessages: ["Wystąpił błąd. Przepraszamy za kłopoty techniczne"] }));
    }

    render() {
        console.log("(register) token = " + sessionStorage.getItem("token"));
        if (this.state.registrationSuccess && this.state.registrationSuccess == true) {
            return(
                <div class="alert alert-success" role="alert">
                Udana rejestracja!
            </div>)
        }


        return (
            <React.Fragment>
                {this.state.errorMessages.map((errorMessage, i) => {
                        return (
                            <div class="alert alert-danger" role="alert">
                                {i + 1} - {errorMessage}
                            </div>
                        )
                    })}
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