import React, {Component} from "react";
import Calendar from "../calendar/Calendar";
import {YearMonth} from "js-joda";
import {MONTH_NAMES} from "../common/date";
import eventService from "../common/EventService";
import EventsOnDay from "../event-list/EventsOnDay";
import authService from "../common/AuthService";
import "./CalendarPane.css";

export default class CalendarPane extends Component {

    constructor(props) {
        super(props);
        this.state = {
            yearMonth: YearMonth.now0(),
            selectedDay: null
        };
        this.handlePreviousMonth = this.handlePreviousMonth.bind(this);
        this.handleNextMonth = this.handleNextMonth.bind(this);
        this.handleSelectDay = this.handleSelectDay.bind(this);
        this.handleLogOut = this.handleLogOut.bind(this);
    }

    render() {
        const yearMonth = this.state.yearMonth;
        return <div>
            <nav>
                <div className="user-info">Welcome <strong>{authService.getUsername()}</strong>.{' '}
                    <a href="#" onClick={this.handleLogOut}>Log out.</a></div>
                <div className="new-event"><a href="#" onClick={this.props.onAddEvent}>⊕ New event</a></div>
            </nav>

            <h2>{MONTH_NAMES[yearMonth.monthValue() - 1] + ' ' + yearMonth.year()}</h2>
            <div className="month-chooser">
                <a href="#" onClick={this.handlePreviousMonth}>◀ Previous</a> |{' '}
                <a href="#" onClick={this.handleNextMonth}>Next ▶</a>
            </div>

            <Calendar yearMonth={yearMonth} onSelectDay={this.handleSelectDay}/>

            {this.state.selectedDay &&
                <div className="events-on-day">
                    <EventsOnDay events={eventService.getEventsOnDay(this.state.selectedDay)}
                                    onSelectEvent={this.props.onSelectEvent}
                                    day={this.state.selectedDay}/>
                </div>
            }
        </div>;
    }

    handlePreviousMonth(e) {
        e.preventDefault();
        this.setState({yearMonth: this.state.yearMonth.minusMonths(1)});
    }

    handleNextMonth(e) {
        e.preventDefault();
        this.setState({yearMonth: this.state.yearMonth.plusMonths(1)});
    }

    handleSelectDay(day) {
        this.setState({selectedDay: day});
    }

    handleLogOut() {
        authService.logOut();
        this.props.onLogOut();
    }
}