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
                    sessionStorage.setItem("allAuthors", data.allAuthors);
                    alert("Pomyślne logowanie");
                    window.location = "/";
                }

                this.setState({
                    errorMessage: data.errorMessage,
                    loginSuccess: data.loginSuccess
                })
            }).catch(error => this.setState({ errorMessage: "Wystąpił błąd. Przepraszamy za kłopoty techniczne" }));
    }

    render() {
        return (
            <div className="container" style={{ width: "50%", margin: "0 auto", textAlign: 'center'  }}>
                {this.state.errorMessage ?
                    <div className="alert alert-danger" role="alert">
                        {this.state.errorMessage}
                    </div>
                    : null}
                <form onSubmit={this.handleSubmit} id="loginForm">
                    <div className="row mt-5 mb-5">
                        <div className="col-6">
                            <label for="login">Login</label>
                            <input type="text" className="form-control" id="login" name="login" placeholder="Wprowadź login" />
                        </div>
                        <div className="col-6">
                            <label for="password">Password</label>
                            <input type="password" className="form-control" id="password" name="password" placeholder="Wprowadź hasło" />
                        </div>
                    </div>
                    <div className="row mt-5 mb-5">
                        <div className="col-12">
                            <button className="btn btn-primary btn-lg">Zaloguj</button>
                        </div>
                    </div>
                </form>
            </div>
        );
    }
}