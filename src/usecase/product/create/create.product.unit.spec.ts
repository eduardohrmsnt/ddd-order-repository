import CreateProductUseCase from "./create.product.usecase"

const input = {
    name: "Product 1",
    price: 200.00
}


const MockRepository = () =>{
    return {
        find: jest.fn(),
        findAll: jest.fn(),
        create: jest.fn(),
        update: jest.fn()
    }
}

describe("Unit test create product use case", () => {
    it("should create a new product", async() =>{
        const productRepository = MockRepository();

        const customerProductUseCase = new CreateProductUseCase(productRepository);

        const output = await customerProductUseCase.execute(input);

        expect(output).toEqual({
            id: expect.any(String),
            name: input.name,
            price: input.price
        })

    })

    it("should throw an error when name is missing", async() =>{
        const productRepository = MockRepository();

        const productCreateUseCase = new CreateProductUseCase(productRepository);

        input.name = "";

        await expect(productCreateUseCase.execute(input)).rejects.toThrow("Name is required");
    })


    it("should throw an error when price is missing", async() =>{
        const productRepository = MockRepository();

        const productCreateUseCase = new CreateProductUseCase(productRepository);

        input.name = "Charles"
        input.price = -2;

        await expect(productCreateUseCase.execute(input)).rejects.toThrow("Price must be greater than zero");
    })
})