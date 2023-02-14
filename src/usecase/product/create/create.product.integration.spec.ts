import { Sequelize } from "sequelize-typescript";
import ProductModel from "../../../infrastructure/product/repository/sequelize/product.model";
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository";
import CreateProductUseCase from "./create.product.usecase"

const input = {
    name: "Product 1",
    price: 200.00
}




describe("Integration test create product use case", () => {
    let sequilize: Sequelize;

    
    beforeEach(async () => {
        jest.setTimeout(60000);
        sequilize = new Sequelize({
            dialect: 'sqlite',
            storage: ':memory',
            logging: false,
            sync: { force: true }
        });

        sequilize.addModels([ProductModel])
        await sequilize.sync();
    })

    afterEach(async () => {
        await sequilize.close();
    });


    it("should create a new product", async() =>{
        const productRepository = new ProductRepository();

        const customerProductUseCase = new CreateProductUseCase(productRepository);

        const output = await customerProductUseCase.execute(input);

        expect(output).toEqual({
            id: expect.any(String),
            name: input.name,
            price: input.price
        })

    })

    it("should throw an error when name is missing", async() =>{
        const productRepository = new ProductRepository();

        const productCreateUseCase = new CreateProductUseCase(productRepository);

        input.name = "";

        await expect(productCreateUseCase.execute(input)).rejects.toThrow("Name is required");
    })


    it("should throw an error when price is missing", async() =>{
        const productRepository = new ProductRepository();

        const productCreateUseCase = new CreateProductUseCase(productRepository);

        input.name = "Charles"
        input.price = -2;

        await expect(productCreateUseCase.execute(input)).rejects.toThrow("Price must be greater than zero");
    })
})