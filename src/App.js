import React, {Component} from "react";
import {LocalDate} from "js-joda";
import AddEventForm from "./event-form/AddEventForm.js";
import UpcomingEvents from "./event-list/UpcomingEvents.js";
import EventDetails from "./event-details/EventDetails";
import "./App.css";

class App extends Component {

    constructor(props) {
        super(props);
        this.handleSubmitEvent = this.handleSubmitEvent.bind(this);
        this.handleSelectEvent = this.handleSelectEvent.bind(this);
        this.state = {
            mainPage: <AddEventForm onSubmit={this.handleSubmitEvent}/>,
            events: [{
                id: 1,
                name: 'Birthday party',
                start: LocalDate.parse('2018-05-25'),
                end: LocalDate.parse('2018-05-25'),
                description: 'Pawel\'s birtday party'
            }, {
                id: 2,
                name: 'Plan vacation',
                start: LocalDate.parse('2018-06-01'),
                end: LocalDate.parse('2018-06-30'),
                description: 'Think about vacation plans for July and August'
            }]
        };
    }

    render() {
        return (
            <div className="app">
                <UpcomingEvents events={this.state.events} onSelect={this.handleSelectEvent}/>
                <div id="main-page">{this.state.mainPage}</div>
            </div>
        );
    }

    handleSubmitEvent(event) {
        const events = this.state.events;
        event.id = events.length + 1;
        events.push(event);
        this.setState({events: events});
    }

    handleSelectEvent(event) {
        this.setState({mainPage: <EventDetails event={event}/>});
    }
}

export default App;
