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
const customer_factory_1 = __importDefault(require("../../../domain/customer/factory/customer.factory"));
const address_1 = __importDefault(require("../../../domain/customer/value-object/address"));
const customer_model_1 = __importDefault(require("../../../infrastructure/customer/repository/sequelize/customer.model"));
const customer_repository_1 = __importDefault(require("../../../infrastructure/customer/repository/sequelize/customer.repository"));
const update_customer_usecase_1 = __importDefault(require("./update.customer.usecase"));
const customer = customer_factory_1.default.createWithAddress("Eduardo", new address_1.default("Rua 3 de Janeiro", 277, "89128000", "Luiz Alves"));
const input = {
    id: customer.id,
    name: "John",
    address: {
        street: "Rua tal",
        number: 305,
        zip: "Zip2",
        city: "City"
    }
};
describe("Integration test for customer update use case", () => {
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
    it("Should update a customer", () => __awaiter(void 0, void 0, void 0, function* () {
        const customerRepository = new customer_repository_1.default();
        yield customerRepository.create(customer);
        const customerUpdateUseCase = new update_customer_usecase_1.default(customerRepository);
        const output = yield customerUpdateUseCase.execute(input);
        expect(output).toEqual(input);
    }));
});
