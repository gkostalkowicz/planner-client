import {DateTimeFormatter, LocalDate, nativeJs} from "js-joda";
import moment from "moment";

export const SHORT_DATE_FORMATTER = DateTimeFormatter.ofPattern('dd.MM');

export const LONG_DATE_FORMATTER = DateTimeFormatter.ofPattern('dd.MM.yyyy');

export const DATEPICKER_FORMAT = 'DD.MM.YYYY';

export function momentToLocalDate(moment) {
    return LocalDate.from(nativeJs(moment));
    // or: LocalDate.of(moment.year(), moment.month() + 1, moment.date());
}

export function localDateToMoment(localDate) {
    return moment().date(localDate.dayOfMonth()).month(localDate.monthValue() - 1).year(localDate.year());
}