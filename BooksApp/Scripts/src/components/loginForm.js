import React, { Component } from 'react';


export default class LoginForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            errorMessages: [],
            author: null,
            loginSuccess: false
        };
        this.handleSubmit = this.handleSubmit.bind(this);
    }


    handleSubmit(event) {
        event.preventDefault();
        let login = document.getElementById("login").value;
        let password = document.getElementById("password").value;

        fetch("AuthorLogin/LoginAuthor", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                login: login,
                password: password,
            })
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                this.setState({
                    errorMessages: data.errorMessages,
                    author: data.author,
                    loginSuccess: data.loginSuccess
                })
            }).catch(error => this.setState({ errorMessages: ["Wystąpił błąd. Przepraszamy za kłopoty techniczne"] }));
    }

    render() {
        if (this.state.loginSuccess && this.state.loginSuccess == true) {
            return(
                <div class="alert alert-success" role="alert">
                Udane logowanie!
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
                <form onSubmit={this.handleSubmit} id="loginForm">
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
                    <button class="btn btn-primary">Zaloguj</button>
                </form>
            </React.Fragment>
        );
    }
}