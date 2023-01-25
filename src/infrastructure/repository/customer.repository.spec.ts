import { Sequelize } from "sequelize-typescript"
import Address from "../../domain/entity/address";
import Customer from "../../domain/entity/customer";
import CustomerModel from "../db/sequelize/model/customer.model";
import CustomerRepository from "./customer.repository";

describe("Customer repository test", ()=> {
    let sequilize : Sequelize;

    beforeEach(async () => {
        sequilize = new Sequelize({
            dialect: 'sqlite',
            storage: ':memory',
            logging: false,
            sync: { force: true }
        });

        sequilize.addModels([CustomerModel])
        await sequilize.sync();
    })       
    
    afterEach(async () =>{
        await sequilize.close();
    });

    it("should create a customer", async () => {
        const customerRepository = new CustomerRepository();
        const customer = new Customer("1", "Produto 1")
        const address = new Address("Street 1", 10, "89128000", "Luiz Alves");
        customer.changeAddress(address);
        await customerRepository.create(customer);

        const customerModel = await CustomerModel.findOne({ where: { id: "1"}});

        expect(customerModel.toJSON()).toStrictEqual({
            id:"1",
            name: customer.name,
            active: customer.isActive(),
            city: address.city,
            rewardPoints: customer.rewardPoints,
            street: address.street,
            number: address.number,
            zipcode: address.zip,
        })
        
    })

    it("should update a customer", async () => {
        const customerRepository = new CustomerRepository();
        const customer = new Customer("1", "Produto 1")
        const address = new Address("Street 1", 10, "89128000", "Luiz Alves");
        customer.changeAddress(address);
        await customerRepository.create(customer);

        const customerModel = await CustomerModel.findOne({ where: { id: "1"}});

        expect(customerModel.toJSON()).toStrictEqual({
            id:"1",
            name: customer.name,
            active: customer.isActive(),
            city: address.city,
            rewardPoints: customer.rewardPoints,
            street: address.street,
            number: address.number,
            zipcode: address.zip,
        })

        customer.changeName("Produto 2");

        await customerRepository.update(customer);

        const customerModel2 = await CustomerModel.findOne({ where: { id: "1"}});

        expect(customerModel2.toJSON()).toStrictEqual({
            id:"1",
            name: customer.name,
            active: customer.isActive(),
            city: address.city,
            rewardPoints: customer.rewardPoints,
            street: address.street,
            number: address.number,
            zipcode: address.zip,
        })
    })

    
    it("should find a customer", async () => {
        const customerRepository = new CustomerRepository();
        const customer = new Customer("1", "Produto 1")
        const address = new Address("Street 1", 10, "89128000", "Luiz Alves");
        customer.changeAddress(address);
        await customerRepository.create(customer);

        const customerModel = await customerRepository.find(customer.id);

        expect(customer).toStrictEqual(customerModel)
    })

    it("should throw an error when customer is not found", async () => {
        const customerRepository = new CustomerRepository();

        expect(async() => {await customerRepository.find("Blabla")}).rejects.toThrow("Customer not found")
    })

    it("should find all customers", async () => {
        const customerRepository = new CustomerRepository();
        const customer = new Customer("1", "Produto 1");
        const address = new Address("Street 1", 10, "89128000", "Luiz Alves");
        customer.changeAddress(address);
        await customerRepository.create(customer);

        const customer2 = new Customer("2", "Produto 2");
        customer2.changeAddress(address);
        await customerRepository.create(customer2);

        
        const foundCustomers = await customerRepository.findAll();

        expect(foundCustomers).toHaveLength(2);
        expect(foundCustomers).toContainEqual(customer);
        expect(foundCustomers).toContainEqual(customer2);
    })
   
})