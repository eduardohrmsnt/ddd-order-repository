import { Sequelize } from "sequelize-typescript";
import Customer from "../../../domain/customer/entity/customer";
import Address from "../../../domain/customer/value-object/address";
import CustomerModel from "../../../infrastructure/customer/repository/sequelize/customer.model";
import CustomerRepository from "../../../infrastructure/customer/repository/sequelize/customer.repository";
import FindCustomerUseCase from "./find.customer.usecase";

const customer = new Customer("123", "Eduardo");
const address = new Address("Rua 3 de Janeiro", 277, "89128000", "Luiz Alves")
customer.changeAddress(address);

const MockRepository = () =>{
    return {
        find: jest.fn().mockReturnValue(Promise.resolve(customer)),
        findAll: jest.fn(),
        create: jest.fn(),
        update: jest.fn()
    }
}
describe("Unit Test find customer use case", () => {


    it("should find a customer", async() =>{
        
        const customerRepository = MockRepository();
        const useCase = new FindCustomerUseCase(customerRepository)


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

    it("it should not find a customer", async() =>{
        
        const customerRepository = MockRepository();
        customerRepository.find.mockImplementation(() =>{
            throw new Error("Customer not found")
        })
        const useCase = new FindCustomerUseCase(customerRepository)


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


        expect(async () => {
            return await useCase.execute(input);
        }).rejects.toThrow("Customer not found");
    })
});