import "./Window.css";

import React, {Component} from "react";

export default class Window extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return <div>
            <div className="shadow" onClick={this.props.onClose}/>
            <div className="window">
                <div className="close-button">
                    <a href="#" onClick={this.props.onClose}>Close ✖</a>
                </div>
                {this.props.content}
            </div>
        </div>
    }
}