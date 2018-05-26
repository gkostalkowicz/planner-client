import React, {Component} from "react";
import DatePicker from "react-datepicker";
import {LocalDate} from "js-joda";
import moment from "moment/moment";
import {DATEPICKER_FORMAT} from "../common/date";
import "./add-event-form.css";
import "react-datepicker/dist/react-datepicker.css";

class AddEventForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            name: '',
            start: moment(),
            end: moment(),
            description: '',
            fieldErrors: {}
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleStartChange = this.handleStartChange.bind(this);
        this.handleEndChange = this.handleEndChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.validateField = this.validateField.bind(this);
    }

    render() {
        return <form className="add-event-form" onSubmit={this.handleSubmit}>
            <h3>New event</h3>
            <div>
                <input name="name" type="text" placeholder="Name" value={this.state.name} onChange={this.handleChange}/>
                <span className="errors">{this.state.fieldErrors.name}</span>
            </div>
            <div className="calendar-row">
                <DatePicker placeholderText="From" selected={this.state.start} selectsStart
                            startDate={this.state.start} endDate={this.state.end} onChange={this.handleStartChange}
                            dateFormat={DATEPICKER_FORMAT} minDate={moment()}/>
                <span className="errors">{this.state.fieldErrors.start}</span>
            </div>
            <div className="calendar-row">
                <DatePicker placeholderText="To" selected={this.state.end} selectsEnd
                            startDate={this.state.start} endDate={this.state.end} onChange={this.handleEndChange}
                            dateFormat={DATEPICKER_FORMAT} minDate={this.state.start}/>
                <span className="errors">{this.state.fieldErrors.end}</span>
            </div>
            <div>
                <textarea name="description" placeholder="Description" value={this.state.description}
                          onChange={this.handleChange}/>
            </div>
            <div className="submit-row"><input type="submit" value="Save event"/></div>
        </form>
    }

    handleChange(e) {
        const value = e.target.value;
        const name = e.target.name;
        this.setState({[name]: value}, () => {this.validateField(name, value)});
    }

    handleStartChange(date) {
        if (date) {
            this.setState({start: date, end: moment.max(date, this.state.end)},
                () => {this.validateField('start', date)});
        }
    }

    handleEndChange(date) {
        if (date) {
            this.setState({end: date}, () => {this.validateField('end', date)});
        }
    }

    validateField(name) {
        let fieldErrors = this.state.fieldErrors;
        const value = this.state[name];

        if (name === 'name') {
            fieldErrors.name = value ? '' : 'Please name your event.';
            this.setState({fieldErrors: fieldErrors});
            return value;
        }
    }

    handleSubmit(e) {
        e.preventDefault();

        const nameValid = this.validateField('name');
        const formValid = nameValid;
        if (!formValid) {
            return;
        }

        const state = this.state;
        this.props.onSubmit({
            name: state.name,
            start: this.momentToLocalDate(state.start),
            end: this.momentToLocalDate(state.end),
            description: state.description
        });
    }

    momentToLocalDate(moment) {
        return LocalDate.of(moment.year(), moment.month() + 1, moment.date());
    }
}

export default AddEventForm;
