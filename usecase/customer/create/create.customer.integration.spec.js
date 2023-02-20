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
const customer_model_1 = __importDefault(require("../../../infrastructure/customer/repository/sequelize/customer.model"));
const customer_repository_1 = __importDefault(require("../../../infrastructure/customer/repository/sequelize/customer.repository"));
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
describe("Integration test create customer use case", () => {
    let sequilize;
    beforeEach(() => __awaiter(void 0, void 0, void 0, function* () {
        jest.setTimeout(60000);
        sequilize = new sequelize_typescript_1.Sequelize({
            dialect: 'sqlite',
            storage: ':memory:',
            logging: false,
            sync: { force: true }
        });
        sequilize.addModels([customer_model_1.default]);
        yield sequilize.sync();
    }));
    afterEach(() => __awaiter(void 0, void 0, void 0, function* () {
        yield sequilize.close();
    }));
    it("should create a new customer", () => __awaiter(void 0, void 0, void 0, function* () {
        const customerRepository = new customer_repository_1.default();
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
        const customerRepository = new customer_repository_1.default();
        const customerCreateUseCase = new create_customer_usecase_1.default(customerRepository);
        input.name = "";
        yield expect(customerCreateUseCase.execute(input)).rejects.toThrow("Name is Required");
    }));
    it("should throw an error when street is missing", () => __awaiter(void 0, void 0, void 0, function* () {
        const customerRepository = new customer_repository_1.default();
        const customerCreateUseCase = new create_customer_usecase_1.default(customerRepository);
        input.address.street = "";
        yield expect(customerCreateUseCase.execute(input)).rejects.toThrow("Street is required");
    }));
});
