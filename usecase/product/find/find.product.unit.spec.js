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
const product_1 = __importDefault(require("../../../domain/product/entity/product"));
const find_product_usecase_1 = __importDefault(require("./find.product.usecase"));
const product = new product_1.default("123", "Produto Caro", 200);
const MockRepository = () => {
    return {
        find: jest.fn().mockReturnValue(Promise.resolve(product)),
        findAll: jest.fn(),
        create: jest.fn(),
        update: jest.fn()
    };
};
describe("Unit Test find product use case", () => {
    it("should find a product", () => __awaiter(void 0, void 0, void 0, function* () {
        const productRepository = MockRepository();
        const useCase = new find_product_usecase_1.default(productRepository);
        const input = {
            id: "123"
        };
        const output = {
            id: "123",
            name: "Produto Caro",
            price: 200
        };
        const result = yield useCase.execute(input);
        expect(result).toEqual(output);
    }));
    it("it should not find a customer", () => __awaiter(void 0, void 0, void 0, function* () {
        const customerRepository = MockRepository();
        customerRepository.find.mockImplementation(() => {
            throw new Error("Product not found");
        });
        const useCase = new find_product_usecase_1.default(customerRepository);
        const input = {
            id: "123"
        };
        expect(() => __awaiter(void 0, void 0, void 0, function* () {
            return yield useCase.execute(input);
        })).rejects.toThrow("Product not found");
    }));
});
