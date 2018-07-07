import React, {Component} from "react";
import * as EventStore from './common/EventStore';
import UpcomingEvents from "./event-list/UpcomingEvents";
import EventDetails from "./event-details/EventDetails";
import EditEventForm from "./event-form/EditEventForm";
import CalendarPane from "./calendar-pane/CalendarPane";
import "./App.css";

class App extends Component {

    constructor(props) {
        super(props);
        this.handleEventsUpdated = this.handleEventsUpdated.bind(this);
        this.handleDisplayEventDetails = this.handleDisplayEventDetails.bind(this);
        this.handleDisplayEventEditForm = this.handleDisplayEventEditForm.bind(this);
        this.handleAddEvent = this.handleAddEvent.bind(this);
        this.handleUpdateEvent = this.handleUpdateEvent.bind(this);
        this.handleRemoveEvent = this.handleRemoveEvent.bind(this);
        this.state = {
            mainPage: this.homePage(),
            events: EventStore.getEvents()
        };
    }

    componentWillMount() {
        EventStore.subscribe(this.handleEventsUpdated);
    }

    componentWillUnmount() {
        EventStore.unsubscribe(this.handleEventsUpdated);
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
        // return <AddEventForm onSubmit={this.handleAddEvent}/>
        return <CalendarPane/>
    }

    handleEventsUpdated() {
        this.setState({events: EventStore.getEvents()});
    }

    handleDisplayEventDetails(event) {
        this.setState({
            mainPage: <EventDetails event={event} onEdit={this.handleDisplayEventEditForm}
                                    onRemove={this.handleRemoveEvent}/>
        });
    }

    handleDisplayEventEditForm(event) {
        this.setState({mainPage: <EditEventForm event={event} onSubmit={this.handleUpdateEvent}/>});
    }

    handleAddEvent(event) {
        EventStore.addEvent(event);
    }

    handleUpdateEvent(event) {
        EventStore.updateEvent(event);
        this.setState({mainPage: this.homePage()});
    }

    handleRemoveEvent(event) {
        EventStore.removeEvent(event);
        this.setState({mainPage: this.homePage()});
    }
}

export default App;
