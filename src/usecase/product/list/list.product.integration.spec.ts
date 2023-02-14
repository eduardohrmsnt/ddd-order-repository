import { Sequelize } from "sequelize-typescript";
import Customer from "../../../domain/customer/entity/customer";
import Address from "../../../domain/customer/value-object/address";
import Product from "../../../domain/product/entity/product";
import ProductFactory from "../../../domain/product/factory/product.factory";
import CustomerModel from "../../../infrastructure/customer/repository/sequelize/customer.model";
import CustomerRepository from "../../../infrastructure/customer/repository/sequelize/customer.repository";
import ProductModel from "../../../infrastructure/product/repository/sequelize/product.model";
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository";
import ListProductUseCase from "./list.product.usecase";


describe("Integration Test list product use case", () => {
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

    it("should list all products", async() =>{
        
        const productRepository = new ProductRepository();
        const useCase = new ListProductUseCase(productRepository)
        const product1 = new Product("123","Produto Mais ou Menos", 10);
        const product2 = new Product("124","Produto Mais ou Menos", 10);

        await productRepository.create(product1);
        await productRepository.create(product2);

        const output = await useCase.execute(productRepository);

        expect(output.products.length).toBe(2);

        expect(output.products[0].id).toBe(product1.id);
        expect(output.products[0].name).toBe(product1.name);
        expect(output.products[0].price).toBe(product1.price);

        expect(output.products[1].id).toBe(product2.id);
        expect(output.products[1].name).toBe(product2.name);
        expect(output.products[1].price).toBe(product2.price);
    })
});