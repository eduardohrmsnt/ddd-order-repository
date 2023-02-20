"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ProductCreatedEvent {
    constructor(eventData) {
        this.dateTimeOccurred = new Date();
        this.eventData = eventData;
    }
}
exports.default = ProductCreatedEvent;
