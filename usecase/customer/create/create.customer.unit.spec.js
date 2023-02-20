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
const create_customer_usecase_1 = __importDefault(require("./create.customer.usecase"));
const input = {
    name: "John",
    address: {
        street: "Street",
        number: 123,
        zip: "Zip",
        city: "City"
    }
};
const MockRepository = () => {
    return {
        find: jest.fn(),
        findAll: jest.fn(),
        create: jest.fn(),
        update: jest.fn()
    };
};
describe("Unit test create customer use case", () => {
    it("should create a new customer", () => __awaiter(void 0, void 0, void 0, function* () {
        const customerRepository = MockRepository();
        const customerCreateUseCase = new create_customer_usecase_1.default(customerRepository);
        const output = yield customerCreateUseCase.execute(input);
        expect(output).toEqual({
            id: expect.any(String),
            name: input.name,
            address: {
                street: input.address.street,
                city: input.address.city,
                zip: input.address.zip,
                number: input.address.number
            }
        });
    }));
    it("should throw an error when name is missing", () => __awaiter(void 0, void 0, void 0, function* () {
        const customerRepository = MockRepository();
        const customerCreateUseCase = new create_customer_usecase_1.default(customerRepository);
        input.name = "";
        yield expect(customerCreateUseCase.execute(input)).rejects.toThrow("Name is Required");
    }));
    it("should throw an error when street is missing", () => __awaiter(void 0, void 0, void 0, function* () {
        const customerRepository = MockRepository();
        const customerCreateUseCase = new create_customer_usecase_1.default(customerRepository);
        input.address.street = "";
        yield expect(customerCreateUseCase.execute(input)).rejects.toThrow("Street is required");
    }));
});
