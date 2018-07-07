import * as EventStore from "./EventStore";
import {ChronoUnit} from "js-joda";

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
            .filter(event => event.end.compareTo(day) >= 0)
            .sort((event1, event2) => {
                // primary criterion: event length
                const event1Length = EventService.lengthInDays(event1);
                const event2Length = EventService.lengthInDays(event2);
                if (event1Length < event2Length) {
                    return -1;
                } else if (event1Length > event2Length) {
                    return 1;
                }
                // secondary criterion: start date
                else if (event1.start.isBefore(event2.start)) {
                    return -1;
                } else {
                    return 1;
                }
            });
    }

    static lengthInDays(event) {
        return event.start.until(event.end, ChronoUnit.DAYS);
    }
}

export default new EventService();
