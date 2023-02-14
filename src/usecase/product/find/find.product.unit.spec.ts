import Product from "../../../domain/product/entity/product";
import FindProductUseCase from "./find.product.usecase";

const product = new Product("123", "Produto Caro", 200);

const MockRepository = () =>{
    return {
        find: jest.fn().mockReturnValue(Promise.resolve(product)),
        findAll: jest.fn(),
        create: jest.fn(),
        update: jest.fn()
    }
}
describe("Unit Test find product use case", () => {


    it("should find a product", async() =>{
        
        const productRepository = MockRepository();
        const useCase = new FindProductUseCase(productRepository)

        const input = {
            id: "123"
        }

        const output = {
            id: "123",
            name: "Produto Caro",
            price: 200
        }

        const result = await useCase.execute(input);

        expect(result).toEqual(output);
    })

    it("it should not find a customer", async() =>{
        
        const customerRepository = MockRepository();
        customerRepository.find.mockImplementation(() =>{
            throw new Error("Product not found")
        })
        const useCase = new FindProductUseCase(customerRepository)

        const input = {
            id: "123"
        }

        expect(async () => {
            return await useCase.execute(input);
        }).rejects.toThrow("Product not found");
    })
});