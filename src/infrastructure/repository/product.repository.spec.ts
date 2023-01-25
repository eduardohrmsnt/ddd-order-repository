import { Sequelize } from "sequelize-typescript"
import Product from "../../domain/entity/product";
import ProductModel from "../db/sequelize/model/product.model";
import ProductRepository from "./product.repository";

describe("Product repository test", () => {
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

    it("should create a product", async () => {
        const productRepository = new ProductRepository();
        const product = new Product("34", "Produto 1", 100)
        await productRepository.create(product);

        const productModel = await ProductModel.findOne({ where: { id: "34" } });

        expect(productModel.toJSON()).toStrictEqual({
            id: "34", name: "Produto 1", price: 100
        })

    })

    it("should update a product", async () => {
        const productRepository = new ProductRepository();
        const product = new Product("15", "Produto 1", 100)
        await productRepository.create(product);

        const productModel = await ProductModel.findOne({ where: { id: "15" } });

        expect(productModel.toJSON()).toStrictEqual({
            id: "15",
            name: "Produto 1",
            price: 100
        })

        product.changeName("Produto 2");
        product.changePrice(200);

        await productRepository.update(product);

        const productModel2 = await ProductModel.findOne({ where: { id: "15" } });

        expect(productModel2.toJSON()).toStrictEqual({
            id: "15",
            name: "Produto 2",
            price: 200
        })
    })


    it("should find a product", async () => {
        const productRepository = new ProductRepository();
        const product = new Product("35", "Produto 1", 100)
        await productRepository.create(product);

        const productModel2 = await ProductModel.findOne({ where: { id: "35" } });

        const foundProduct = await productRepository.find("35");

        expect(productModel2.toJSON()).toStrictEqual({
            id: foundProduct.id,
            name: foundProduct.name,
            price: foundProduct.price
        })
    })

    it("should find all products", async () => {
        const productRepository = new ProductRepository();
        const product = new Product("56", "Produto 1", 100);
        await productRepository.create(product);

        const product2 = new Product("57", "Produto 2", 200);
        await productRepository.create(product2);


        const foundProducts = await productRepository.findAll();

        const products = [product, product2];


        expect(products).toEqual(foundProducts);
    })

})