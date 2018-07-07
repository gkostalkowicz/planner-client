import React, {Component} from "react";
import {SHORT_DATE_FORMATTER} from "../common/date";
import EventList from "./EventList";
import eventService from "../common/EventService";
import {ChronoUnit} from "js-joda";
import "./UpcomingEvents.css";

export default class EventsOnDay extends Component {

    render() {
        return <EventList
            events={this.props.events}
            sortFunction={this.compareEventsForSort}
            title={"Events on " + this.props.day.format(SHORT_DATE_FORMATTER)}
            noEventsMessage="No events on the given day."
            onSelectEvent={this.props.onSelectEvent}
        />;
    }

    compareEventsForSort(e1, e2) {
        const e1Length = EventsOnDay.lengthInDays(e1);
        const e2Length = EventsOnDay.lengthInDays(e2);
        if (e1Length < e2Length) {
            return -1;
        } else if (e1Length > e2Length) {
            return 1;
        }

        return eventService.compareEventsForSort(e1, e2);
    }

    static lengthInDays(event) {
        return event.start.until(event.end, ChronoUnit.DAYS);
    }
}
