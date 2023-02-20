import { Sequelize } from "sequelize-typescript";
import Customer from "../../../domain/customer/entity/customer";
import Address from "../../../domain/customer/value-object/address";
import CustomerModel from "../../../infrastructure/customer/repository/sequelize/customer.model";
import CustomerRepository from "../../../infrastructure/customer/repository/sequelize/customer.repository";
import FindCustomerUseCase from "./find.customer.usecase";

describe("Integration Test find customer use case", () => {
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

    it("should find a customer", async() =>{
        
        const customerRepository = new CustomerRepository();
        const useCase = new FindCustomerUseCase(customerRepository)
        const customer = new Customer("123", "Eduardo");
        const address = new Address("Rua 3 de Janeiro", 277, "89128000", "Luiz Alves")
        customer.changeAddress(address);

        await customerRepository.create(customer);

        const input = {
            id: "123"
        }

        const output = {
            id: "123",
            name: "Eduardo",
            address: {
                street: "Rua 3 de Janeiro",
                city: "Luiz Alves",
                number: 277,
                zip: "89128000"
            }
        }

        const result = await useCase.execute(input);

        expect(result).toEqual(output);
    })
});