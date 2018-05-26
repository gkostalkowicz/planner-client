import React, {Component} from "react";
import "./event-form.css";
import "react-datepicker/dist/react-datepicker.css";
import EventForm from "./EventForm";

class EditEventForm extends Component {

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

export default EditEventForm;
