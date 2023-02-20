"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_typescript_1 = require("sequelize-typescript");
const product_1 = __importDefault(require("../../../../domain/product/entity/product"));
const product_model_1 = __importDefault(require("./product.model"));
const product_repository_1 = __importDefault(require("./product.repository"));
describe("Product repository test", () => {
    let sequilize;
    beforeEach(() => __awaiter(void 0, void 0, void 0, function* () {
        jest.setTimeout(60000);
        sequilize = new sequelize_typescript_1.Sequelize({
            dialect: 'sqlite',
            storage: ':memory:',
            logging: false,
            sync: { force: true }
        });
        sequilize.addModels([product_model_1.default]);
        yield sequilize.sync();
    }));
    afterEach(() => __awaiter(void 0, void 0, void 0, function* () {
        yield sequilize.close();
    }));
    it("should create a product", () => __awaiter(void 0, void 0, void 0, function* () {
        const productRepository = new product_repository_1.default();
        const product = new product_1.default("34", "Produto 1", 100);
        yield productRepository.create(product);
        const productModel = yield product_model_1.default.findOne({ where: { id: "34" } });
        expect(productModel.toJSON()).toStrictEqual({
            id: "34", name: "Produto 1", price: 100
        });
    }));
    it("should update a product", () => __awaiter(void 0, void 0, void 0, function* () {
        const productRepository = new product_repository_1.default();
        const product = new product_1.default("15", "Produto 1", 100);
        yield productRepository.create(product);
        const productModel = yield product_model_1.default.findOne({ where: { id: "15" } });
        expect(productModel.toJSON()).toStrictEqual({
            id: "15",
            name: "Produto 1",
            price: 100
        });
        product.changeName("Produto 2");
        product.changePrice(200);
        yield productRepository.update(product);
        const productModel2 = yield product_model_1.default.findOne({ where: { id: "15" } });
        expect(productModel2.toJSON()).toStrictEqual({
            id: "15",
            name: "Produto 2",
            price: 200
        });
    }));
    it("should find a product", () => __awaiter(void 0, void 0, void 0, function* () {
        const productRepository = new product_repository_1.default();
        const product = new product_1.default("35", "Produto 1", 100);
        yield productRepository.create(product);
        const productModel2 = yield product_model_1.default.findOne({ where: { id: "35" } });
        const foundProduct = yield productRepository.find("35");
        expect(productModel2.toJSON()).toStrictEqual({
            id: foundProduct.id,
            name: foundProduct.name,
            price: foundProduct.price
        });
    }));
    it("should find all products", () => __awaiter(void 0, void 0, void 0, function* () {
        const productRepository = new product_repository_1.default();
        const product = new product_1.default("56", "Produto 1", 100);
        yield productRepository.create(product);
        const product2 = new product_1.default("57", "Produto 2", 200);
        yield productRepository.create(product2);
        const foundProducts = yield productRepository.findAll();
        const products = [product, product2];
        expect(products).toEqual(foundProducts);
    }));
});
