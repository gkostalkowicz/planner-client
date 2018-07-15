import React, {Component} from "react";
import LoginForm from "../login-form/LoginForm";
import "./LoginScreen.css";

export default class LoginScreen extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return <div id="login-screen-box">
            <p>Enter your name to start using Planner.</p>
            <LoginForm onSubmit={username => alert(username)}/>
        </div>
    }
}
