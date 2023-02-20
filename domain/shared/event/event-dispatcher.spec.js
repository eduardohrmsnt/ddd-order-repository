"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const address_1 = __importDefault(require("../../customer/value-object/address"));
const customer_1 = __importDefault(require("../../customer/entity/customer"));
const send_email_when_product_is_created_handler_1 = __importDefault(require("../../product/event/handler/send-email-when-product-is-created.handler"));
const product_created_event_1 = __importDefault(require("../../product/event/product-created.event"));
const customer_created_event_1 = __importDefault(require("../../customer/event/customer-created.event"));
const event_dispatcher_1 = __importDefault(require("./event-dispatcher"));
const envia_console_log_2_handler_1 = __importDefault(require("../../customer/event/handler/envia-console-log-2.handler"));
const envia_console_log_1_handler_1 = __importDefault(require("../../customer/event/handler/envia-console-log-1.handler"));
const envia_console_log_handler_1 = __importDefault(require("../../customer/event/handler/envia-console-log.handler"));
const customer_address_changed_event_1 = __importDefault(require("../../customer/event/customer-address-changed.event"));
describe("Domain events tests", () => {
    it("Should register an event handler", () => {
        const eventDispatcher = new event_dispatcher_1.default();
        const eventHandler = new send_email_when_product_is_created_handler_1.default();
        eventDispatcher.register("ProductCreatedEvent", eventHandler);
        expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"]).toBeDefined();
        expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"].length).toBe(1);
        expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"][0]).toMatchObject(eventHandler);
    });
    it("Should unregister an event handler", () => {
        const eventDispatcher = new event_dispatcher_1.default();
        const eventHandler = new send_email_when_product_is_created_handler_1.default();
        eventDispatcher.register("ProductCreatedEvent", eventHandler);
        expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"][0]).toMatchObject(eventHandler);
        eventDispatcher.unregister("ProductCreatedEvent", eventHandler);
        expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"]).toBeDefined();
        expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"].length).toBe(0);
    });
    it("Should unregister all event handlers", () => {
        const eventDispatcher = new event_dispatcher_1.default();
        const eventHandler = new send_email_when_product_is_created_handler_1.default();
        eventDispatcher.register("ProductCreatedEvent", eventHandler);
        expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"][0]).toMatchObject(eventHandler);
        eventDispatcher.unregisterAll();
        expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"]).toBeUndefined();
    });
    it("Should notify all event handlers", () => {
        const eventDispatcher = new event_dispatcher_1.default();
        const eventHandler = new send_email_when_product_is_created_handler_1.default();
        const spyEventHandler = jest.spyOn(eventHandler, "handle");
        eventDispatcher.register("ProductCreatedEvent", eventHandler);
        expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"][0]).toMatchObject(eventHandler);
        const productCreatedEvent = new product_created_event_1.default({
            product: {
                id: 1,
                name: "Product 1",
                description: "Product 1 description",
                price: 10.0,
                createdAt: new Date()
            }
        });
        eventDispatcher.notify(productCreatedEvent);
        expect(spyEventHandler).toHaveBeenCalled();
    });
    it("Should notify when create a new customer", () => {
        const eventDispatcher = new event_dispatcher_1.default();
        const eventHandler = new envia_console_log_1_handler_1.default();
        const eventHandler2 = new envia_console_log_2_handler_1.default();
        const spyEventHandler1 = jest.spyOn(eventHandler, "handle");
        const spyEventHandler2 = jest.spyOn(eventHandler, "handle");
        eventDispatcher.register("CustomerCreatedEvent", eventHandler);
        eventDispatcher.register("CustomerCreatedEvent", eventHandler2);
        let customer = new customer_1.default("1", "Eduardo Hermes Neto");
        customer.changeAddress(new address_1.default("Rua 3 de janeiro", 277, "89128000", "Luiz Alves"));
        const customerCreatedEvent = new customer_created_event_1.default({
            customer: customer
        });
        eventDispatcher.notify(customerCreatedEvent);
        expect(spyEventHandler1).toHaveBeenCalled();
        expect(spyEventHandler2).toHaveBeenCalled();
    });
    it("Should notify when create a new customer", () => {
        const eventDispatcher = new event_dispatcher_1.default();
        const eventHandler = new envia_console_log_handler_1.default();
        const spyEventHandler = jest.spyOn(eventHandler, "handle");
        eventDispatcher.register("CustomerAddressChangedEvent", eventHandler);
        let customer = new customer_1.default("1", "Eduardo Hermes Neto");
        customer.changeAddress(new address_1.default("Rua 3 de janeiro", 277, "89128000", "Luiz Alves"));
        const customerAddressChangedEvent = new customer_address_changed_event_1.default({
            customer: customer
        });
        eventDispatcher.notify(customerAddressChangedEvent);
        expect(spyEventHandler).toHaveBeenCalled();
    });
});
