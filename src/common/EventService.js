import * as EventStore from "./EventStore";

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
            .filter(event => event.start.compareTo(day) <= 0)
            .filter(event => event.end.compareTo(day) >= 0);
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
}

export default new EventService();
