"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const product_factory_1 = __importDefault(require("./product.factory"));
describe("Product factory unit test", () => {
    it("Should create a product type A", () => {
        const product = product_factory_1.default.create("Product A", 1);
        expect(product.id).toBeDefined();
        expect(product.name).toBe("Product A");
        expect(product.price).toBe(1);
    });
    it("Should create a product type B", () => {
        const product = product_factory_1.default.create("Product B", 2);
        expect(product.id).toBeDefined();
        expect(product.name).toBe("Product B");
        expect(product.price).toBe(2);
    });
});
