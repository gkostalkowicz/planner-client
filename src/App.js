import React, {Component} from "react";
import "./App.css";
import LoginScreen from "./login-screen/LoginScreen";
import authService from "./common/AuthService";
import DashboardScreen from "./dashboard-screen/DashboardScreen";

export default class App extends Component {

    constructor(props) {
        super(props);
        this.handleLogInOrLogOut = this.handleLogInOrLogOut.bind(this);
        this.state = {
            screen: this.getScreen()
        };
    }

    handleLogInOrLogOut() {
        this.setState({screen: this.getScreen()});
    }

    getScreen() {
        return authService.isLoggedIn()
            ? <DashboardScreen onLogOut={this.handleLogInOrLogOut}/>
            : <LoginScreen onLogIn={this.handleLogInOrLogOut}/>;
    }

    render() {
        return this.state.screen;
    }
}
