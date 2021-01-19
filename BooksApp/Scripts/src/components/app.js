﻿import React from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import Header from '../components/header.js';
import Main from '../components/main.js';
import Footer from '../components/footer.js';

export default class App extends React.Component {
    render() {
        return (
            <Router>
                <Header />

                <Switch>
                    <Route exact path="/" component={Main} />
                </Switch>

                <Footer />
            </Router>
        );
    }
}