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
            from: moment(),
            to: moment(),
            description: '',
            fieldErrors: {name: ''}
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleFromChange = this.handleFromChange.bind(this);
        this.handleToChange = this.handleToChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.validateField = this.validateField.bind(this);
    }

    render() {
        return <form className="add-event-form" onSubmit={this.handleSubmit}>
            <h3>New event</h3>
            <div><input name="name" type="text" placeholder="Name" value={this.state.name}
                        onChange={this.handleChange}/><span className="errors">{this.state.fieldErrors.name}</span>
            </div>
            <DatePicker placeholderText="From" selected={this.state.from} onChange={this.handleFromChange}
                        dateFormat={DATEPICKER_FORMAT} minDate={moment()}/>
            <DatePicker placeholderText="To" selected={this.state.to} onChange={this.handleToChange}
                        dateFormat={DATEPICKER_FORMAT} minDate={moment()}/>
            <div><textarea name="description" placeholder="Description" value={this.state.description}
                           onChange={this.handleChange}/></div>
            <div className="submit-row"><input type="submit" value="Save event"/></div>
        </form>
    }

    handleChange(e) {
        const value = e.target.value;
        const name = e.target.name;
        this.setState(
            {[name]: value},
            () => {
                this.validateField(name, value)
            });
    }

    handleFromChange(date) {
        this.setState({from: date});
    }

    handleToChange(date) {
        this.setState({to: date});
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

        const formValid = this.validateField('name');
        if (!formValid) {
            return;
        }

        const state = this.state;
        this.props.onSubmit({
            name: state.name,
            from: this.momentToLocalDate(state.from),
            to: this.momentToLocalDate(state.to),
            description: state.description
        });
    }

    momentToLocalDate(moment) {
        return LocalDate.of(moment.year(), moment.month() + 1, moment.date());
    }
}

export default AddEventForm;
