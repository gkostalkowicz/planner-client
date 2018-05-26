import React from "react";
import {Component} from "react";
import {DATE_FORMATTER} from "../common/date";
import "./upcoming-events.css";

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

class EventRow extends Component {

    render() {
        const event = this.props.event;
        return <div style={{clear: 'both'}}>
            <div style={{float: 'left'}}>{event.name}</div>
            <div style={{float: 'right'}}>{this.formatEventRange(event)}</div>
        </div>;
    }

    formatEventRange(event) {
        if (event.start.equals(event.end)) {
            return this.formatDate(event.start)
        } else {
            return this.formatDate(event.start) + '-' + this.formatDate(event.end);
        }
    }

    formatDate(localDate) {
        return localDate.format(DATE_FORMATTER);
    }
}

export default UpcomingEvents;
