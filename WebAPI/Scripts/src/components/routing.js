import React from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import Header from './header.js';
import Main from './main.js';
import Footer from './footer.js';
import RegisterForm from './registerForm.js';
import LoginForm from './loginForm.js';
import BookDetails from './bookDetails.js';
import BookEdit from './bookEdit.js';
import BookCreate from './bookCreate.js';


export default class Routing extends React.Component {
    render() {
        let loggedAuthor = sessionStorage.getItem("author");

        return (
            <Router>
                <Header loggedAuthor={loggedAuthor} />

                <Switch>
                    <Route exact path="/" component={Main} />
                    <Route exact path="/register" component={RegisterForm} />
                    <Route exact path="/login" component={LoginForm} />
                    <Route exact path="/book/details/:id" component={BookDetails} />
                    <Route exact path="/book/edit/:id" component={BookEdit} />
                    <Route exact path="/book/create/" component={BookCreate} />
                </Switch>

                <Footer />
            </Router>
        );
    }
}