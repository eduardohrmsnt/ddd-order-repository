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
const customer_1 = __importDefault(require("../../../../domain/customer/entity/customer"));
const address_1 = __importDefault(require("../../../../domain/customer/value-object/address"));
const customer_model_1 = __importDefault(require("./customer.model"));
const customer_repository_1 = __importDefault(require("./customer.repository"));
describe("Customer repository test", () => {
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
    it("should create a customer", () => __awaiter(void 0, void 0, void 0, function* () {
        const customerRepository = new customer_repository_1.default();
        const customer = new customer_1.default("124", "Produto 1");
        const address = new address_1.default("Street 1", 10, "89128000", "Luiz Alves");
        customer.changeAddress(address);
        yield customerRepository.create(customer);
        const customerModel = yield customer_model_1.default.findOne({ where: { id: "124" } });
        expect(customerModel.toJSON()).toStrictEqual({
            id: "124",
            name: customer.name,
            active: customer.isActive(),
            city: address.city,
            rewardPoints: customer.rewardPoints,
            street: address.street,
            number: address.number,
            zipcode: address.zip,
        });
    }));
    it("should update a customer", () => __awaiter(void 0, void 0, void 0, function* () {
        const customerRepository = new customer_repository_1.default();
        const customer = new customer_1.default("145", "Produto 1");
        const address = new address_1.default("Street 1", 10, "89128000", "Luiz Alves");
        customer.changeAddress(address);
        yield customerRepository.create(customer);
        const customerModel = yield customer_model_1.default.findOne({ where: { id: "145" } });
        expect(customerModel.toJSON()).toStrictEqual({
            id: "145",
            name: customer.name,
            active: customer.isActive(),
            city: address.city,
            rewardPoints: customer.rewardPoints,
            street: address.street,
            number: address.number,
            zipcode: address.zip,
        });
        customer.changeName("Produto 2");
        yield customerRepository.update(customer);
        const customerModel2 = yield customer_model_1.default.findOne({ where: { id: "145" } });
        expect(customerModel2.toJSON()).toStrictEqual({
            id: "145",
            name: customer.name,
            active: customer.isActive(),
            city: address.city,
            rewardPoints: customer.rewardPoints,
            street: address.street,
            number: address.number,
            zipcode: address.zip,
        });
    }));
    it("should find a customer", () => __awaiter(void 0, void 0, void 0, function* () {
        const customerRepository = new customer_repository_1.default();
        const customer = new customer_1.default("154", "Produto 1");
        const address = new address_1.default("Street 1", 10, "89128000", "Luiz Alves");
        customer.changeAddress(address);
        yield customerRepository.create(customer);
        const customerModel = yield customerRepository.find(customer.id);
        expect(customer).toStrictEqual(customerModel);
    }));
    it("should throw an error when customer is not found", () => __awaiter(void 0, void 0, void 0, function* () {
        const customerRepository = new customer_repository_1.default();
        expect(() => __awaiter(void 0, void 0, void 0, function* () { yield customerRepository.find("Blabla"); })).rejects.toThrow("Customer not found");
    }));
    it("should find all customers", () => __awaiter(void 0, void 0, void 0, function* () {
        const customerRepository = new customer_repository_1.default();
        const customer = new customer_1.default("124", "Produto 1");
        const address = new address_1.default("Street 1", 10, "89128000", "Luiz Alves");
        customer.changeAddress(address);
        yield customerRepository.create(customer);
        const customer2 = new customer_1.default("223", "Produto 2");
        customer2.changeAddress(address);
        yield customerRepository.create(customer2);
        const foundCustomers = yield customerRepository.findAll();
        expect(foundCustomers).toHaveLength(2);
        expect(foundCustomers).toContainEqual(customer);
        expect(foundCustomers).toContainEqual(customer2);
    }));
});
