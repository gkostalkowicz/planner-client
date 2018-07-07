import React, {Component} from "react";
import "./Calendar.css";
import {DAY_OF_WEEK_NAMES} from "../common/date";
import {DateTimeFormatter, LocalDate} from "js-joda";

export default class Calendar extends Component {

    render() {
        const days = this.createRowsAndColumns(this.props.yearMonth);
        return <table className="calendar">
            <tbody>
            {this.daysOfWeekHeader()}
            {days.map((row, idx) => <tr key={idx}>
                {row.map(day =>
                    <DayCell day={day} yearMonth={this.props.yearMonth} index={idx}
                             onSelectDay={this.props.onSelectDay}/>
                )}
            </tr>)}
            </tbody>
        </table>;
    }

    createRowsAndColumns(yearMonth) {
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
        return <tr key="header">{DAY_OF_WEEK_NAMES.map((day, idx) => <th key={idx}>{day}</th>)}</tr>;
    }
}


const INDEX_FORMATTER = DateTimeFormatter.ofPattern('MM-dd');

class DayCell extends Component {

    render() {
        const day = this.props.day;
        return <td className={this.getClassName()} key={day.format(INDEX_FORMATTER)}>
            <a href="#" onClick={() => this.props.onSelectDay(day)}>
                {day.dayOfMonth()}
            </a>
        </td>;
    }

    getClassName() {
        const day = this.props.day;
        let className = "day";
        if (day.month() === this.props.yearMonth.month()) {
            className += " current-month";
            if (day.equals(LocalDate.now())) {
                className += ' today';
            }
        } else {
            className += " not-current-month";
        }
        return className;
    }
}
