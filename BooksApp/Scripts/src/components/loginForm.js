import React, { Component } from 'react';


export default class Header extends Component {
    render() {
        return (
            <form>
                <div class="form-row">
                    <div class="form-group col-md-6">
                        <label for="login">Login</label>
                        <input type="text" class="form-control" id="login" placeholder="Wprowadź login" />
                    </div>
                    <div class="form-group col-md-6">
                        <label for="password">Password</label>
                        <input type="password" class="form-control" id="password" placeholder="Wprowadź hasło" />
                    </div>
                </div>
                <button class="btn btn-primary">Sign in</button>
            </form>
        );
    }
}