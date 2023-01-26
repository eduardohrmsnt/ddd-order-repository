import Address from "../../entity/address";
import Customer from "../../entity/customer";
import CustomerAddressChangedEvent from "./customer/customer-address-changed.event";
import CustomerCreatedEvent from "./customer/customer-created.event";
import EnviaConsoleLog1Handler from "./customer/handler/envia-console-log-1.handler";
import EnviaConsoleLog2Handler from "./customer/handler/envia-console-log-2.handler";
import EnviaConsoleLogHandler from "./customer/handler/envia-console-log.handler";
import EventDispatcher from "./event-dispatcher";
import SendEmailWhenProductIsCreatedHandler from "./product/handler/send-email-when-product-is-created.handler";
import ProductCreatedEvent from "./product/product-created.event";

describe("Domain events tests", () =>{

    it("Should register an event handler", () => {

        const eventDispatcher = new EventDispatcher();
        const eventHandler = new SendEmailWhenProductIsCreatedHandler();

        eventDispatcher.register("ProductCreatedEvent", eventHandler);

        expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"]).toBeDefined();
        expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"].length).toBe(1);
        expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"][0]).toMatchObject(eventHandler);
        
    })

    it("Should unregister an event handler", () => {

        const eventDispatcher = new EventDispatcher();
        const eventHandler = new SendEmailWhenProductIsCreatedHandler();

        eventDispatcher.register("ProductCreatedEvent", eventHandler);
        expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"][0]).toMatchObject(eventHandler);
        
        eventDispatcher.unregister("ProductCreatedEvent", eventHandler);

        expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"]).toBeDefined();
        expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"].length).toBe(0);
    })

    it("Should unregister all event handlers", () => {

        const eventDispatcher = new EventDispatcher();
        const eventHandler = new SendEmailWhenProductIsCreatedHandler();

        eventDispatcher.register("ProductCreatedEvent", eventHandler);
        expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"][0]).toMatchObject(eventHandler);
        
        eventDispatcher.unregisterAll();

        expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"]).toBeUndefined();
    })

    it("Should notify all event handlers", () => {

        const eventDispatcher = new EventDispatcher();
        const eventHandler = new SendEmailWhenProductIsCreatedHandler();
        const spyEventHandler = jest.spyOn(eventHandler, "handle");

        eventDispatcher.register("ProductCreatedEvent", eventHandler);
        expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"][0]).toMatchObject(eventHandler);
        
        const productCreatedEvent = new ProductCreatedEvent({
            product:{
                id: 1, 
                name: "Product 1",
                description: "Product 1 description",
                price: 10.0,
                createdAt: new Date()
            }
        });
        eventDispatcher.notify(productCreatedEvent);

        expect(spyEventHandler).toHaveBeenCalled();
    })


    it("Should notify when create a new customer", () => {

        const eventDispatcher = new EventDispatcher();
        const eventHandler = new EnviaConsoleLog1Handler();
        const eventHandler2 = new EnviaConsoleLog2Handler();
        const spyEventHandler1 = jest.spyOn(eventHandler, "handle");
        const spyEventHandler2 = jest.spyOn(eventHandler, "handle");

        eventDispatcher.register("CustomerCreatedEvent", eventHandler);
        eventDispatcher.register("CustomerCreatedEvent", eventHandler2);
        
        let customer = new Customer("1", "Eduardo Hermes Neto");
        customer.changeAddress(new Address("Rua 3 de janeiro", 277, "89128000", "Luiz Alves"))
        const customerCreatedEvent = new CustomerCreatedEvent({
            customer: customer
        });
        eventDispatcher.notify(customerCreatedEvent);

        expect(spyEventHandler1).toHaveBeenCalled();
        expect(spyEventHandler2).toHaveBeenCalled();
    })

    it("Should notify when create a new customer", () => {

        const eventDispatcher = new EventDispatcher();
        const eventHandler = new EnviaConsoleLogHandler();
        const spyEventHandler = jest.spyOn(eventHandler, "handle");

        eventDispatcher.register("CustomerAddressChangedEvent", eventHandler);
        
        let customer = new Customer("1", "Eduardo Hermes Neto");
        customer.changeAddress(new Address("Rua 3 de janeiro", 277, "89128000", "Luiz Alves"))
        const customerAddressChangedEvent = new CustomerAddressChangedEvent({
            customer: customer
        });
        eventDispatcher.notify(customerAddressChangedEvent);

        expect(spyEventHandler).toHaveBeenCalled();
    })

});