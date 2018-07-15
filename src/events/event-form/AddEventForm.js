import React, {Component} from "react";
import "./EventForm.css";
import "react-datepicker/dist/react-datepicker.css";
import EventForm from "./EventForm";
import {LocalDate} from "js-joda";

export default class AddEventForm extends Component {

    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    render() {
        const emptyEvent = {
            name: '',
            start: LocalDate.now(),
            end: LocalDate.now(),
            description: ''
        };
        return <EventForm formTitle="New Event" event={emptyEvent} onSubmit={this.handleSubmit}/>
    }

    handleSubmit(event) {
        this.props.onSubmit(event);
    }
}
