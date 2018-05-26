import React, {Component} from "react";
import {LocalDate} from "js-joda";
import AddEventForm from "./event-form/AddEventForm.js";
import UpcomingEvents from "./event-list/UpcomingEvents.js";
import EventDetails from "./event-details/EventDetails";
import "./App.css";
import EditEventForm from "./event-form/EditEventForm";

class App extends Component {

    constructor(props) {
        super(props);
        this.handleDisplayEventDetails = this.handleDisplayEventDetails.bind(this);
        this.handleDisplayEventEditForm = this.handleDisplayEventEditForm.bind(this);
        this.handleAddEvent = this.handleAddEvent.bind(this);
        this.handleUpdateEvent = this.handleUpdateEvent.bind(this);
        this.handleRemoveEvent = this.handleRemoveEvent.bind(this);
        this.state = {
            mainPage: this.homePage(),
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
            }, {
                id: 3,
                name: 'Plan apartment change',
                start: LocalDate.parse('2018-06-15'),
                end: LocalDate.parse('2018-06-30'),
                description: 'Check if a new room is available'
            }]
        };
    }

    render() {
        return (
            <div className="app">
                <UpcomingEvents events={this.state.events} onSelect={this.handleDisplayEventDetails}/>
                <div id="main-page">{this.state.mainPage}</div>
            </div>
        );
    }

    homePage() {
        return <AddEventForm onSubmit={this.handleAddEvent}/>
    }

    handleDisplayEventDetails(event) {
        this.setState({mainPage: <EventDetails event={event} onEdit={this.handleDisplayEventEditForm}
                                               onRemove={this.handleRemoveEvent}/>});
    }

    handleDisplayEventEditForm(event) {
        this.setState({mainPage: <EditEventForm event={event} onSubmit={this.handleUpdateEvent}/>});
    }

    handleAddEvent(event) {
        const events = this.state.events;
        event.id = events.length + 1;
        events.push(event);
        this.setState({events: events});
    }

    handleUpdateEvent(event) {
        const events = this.state.events;
        const index = events.findIndex((e) => e.id === event.id);
        if (index > -1) {
            events[index] = event;
            this.setState({events: events, mainPage: this.homePage()});
        }
    }

    handleRemoveEvent(event) {
        const events = this.state.events;
        const index = events.indexOf(event);
        if (index > -1) {
            events.splice(index, 1);
            this.setState({events: events, mainPage: this.homePage()});
        }
    }
}

export default App;
