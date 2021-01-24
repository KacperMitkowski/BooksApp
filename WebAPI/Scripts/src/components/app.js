import React from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import Header from '../components/header.js';
import Main from '../components/main.js';
import Footer from '../components/footer.js';
import RegisterForm from './registerForm.js';
import LoginForm from './loginForm.js';
import BookDetails from './bookDetails.js';
import BookEdit from './bookEdit.js';

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
                    <Route exact path="/book/details/:id" component={BookDetails} />
                    <Route exact path="/book/edit/:id" component={BookEdit} />
                </Switch>

                <Footer />
            </Router>
        );
    }
}