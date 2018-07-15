import React, {Component} from "react";
import {SHORT_DATE_FORMATTER} from "../date";
import EventList from "./EventList";
import eventService from "../EventService";
import "./UpcomingEvents.css";

export default class UpcomingEvents extends Component {

    render() {
        return <EventList
            events={this.props.events}
            sortFunction={eventService.compareEventsForSort}
            title="Upcoming events"
            noEventsMessage="No upcoming events. Add your event using plus button."
            onSelectEvent={this.props.onSelectEvent}/>;
    }
}
