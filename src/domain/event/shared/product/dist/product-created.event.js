"use strict";
exports.__esModule = true;
var ProductCreatedEvent = /** @class */ (function () {
    function ProductCreatedEvent(eventData) {
        this.dateTimeOccurred = new Date();
        this.eventData = eventData;
    }
    return ProductCreatedEvent;
}());
exports["default"] = ProductCreatedEvent;
