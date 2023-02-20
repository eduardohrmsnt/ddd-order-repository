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
const create_product_usecase_1 = __importDefault(require("./create.product.usecase"));
const input = {
    name: "Product 1",
    price: 200.00
};
const MockRepository = () => {
    return {
        find: jest.fn(),
        findAll: jest.fn(),
        create: jest.fn(),
        update: jest.fn()
    };
};
describe("Unit test create product use case", () => {
    it("should create a new product", () => __awaiter(void 0, void 0, void 0, function* () {
        const productRepository = MockRepository();
        const customerProductUseCase = new create_product_usecase_1.default(productRepository);
        const output = yield customerProductUseCase.execute(input);
        expect(output).toEqual({
            id: expect.any(String),
            name: input.name,
            price: input.price
        });
    }));
    it("should throw an error when name is missing", () => __awaiter(void 0, void 0, void 0, function* () {
        const productRepository = MockRepository();
        const productCreateUseCase = new create_product_usecase_1.default(productRepository);
        input.name = "";
        yield expect(productCreateUseCase.execute(input)).rejects.toThrow("Name is required");
    }));
    it("should throw an error when price is missing", () => __awaiter(void 0, void 0, void 0, function* () {
        const productRepository = MockRepository();
        const productCreateUseCase = new create_product_usecase_1.default(productRepository);
        input.name = "Charles";
        input.price = -2;
        yield expect(productCreateUseCase.execute(input)).rejects.toThrow("Price must be greater than zero");
    }));
});
