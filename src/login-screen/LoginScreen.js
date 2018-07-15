import React, {Component} from "react";
import LoginForm from "../login-form/LoginForm";
import authService from "../common/AuthService";
import "./LoginScreen.css";

export default class LoginScreen extends Component {

    constructor(props) {
        super(props);
        this.handleLogIn = this.handleLogIn.bind(this);
    }

    handleLogIn(username) {
        authService.logIn(username);
        this.props.onLogIn();
    }

    render() {
        return <div id="login-screen-box">
            <p>Enter your name to start using Planner.</p>
            <LoginForm onLogIn={this.handleLogIn}/>
        </div>
    }
}
