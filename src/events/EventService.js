import * as EventStore from "./EventStore";
import {forEachDay, maxDate, minDate} from "./date";

class EventService {

    constructor() {
        this.handleEventsUpdated = this.handleEventsUpdated.bind(this);

        this.events = EventStore.getEvents();
        EventStore.subscribe(this.handleEventsUpdated);
    }

    handleEventsUpdated() {
        this.events = EventStore.getEvents();
    }

    getEventsOnDay(day) {
        return this.events
            .filter(event => EventService.isEventBetween(event, day, day));
    }

    getEventIntensityOnEveryDayOfMonth(yearMonth) {
        const firstDayOfMonth = yearMonth.atDay(1);
        const lastDayOfMonth = yearMonth.atEndOfMonth();

        const eventCountByDay = new Map();
        forEachDay(firstDayOfMonth, lastDayOfMonth, date => eventCountByDay.set(date.toString(), 0));

        this.events
            .filter(event => EventService.isEventBetween(event, firstDayOfMonth, lastDayOfMonth))
            .forEach(event => {
                const from = maxDate(event.start, firstDayOfMonth);
                const to = minDate(event.end, lastDayOfMonth);
                forEachDay(from, to,
                        date => eventCountByDay.set(date.toString(), eventCountByDay.get(date.toString()) + 1)
                );
            });

        let maxCount = 0;
        eventCountByDay.forEach((count) =>
            maxCount = Math.max(count, maxCount));

        const eventIntensityByDay = new Map();
        eventCountByDay.forEach((count, dayString) =>
                eventIntensityByDay.set(dayString, maxCount === 0 ? 0 : count / maxCount));
        return eventIntensityByDay;
    }

    compareEventsForSort(event1, event2) {
        // compare start dates
        if (event1.start.isBefore(event2.start)) {
            return -1;
        } else if (event1.start.isAfter(event2.start)) {
            return 1;
        }

        // compare end dates
        if (event1.end.isBefore(event2.end)) {
            return -1;
        } else if (event1.end.isAfter(event2.end)) {
            return 1;
        }

        // compare names
        if (event1.name < event2.name) {
            return -1;
        } else {
            return 1;
        }
    }

    // TODO this could be a method on the domain object
    static isEventBetween(event, rangeStart, rangeEnd) {
        return !(event.start.isAfter(rangeEnd) || event.end.isBefore(rangeStart));
    }
}

export default new EventService();
