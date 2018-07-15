import React, {Component} from "react";
import "./App.css";
import LoginScreen from "./login-screen/LoginScreen";

export default class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            screen: <LoginScreen/>
        };
    }

    // =============================================================
    // render

    render() {
        return this.state.screen;
    }
}
