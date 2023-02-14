import Product from "../../../domain/product/entity/product";
import ProductFactory from "../../../domain/product/factory/product.factory"
import UpdateProductUseCase from "./update.product.usecase";

const product = ProductFactory.create("Product 1", 10);

const input = {
    id: product.id,
    price: 20,
    name: 'Product 2'
}

const MockRepository = () =>{
    return { 
        create: jest.fn(),
        find: jest.fn().mockReturnValue(Promise.resolve(product)),
        findAll: jest.fn(),
        update: jest.fn()
    }
}

describe("Unit test for update product use case", () => {
    it("Should update a product", async () =>{ 
        const productRepository = MockRepository();

        const updateProductUseCase = new UpdateProductUseCase(productRepository);

        const output = await updateProductUseCase.execute(input);

        expect(output).toEqual(input);
    })
})