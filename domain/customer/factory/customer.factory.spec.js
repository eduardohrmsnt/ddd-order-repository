"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const address_1 = __importDefault(require("../value-object/address"));
const customer_factory_1 = __importDefault(require("./customer.factory"));
describe("Customer factory unit test", () => {
    it("should create a customer", () => {
        let customer = customer_factory_1.default.create("Eduardo Hermes Neto");
        expect(customer.id).toBeDefined();
        expect(customer.name).toBe("Eduardo Hermes Neto");
        expect(customer.address).toBeUndefined();
    });
    it("should create a customer with address", () => {
        const address = new address_1.default("Rua 3 de Janeiro", 277, "89128000", "Luiz Alves");
        let customer = customer_factory_1.default.createWithAddress("Eduardo Hermes Neto", address);
        expect(customer.id).toBeDefined();
        expect(customer.name).toBe("Eduardo Hermes Neto");
        expect(customer.address).toBe(address);
    });
});
