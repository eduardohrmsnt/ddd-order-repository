import { Sequelize } from "sequelize-typescript";
import CustomerModel from "../../../infrastructure/customer/repository/sequelize/customer.model";
import CustomerRepository from "../../../infrastructure/customer/repository/sequelize/customer.repository";
import CreateCustomerUseCase from "./create.customer.usecase";

const input = {
    name: "John",
    address: {
        street: "Street",
        number: 123,
        zip: "Zip",
        city: "City"
    }
};

describe("Integration test create customer use case", () => {
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

    it("should create a new customer", async() =>{
        const customerRepository = new CustomerRepository();

        const customerCreateUseCase = new CreateCustomerUseCase(customerRepository);

        const output = await customerCreateUseCase.execute(input);

        expect(output).toEqual({
            id: expect.any(String),
            name: input.name,
            address: {
                street: input.address.street,
                city: input.address.city,
                zip: input.address.zip,
                number: input.address.number
            }
        })

    })

    it("should throw an error when name is missing", async() =>{
        const customerRepository = new CustomerRepository();

        const customerCreateUseCase = new CreateCustomerUseCase(customerRepository);

        input.name = "";

        await expect(customerCreateUseCase.execute(input)).rejects.toThrow("Name is Required");
    })


    it("should throw an error when street is missing", async() =>{
        const customerRepository = new CustomerRepository();

        const customerCreateUseCase = new CreateCustomerUseCase(customerRepository);

        input.address.street = "";

        await expect(customerCreateUseCase.execute(input)).rejects.toThrow("Street is required");
    })
})