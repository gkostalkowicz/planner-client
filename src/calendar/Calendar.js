import React, {Component} from "react";
import "./Calendar.css";
import {DAY_OF_WEEK_NAMES} from "../common/date";
import {LocalDate} from "js-joda";

export default class Calendar extends Component {

    constructor(props) {
        super(props);
        this.renderDay = this.renderDay.bind(this);
    }

    render() {
        const days = this.calculateDays(this.props.yearMonth);
        return <table className="calendar"><tbody>
        {this.daysOfWeekHeader()}
        {days.map((row, idx) => <tr key={idx}>
            {row.map(this.renderDay)}
        </tr>)}
        </tbody></table>;
    }

    renderDay(day, idx) {
        let className;
        if (day.month() === this.props.yearMonth.month()) {
            className = "current-month";
            if (day.equals(LocalDate.now())) {
                className += ' today';
            }
        } else {
            className = "not-current-month";
        }

        return <td className={className} key={idx}>{day.dayOfMonth()}</td>;
    }

    calculateDays(yearMonth) {
        let currentDay = this.getFirstDisplayedDay(yearMonth);
        const days = [];

        for (let row = 0; row < 6; row++) {
            days[row] = [];
            for (let col = 0; col < 7; col++) {
                days[row][col] = currentDay;
                currentDay = currentDay.plusDays(1);
            }
        }

        return days;
    }

    // Returns the day to be displayed in the first row and first column of the calendar.
    getFirstDisplayedDay(yearMonth) {
        const firstDayOfMonth = yearMonth.atDay(1);
        return firstDayOfMonth.minusDays(firstDayOfMonth.dayOfWeek().value() - 1);
    }

    daysOfWeekHeader() {
        return <tr key="header">{DAY_OF_WEEK_NAMES.map((day, idx) => <td key={idx}>{day}</td>)}</tr>;
    }
}
