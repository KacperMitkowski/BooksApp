import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import '../../static/css/main.css';
import Home from '../components/home.js';

export default class App extends React.Component {
    render() {
        return (
            <Router>
                <div className="container">
                    <Route exact path="/" component={Home} />
                </div>
            </Router>
        );
    }
}