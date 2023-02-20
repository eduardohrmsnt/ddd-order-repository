"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class EnviaConsoleLogHandler {
    handle(event) {
        console.log(`Endereço do cliente: ${event.eventData.customer.id}, ${event.eventData.customer.name} alterado para: ${event.eventData.customer.address.street}, ${event.eventData.customer.address.number}, ${event.eventData.customer.address.city}, ${event.eventData.customer.address.zip}`);
    }
}
exports.default = EnviaConsoleLogHandler;
