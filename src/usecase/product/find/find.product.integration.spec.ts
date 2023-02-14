import { Sequelize } from "sequelize-typescript";
import Customer from "../../../domain/customer/entity/customer";
import Address from "../../../domain/customer/value-object/address";
import Product from "../../../domain/product/entity/product";
import ProductFactory from "../../../domain/product/factory/product.factory";
import CustomerModel from "../../../infrastructure/customer/repository/sequelize/customer.model";
import CustomerRepository from "../../../infrastructure/customer/repository/sequelize/customer.repository";
import ProductModel from "../../../infrastructure/product/repository/sequelize/product.model";
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository";
import FindProductUseCase from "./find.product.usecase";

describe("Integration Test find product use case", () => {
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

    it("should find a product", async() =>{
        
        const productRepository = new ProductRepository();
        const useCase = new FindProductUseCase(productRepository)
        const product = new Product("123","Produto Mais ou Menos", 10);

        await productRepository.create(product);

        const input = {
            id: "123"
        }

        const output = {
            id: "123",
            name: "Produto Mais ou Menos",
            price: 10
        }

        const result = await useCase.execute(input);

        expect(result).toEqual(output);
    })
});