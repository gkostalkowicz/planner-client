import React, {Component} from "react";
import {LocalDate} from "js-joda";
import AddEventForm from "./event-form/AddEventForm.js";
import UpcomingEvents from "./event-list/UpcomingEvents.js";
import "./App.css";

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
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

export default App;
