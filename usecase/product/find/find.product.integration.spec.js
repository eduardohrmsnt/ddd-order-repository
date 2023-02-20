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
const product_1 = __importDefault(require("../../../domain/product/entity/product"));
const product_model_1 = __importDefault(require("../../../infrastructure/product/repository/sequelize/product.model"));
const product_repository_1 = __importDefault(require("../../../infrastructure/product/repository/sequelize/product.repository"));
const find_product_usecase_1 = __importDefault(require("./find.product.usecase"));
describe("Integration Test find product use case", () => {
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
    it("should find a product", () => __awaiter(void 0, void 0, void 0, function* () {
        const productRepository = new product_repository_1.default();
        const useCase = new find_product_usecase_1.default(productRepository);
        const product = new product_1.default("123", "Produto Mais ou Menos", 10);
        yield productRepository.create(product);
        const input = {
            id: "123"
        };
        const output = {
            id: "123",
            name: "Produto Mais ou Menos",
            price: 10
        };
        const result = yield useCase.execute(input);
        expect(result).toEqual(output);
    }));
});
