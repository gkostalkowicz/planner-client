import {DateTimeFormatter} from "js-joda";

export const SHORT_DATE_FORMATTER = DateTimeFormatter.ofPattern('dd.MM');

export const LONG_DATE_FORMATTER = DateTimeFormatter.ofPattern('dd.MM.yyyy');

export const DATEPICKER_FORMAT = 'DD.MM.YYYY';