import {DateTimeFormatter, LocalDate, nativeJs} from "js-joda";
import moment from "moment";

export const MONTH_NAMES = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September',
    'October', 'November', 'December'];

export const DAY_OF_WEEK_NAMES = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

export const SHORT_DATE_FORMATTER = DateTimeFormatter.ofPattern('dd.MM');

export const LONG_DATE_FORMATTER = DateTimeFormatter.ofPattern('dd.MM.yyyy');

export const DATEPICKER_FORMAT = 'DD.MM.YYYY';

export function minDate(dateA, dateB) {
    return dateA.isBefore(dateB) ? dateA : dateB;
}

export function maxDate(dateA, dateB) {
    return dateA.isAfter(dateB) ? dateA : dateB;
}

export function forEachDay(from, to, consumer) {
    for (let day = from; day.compareTo(to) <= 0; day = day.plusDays(1)) {
        consumer(day);
    }
}

export function momentToLocalDate(moment) {
    return LocalDate.from(nativeJs(moment));
    // or: LocalDate.of(moment.year(), moment.month() + 1, moment.date());
}

export function localDateToMoment(localDate) {
    return moment().date(localDate.dayOfMonth()).month(localDate.monthValue() - 1).year(localDate.year());
}