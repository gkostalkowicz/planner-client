import React, {Component} from "react";
import "./EventForm.css";
import "react-datepicker/dist/react-datepicker.css";
import EventForm from "./EventForm";

export default class EditEventForm extends Component {

    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    render() {
        return <EventForm formTitle="Update Event" event={this.props.event} onSubmit={this.handleSubmit}/>
    }

    handleSubmit(event) {
        this.props.onSubmit(event);
    }
}
