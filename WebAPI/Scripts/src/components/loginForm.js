import React, { Component } from 'react';


export default class LoginForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            errorMessage: null,
            loginSuccess: false
        };
        this.handleSubmit = this.handleSubmit.bind(this);
    }


    handleSubmit(event) {
        event.preventDefault();
        let login = document.getElementById("login").value;
        let password = document.getElementById("password").value;

        fetch("AuthorLogin/Login", {
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
                if (data.token && data.author) {
                    sessionStorage.setItem("token", data.token);
                    sessionStorage.setItem("author", data.author);
                    sessionStorage.setItem("loginSuccessful", true);
                    alert("Pomyślne logowanie");
                    window.location = "/";
                }

                this.setState({
                    errorMessage: data.errorMessage,
                    loginSuccess: data.loginSuccess
                })
            }).catch(error => this.setState({ errorMessages: ["Wystąpił błąd. Przepraszamy za kłopoty techniczne"] }));
    }

    render() {
        return (
            <React.Fragment>
                {this.state.errorMessage ?
                    <div class="alert alert-danger" role="alert">
                        {this.state.errorMessage}
                    </div>
                    : null}
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