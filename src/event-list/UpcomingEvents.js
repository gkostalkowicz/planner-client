import React, {Component} from "react";
import {SHORT_DATE_FORMATTER} from "../common/date";
import "./UpcomingEvents.css";

class UpcomingEvents extends Component {

    render() {
        return <div className="upcoming-events">
            <h3>Upcoming events</h3>
            {this.props.events.map((event) =>
                <EventRow key={event.id} event={event} onSelect={this.props.onSelect}/>
            )}
        </div>;
    }
}

class EventRow extends Component {

    constructor(props) {
        super(props);
        this.handleSelect = this.handleSelect.bind(this);
    }

    render() {
        const event = this.props.event;
        return <div style={{clear: 'both'}}>
            <a href="#" onClick={this.handleSelect}>
                <div style={{float: 'left'}}>{event.name}</div>
                <div style={{float: 'right'}}>{this.formatEventRange(event)}</div>
            </a>
        </div>;
    }

    handleSelect(e) {
        this.props.onSelect(this.props.event);
        e.preventDefault();
    }

    formatEventRange(event) {
        if (event.start.equals(event.end)) {
            return this.formatDate(event.start)
        } else {
            return this.formatDate(event.start) + '-' + this.formatDate(event.end);
        }
    }

    formatDate(localDate) {
        return localDate.format(SHORT_DATE_FORMATTER);
    }
}

export default UpcomingEvents;
