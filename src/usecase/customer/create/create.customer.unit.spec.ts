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

const MockRepository = () =>{
    return {
        find: jest.fn(),
        findAll: jest.fn(),
        create: jest.fn(),
        update: jest.fn()
    }
}

describe("Unit test create customer use case", () => {
    it("should create a new customer", async() =>{
        const customerRepository = MockRepository();

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
        const customerRepository = MockRepository();

        const customerCreateUseCase = new CreateCustomerUseCase(customerRepository);

        input.name = "";

        await expect(customerCreateUseCase.execute(input)).rejects.toThrow("Name is Required");
    })


    it("should throw an error when street is missing", async() =>{
        const customerRepository = MockRepository();

        const customerCreateUseCase = new CreateCustomerUseCase(customerRepository);

        input.address.street = "";

        await expect(customerCreateUseCase.execute(input)).rejects.toThrow("Street is required");
    })
})