import React, {Component} from "react";
import * as EventStore from './common/EventStore';
import UpcomingEvents from "./event-list/UpcomingEvents";
import EventDetails from "./event-details/EventDetails";
import EditEventForm from "./event-form/EditEventForm";
import CalendarPane from "./calendar-pane/CalendarPane";
import AddEventForm from "./event-form/AddEventForm";
import Window from "./window/Window";
import "./App.css";

export default class App extends Component {

    constructor(props) {
        super(props);
        this.handleEventsUpdated = this.handleEventsUpdated.bind(this);
        this.handleDisplayEventDetails = this.handleDisplayEventDetails.bind(this);
        this.handleDisplayAddEventForm = this.handleDisplayAddEventForm.bind(this);
        this.handleDisplayEditEventForm = this.handleDisplayEditEventForm.bind(this);
        this.handleEventAdded = this.handleEventAdded.bind(this);
        this.handleEventUpdated = this.handleEventUpdated.bind(this);
        this.handleEventRemoved = this.handleEventRemoved.bind(this);
        this.handleKeyPress = this.handleKeyPress.bind(this);
        this.closeWindow = this.closeWindow.bind(this);
        this.state = {
            events: EventStore.getEvents(),
            windowContent: null
        };
    }

    // =============================================================
    // lifecycle

    componentWillMount() {
        EventStore.subscribe(this.handleEventsUpdated);
        document.addEventListener('keypress', this.handleKeyPress);
    }

    componentWillUnmount() {
        EventStore.unsubscribe(this.handleEventsUpdated);
        document.removeEventListener('keypress', this.handleKeyPress);
    }

    // =============================================================
    // render

    render() {
        return (
            <div className="app">
                <UpcomingEvents events={this.state.events} onSelectEvent={this.handleDisplayEventDetails}/>
                <div id="main-page">
                    <CalendarPane onAddEvent={this.handleDisplayAddEventForm}
                                  onSelectEvent={this.handleDisplayEventDetails}/>
                </div>
                {this.state.windowContent
                    && <Window content={this.state.windowContent} onClose={this.closeWindow}/>}
            </div>
        );
    }

    // =============================================================
    // event handling

    handleEventsUpdated() {
        this.setState({events: EventStore.getEvents()});
    }

    handleDisplayEventDetails(event) {
        this.setState({
            windowContent: <EventDetails event={event} onEdit={this.handleDisplayEditEventForm}
                                         onRemove={this.handleEventRemoved}/>
        });
    }

    handleDisplayAddEventForm() {
        this.setState({windowContent: <AddEventForm onSubmit={this.handleEventAdded}/>});
    }

    handleDisplayEditEventForm(event) {
        this.setState({windowContent: <EditEventForm event={event} onSubmit={this.handleEventUpdated}/>});
    }

    handleEventAdded(event) {
        EventStore.addEvent(event);
        this.closeWindow();
    }

    handleEventUpdated(event) {
        EventStore.updateEvent(event);
        this.handleDisplayEventDetails(event);
    }

    handleEventRemoved(event) {
        EventStore.removeEvent(event);
        this.closeWindow();
    }

    handleKeyPress(e) {
        if (e.key === "Escape") {
            this.closeWindow();
        }
    }

    // =============================================================
    // helpers

    closeWindow() {
        this.setState({windowContent: null});
    }
}
