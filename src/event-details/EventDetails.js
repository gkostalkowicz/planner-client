import React from "react";
import {LONG_DATE_FORMATTER} from "../common/date";

class EventDetails extends React.Component {

    render() {
        return <div>
            <h3>{this.props.event.name}</h3>
            <EventActionBar event={this.props.event}/>
            <EventDate start={this.props.event.start} end={this.props.event.end}/>
            <EventDescription description={this.props.description}/>
        </div>
    }
}

class EventActionBar extends React.Component {

    render() {
        return <div></div>
    }
}

class EventDate extends React.Component {

    render() {
        const start = this.props.start;
        const end = this.props.end;
        if (start.equals(end)) {
            return <div>Date: {this.formatDate(start)}</div>
        } else {
            return <div>Start: {this.formatDate(start)}<br/>
                End: {this.formatDate(end)}</div>
        }
    }

    formatDate(localDate) {
        return localDate.format(LONG_DATE_FORMATTER);
    }
}

class EventDescription extends React.Component {

    render() {
        const description = this.props.description;
        if (!description) {
            return <div>This event has no description yet. Choose "Edit" to add a description.</div>
        } else {
            return <div>{description}</div>
        }
    }
}

export default EventDetails;