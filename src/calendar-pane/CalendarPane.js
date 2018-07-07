import React, {Component} from "react";
import Calendar from "../calendar/Calendar";
import {YearMonth} from "js-joda";
import {MONTH_NAMES} from "../common/date";
import "./CalendarPane.css";

export default class CalendarPane extends Component {

    constructor(props) {
        super(props);
        this.state = {
            yearMonth: YearMonth.now0()
        };
        this.handlePreviousMonth = this.handlePreviousMonth.bind(this);
        this.handleNextMonth = this.handleNextMonth.bind(this);
    }

    render() {
        const yearMonth = this.state.yearMonth;
        return <div>
            <div className="add-event-link"><a href="#" onClick={this.props.onAddEvent}>⊕ New event</a></div>

            <h2>{MONTH_NAMES[yearMonth.monthValue() - 1] + ' ' + yearMonth.year()}</h2>
            <div className="month-chooser">
                <a href="#" onClick={this.handlePreviousMonth}>◀ Previous</a> |{' '}
                <a href="#" onClick={this.handleNextMonth}>Next ▶</a>
            </div>

            <Calendar yearMonth={yearMonth}/>
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
}