import * as ApiService from "./ApiService";
import {LocalDate} from "js-joda";
import {EventEmitter} from "events";

const emitter = new EventEmitter();
let events = [];
fetchEvents();

// ------------------------
// exported functions

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
    ApiService.post('/events', toServerFormat(event))
        .then(response => fetchEvents());
}

export function updateEvent(event) {
    ApiService.put('/events/' + event.id, toServerFormat(event))
        .then(response => fetchEvents());
}

export function removeEvent(event) {
    ApiService.delete_('/events/' + event.id)
        .then(response => fetchEvents());}

// ------------------------
// helper functions

function fetchEvents() {
    ApiService.get('/events')
        .then(response => {
            events = response.data.map(toClientFormat);
            emitter.emit('update');
        });
}

function toClientFormat(event) {
    return {
        id: event._id,
        name: event.name,
        start: LocalDate.parse(event.start),
        end: LocalDate.parse(event.end),
        description: event.description
    }
}

function toServerFormat(event) {
    return {
        id: event.id,
        name: event.name,
        start: event.start.toString(),
        end: event.end.toString(),
        description: event.description
    }
}