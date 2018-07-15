import React, {Component} from "react";
import DatePicker from "react-datepicker";
import moment from "moment/moment";
import {DATEPICKER_FORMAT, localDateToMoment, momentToLocalDate} from "../date";
import "./EventForm.css";
import "react-datepicker/dist/react-datepicker.css";

export default class EventForm extends Component {

    constructor(props) {
        super(props);
        const event = props.event;
        this.state = {
            event: {
                id: event.id,
                name: event.name,
                start: localDateToMoment(event.start),
                end: localDateToMoment(event.end),
                description: event.description
            },
            fieldErrors: {}
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleStartChange = this.handleStartChange.bind(this);
        this.handleEndChange = this.handleEndChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.validateField = this.validateField.bind(this);
    }

    render() {
        const event = this.state.event;
        const fieldErrors = this.state.fieldErrors;

        return <form className="add-event-form" onSubmit={this.handleSubmit}>
            <h3>{this.props.formTitle}</h3>
            <div>
                <input name="name" type="text" placeholder="Name" value={event.name} onChange={this.handleChange}
                       autoFocus/>
                <span className="errors">{fieldErrors.name}</span>
            </div>
            <div className="calendar-row">
                <DatePicker placeholderText="From" selected={event.start} selectsStart
                            startDate={event.start} endDate={event.end} onChange={this.handleStartChange}
                            dateFormat={DATEPICKER_FORMAT} minDate={moment()}/>
                <span className="errors">{fieldErrors.start}</span>
            </div>
            <div className="calendar-row">
                <DatePicker placeholderText="To" selected={event.end} selectsEnd
                            startDate={event.start} endDate={event.end} onChange={this.handleEndChange}
                            dateFormat={DATEPICKER_FORMAT} minDate={event.start}/>
                <span className="errors">{fieldErrors.end}</span>
            </div>
            <div>
                <textarea name="description" placeholder="Description" value={event.description}
                          onChange={this.handleChange}/>
            </div>
            <div className="submit-row"><input type="submit" value="Save event"/></div>
        </form>
    }

    handleChange(e) {
        const value = e.target.value;
        const name = e.target.name;
        const event = {...this.state.event, [name]: value};
        this.setState({event: event}, () => {this.validateField(name, value)});
    }

    handleStartChange(date) {
        if (date) {
            const event = {...this.state.event, start: date, end: moment.max(date, this.state.event.end)};
            this.setState({event: event},
                () => {this.validateField('start', date)});
        }
    }

    handleEndChange(date) {
        if (date) {
            const event = {...this.state.event, end: date};
            this.setState({event: event}, () => {this.validateField('end', date)});
        }
    }

    validateField(name) {
        let fieldErrors = this.state.fieldErrors;
        const value = this.state.event[name];

        if (name === 'name') {
            fieldErrors.name = value ? '' : 'Please name your event.';
            this.setState({fieldErrors: fieldErrors});
            return value;
        }
    }

    handleSubmit(e) {
        e.preventDefault();

        const formValid = this.validateField('name');
        if (!formValid) {
            return;
        }

        const event = this.state.event;
        this.props.onSubmit({
            id: event.id,
            name: event.name,
            start: momentToLocalDate(event.start),
            end: momentToLocalDate(event.end),
            description: event.description
        });
    }
}
