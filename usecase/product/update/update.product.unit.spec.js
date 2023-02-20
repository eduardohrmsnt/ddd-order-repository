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
const product_factory_1 = __importDefault(require("../../../domain/product/factory/product.factory"));
const update_product_usecase_1 = __importDefault(require("./update.product.usecase"));
const product = product_factory_1.default.create("Product 1", 10);
const input = {
    id: product.id,
    price: 20,
    name: 'Product 2'
};
const MockRepository = () => {
    return {
        create: jest.fn(),
        find: jest.fn().mockReturnValue(Promise.resolve(product)),
        findAll: jest.fn(),
        update: jest.fn()
    };
};
describe("Unit test for update product use case", () => {
    it("Should update a product", () => __awaiter(void 0, void 0, void 0, function* () {
        const productRepository = MockRepository();
        const updateProductUseCase = new update_product_usecase_1.default(productRepository);
        const output = yield updateProductUseCase.execute(input);
        expect(output).toEqual(input);
    }));
});
