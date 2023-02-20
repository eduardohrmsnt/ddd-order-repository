"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class CustomerCreatedEvent {
    constructor(eventData) {
        this.dateTimeOccurred = new Date();
        this.eventData = eventData;
    }
}
exports.default = CustomerCreatedEvent;
