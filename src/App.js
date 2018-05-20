import React, {Component} from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import moment from 'moment';
import './App.css';

var LocalDate = require('js-joda').LocalDate;
var DateTimeFormatter = require('js-joda').DateTimeFormatter;

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            events: [{
                id: 1,
                name: "Birthday party",
                from: LocalDate.parse('2018-05-25'),
                to: LocalDate.parse('2018-05-25'),
                description: "Pawel's birtday party"
            }, {
                id: 2,
                name: "Plan vacation",
                from: LocalDate.parse('2018-06-01'),
                to: LocalDate.parse('2018-06-30'),
                description: "Think about vacation plans for July and August"
            }]
        };
        this.addEvent = this.addEvent.bind(this);
    }

    addEvent(event) {
        const events = this.state.events;
        event.id = events.length + 1;
        events.push(event);
        this.setState({events: events});
    }

    render() {
        return (
            <div className="app">
                <UpcomingEvents events={this.state.events}/>
                <AddEventForm onSubmit={this.addEvent}/>
            </div>
        );
    }
}

class UpcomingEvents extends Component {
    render() {
        return <div className="upcoming-events">
            <h3>Upcoming events</h3>
            {this.props.events.map((event) =>
                <EventRow key={event.id} event={event}/>
            )}
        </div>;
    }
}

const DATE_FORMATTER = DateTimeFormatter.ofPattern('dd.MM');

const DATEPICKER_FORMAT = "DD.MM.YYYY";

class EventRow extends Component {
    render() {
        const event = this.props.event;
        return <div style={{clear: 'both'}}>
            <div style={{float: 'left'}}>{event.name}</div>
            <div style={{float: 'right'}}>{this.formatEventRange(event)}</div>
        </div>;
    }

    formatEventRange(event) {
        if (event.from.equals(event.to)) {
            return this.formatDate(event.from)
        } else {
            return this.formatDate(event.from) + '-' + this.formatDate(event.to);
        }
    }

    formatDate(localDate) {
        return localDate.format(DATE_FORMATTER);
    }
}

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
            <div><input name="name" type="text" placeholder="Name" value={this.state.name} onChange={this.handleChange}/><span className="errors">{this.state.fieldErrors.name}</span></div>
            <DatePicker placeholderText="From" selected={this.state.from} onChange={this.handleFromChange} dateFormat={DATEPICKER_FORMAT} minDate={moment()}/>
            <DatePicker placeholderText="To" selected={this.state.to} onChange={this.handleToChange} dateFormat={DATEPICKER_FORMAT} minDate={moment()}/>
            <div><textarea name="description" placeholder="Description" value={this.state.description} onChange={this.handleChange}/></div>
            <div className="submit-row"><input type="submit" value="Save event"/></div>
        </form>
    }

    handleChange(e) {
        const value = e.target.value;
        const name = e.target.name;
        this.setState(
            {[name]: value},
            () => { this.validateField(name, value) });
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

export default App;
