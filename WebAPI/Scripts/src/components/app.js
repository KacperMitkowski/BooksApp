import React from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import Header from '../components/header.js';
import Main from '../components/main.js';
import Footer from '../components/footer.js';
import RegisterForm from './registerForm.js'
import LoginForm from './loginForm.js'


export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            
        };
    }

    render() {
        let loggedAuthor = sessionStorage.getItem("author");

        return (
            <Router>
                <Header loggedAuthor={loggedAuthor} />

                <Switch>
                    <Route exact path="/" render={props => <Main {...props} /> } />
                    <Route exact path="/register" component={RegisterForm} />
                    <Route exact path="/login" component={LoginForm} />
                </Switch>

                <Footer />
            </Router>
        );
    }
}