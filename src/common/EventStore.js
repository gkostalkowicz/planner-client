import {LocalDate} from "js-joda";

const EventEmitter = require('events').EventEmitter;

const emitter = new EventEmitter();

let events = [{
    id: 1,
    name: 'Birthday party',
    start: LocalDate.parse('2018-05-25'),
    end: LocalDate.parse('2018-05-25'),
    description: 'Pawel\'s birtday party'
}, {
    id: 2,
    name: 'Plan vacation',
    start: LocalDate.parse('2018-06-01'),
    end: LocalDate.parse('2018-06-30'),
    description: 'Think about vacation plans for July and August'
}, {
    id: 3,
    name: 'Plan apartment change',
    start: LocalDate.parse('2018-06-15'),
    end: LocalDate.parse('2018-06-30'),
    description: 'Check if a new room is available'
}];

export function subscribe(callback) {
    emitter.addListener('update', callback);
}

export function unsubscribe(callback) {
    emitter.removeListener('update', callback);
}

export function getEvents() {
    return events.concat();
}

export function addEvent(event) {
    event.id = events.length + 1;
    events.push(event);
    emitter.emit('update');
}

export function updateEvent(event) {
    const index = events.findIndex((e) => e.id === event.id);
    if (index > -1) {
        events[index] = event;
        emitter.emit('update');
    }
}

export function removeEvent(event) {
    const index = events.indexOf(event);
    if (index > -1) {
        events.splice(index, 1);
        emitter.emit('update');
    }
}
