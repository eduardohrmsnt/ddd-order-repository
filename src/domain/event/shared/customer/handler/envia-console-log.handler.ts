import EventHandlerInterface from "../../event-handler.interface";
import CustomerAddressChangedEvent from "../customer-address-changed.event";

export default class EnviaConsoleLogHandler implements EventHandlerInterface<CustomerAddressChangedEvent>{
    handle(event: CustomerAddressChangedEvent){
        console.log(`Endereço do cliente: ${event.eventData.customer.id}, ${event.eventData.customer.name} alterado para: ${event.eventData.customer.address.street}, ${event.eventData.customer.address.number}, ${event.eventData.customer.address.city}, ${event.eventData.customer.address.zip}`)
    }
}