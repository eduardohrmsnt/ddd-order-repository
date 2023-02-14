import { Sequelize } from "sequelize-typescript";
import CustomerFactory from "../../../domain/customer/factory/customer.factory";
import Address from "../../../domain/customer/value-object/address";
import CustomerModel from "../../../infrastructure/customer/repository/sequelize/customer.model";
import CustomerRepository from "../../../infrastructure/customer/repository/sequelize/customer.repository";
import ListCustomerUseCase from "./list.customer.usecase";

const customer1 = CustomerFactory.createWithAddress("John Doe", new Address("Street", 123, "8912800", "Luiz Alves"))
const customer2 = CustomerFactory.createWithAddress("Jahn Doe", new Address("Street 2", 124, "8912800", "Luiz Alves 2"))



describe("Integration test for listing customer use case", () => {
    let sequilize: Sequelize;

    
    beforeEach(async () => {
        jest.setTimeout(60000);
        sequilize = new Sequelize({
            dialect: 'sqlite',
            storage: ':memory',
            logging: false,
            sync: { force: true }
        });

        sequilize.addModels([CustomerModel])
        await sequilize.sync();
    })

    afterEach(async () => {
        await sequilize.close();
    });

    it("Should list a customer", async() => { 
        const customerRepository = new CustomerRepository();

        await customerRepository.create(customer1);
        await customerRepository.create(customer2);

        const useCase = new ListCustomerUseCase(customerRepository);

        const output = await useCase.execute({});

        expect(output.customers.length).toBe(2);
        expect(output.customers[0].id).toBe(customer1.id);
        expect(output.customers[0].name).toBe(customer1.name);
        expect(output.customers[0].address.street).toBe(customer1.address.street);
    
        expect(output.customers[1].id).toBe(customer2.id);
        expect(output.customers[1].name).toBe(customer2.name);
        expect(output.customers[1].address.street).toBe(customer2.address.street);
    
    })
})