import React, {Component} from "react";
import "./LoginForm.css";

export default class LoginForm extends Component {

    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.state = {
            username: "",
            errorMessage: ""
        }
    }

    handleChange(e) {
        this.setState({username: e.target.value});
    }

    handleSubmit(e) {
        e.preventDefault();

        const username = this.state.username;
        if (username === "") {
            this.setState({errorMessage: "Please enter your name."});
            return;
        } else if (DISALLOWED_USERNAMES.includes(username)) {
            this.setState({errorMessage: `Name “${username}” is not allowed. Please choose any other name.`});
            return;
        }

        this.setState({errorMessage: ""});
        this.props.onLogIn(username);
    }

    render() {
        return <div id="login-form">
            <div className="error-message">{this.state.errorMessage}</div>
            <form onSubmit={this.handleSubmit}>
                <input type="text" id="username" value={this.state.username} placeholder="Name" autoFocus
                       onChange={this.handleChange}/>
                <input type="submit" value="Go!"/>
            </form>
        </div>
    }
}

// force people to be more creative, to prevent all users from logging in via the same account
const DISALLOWED_USERNAMES = ["test", "admin"];