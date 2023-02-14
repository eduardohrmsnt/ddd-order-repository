import Address from "../value-object/address";
import CustomerFactory from "./customer.factory";

describe("Customer factory unit test", () => {

    it("should create a customer", () =>{
        let customer = CustomerFactory.create("Eduardo Hermes Neto");

        expect(customer.id).toBeDefined();
        expect(customer.name).toBe("Eduardo Hermes Neto");
        expect(customer.address).toBeUndefined();
    })
    it("should create a customer with address", () =>{
        const address = new Address("Rua 3 de Janeiro", 277, "89128000", "Luiz Alves")
        let customer = CustomerFactory.createWithAddress("Eduardo Hermes Neto", address);

        expect(customer.id).toBeDefined();
        expect(customer.name).toBe("Eduardo Hermes Neto");
        expect(customer.address).toBe(address)
    })
})