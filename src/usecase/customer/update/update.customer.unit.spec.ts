import Customer from "../../../domain/customer/entity/customer";
import CustomerFactory from "../../../domain/customer/factory/customer.factory";
import Address from "../../../domain/customer/value-object/address";
import UpdateCustomerUseCase from "./update.customer.usecase";

const customer = CustomerFactory.createWithAddress("Eduardo",new Address("Rua 3 de Janeiro", 277, "89128000", "Luiz Alves"))

const input = {
    id: customer.id,
    name: "John",
    address: {
        street: "Rua tal",
        number: 305,
        zip: "Zip2",
        city: "City"
    }
}

const MockRepository = () =>{
    return {
        create: jest.fn(),
        findAll: jest.fn(),
        find: jest.fn().mockReturnValue(Promise.resolve(customer)),
        update: jest.fn()
    }
}


describe("Unit test for customer update use case", () =>{ 
    it("Should update a customer", async() =>{
        const customerRepository = MockRepository();
        const customerUpdateUseCase = new UpdateCustomerUseCase(customerRepository);

        const output = await customerUpdateUseCase.execute(input);

        expect(output).toEqual(input);
    })
})