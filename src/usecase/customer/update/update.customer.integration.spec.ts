import { Sequelize } from "sequelize-typescript";
import Customer from "../../../domain/customer/entity/customer";
import CustomerFactory from "../../../domain/customer/factory/customer.factory";
import Address from "../../../domain/customer/value-object/address";
import CustomerModel from "../../../infrastructure/customer/repository/sequelize/customer.model";
import CustomerRepository from "../../../infrastructure/customer/repository/sequelize/customer.repository";
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

describe("Integration test for customer update use case", () =>{ 
    let sequilize: Sequelize;

    
    beforeEach(async () => {
        jest.setTimeout(60000);
        sequilize = new Sequelize({
            dialect: 'sqlite',
            storage: ':memory:',
            logging: false,
            sync: { force: true }
        });

        sequilize.addModels([CustomerModel])
        await sequilize.sync();
    })

    afterEach(async () => {
        await sequilize.close();
    });

    it("Should update a customer", async() =>{
        const customerRepository = new CustomerRepository();

        await customerRepository.create(customer);

        const customerUpdateUseCase = new UpdateCustomerUseCase(customerRepository);

        const output = await customerUpdateUseCase.execute(input);

        expect(output).toEqual(input);
    })
})