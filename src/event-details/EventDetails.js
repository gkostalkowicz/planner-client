import React from "react";
import {LONG_DATE_FORMATTER} from "../common/date";

class EventDetails extends React.Component {

    constructor(props) {
        super(props);
        this.handleEdit = this.handleEdit.bind(this);
        this.handleRemove = this.handleRemove.bind(this);
    }

    render() {
        return <div>
            <h3>{this.props.event.name}</h3>
            <EventActionBar event={this.props.event} onEdit={this.handleEdit} onRemove={this.handleRemove}/>
            <EventDate start={this.props.event.start} end={this.props.event.end}/>
            <EventDescription description={this.props.event.description}/>
        </div>
    }

    handleEdit(event) {
        this.props.onEdit(event);
    }

    handleRemove(event) {
        this.props.onRemove(event);
    }
}

class EventActionBar extends React.Component {

    constructor(props) {
        super(props);
        this.handleEdit = this.handleEdit.bind(this);
        this.handleRemove = this.handleRemove.bind(this);
    }

    render() {
        return <div><a href="#" onClick={this.handleEdit}>Edit</a> | <a href="#" onClick={this.handleRemove}>Remove</a></div>
    }

    handleEdit(e) {
        this.props.onEdit(this.props.event);
        e.preventDefault();
    }

    handleRemove(e) {
        if (window.confirm('Are you sure you want to remove event "' + this.props.event.name + '"?')) {
            this.props.onRemove(this.props.event);
        }
        e.preventDefault();
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
            return <div>This event has no description yet. Click "Edit" to add a description.</div>
        } else {
            return <div>{description}</div>
        }
    }
}

export default EventDetails;