"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const product_1 = __importDefault(require("./product"));
describe("Product unit tests", () => {
    it("Should throw error when id is empty", () => {
        expect(() => {
            let product = new product_1.default("", "Product 1", 100);
        }).toThrowError("Id is required");
    });
    it("Should throw error when name is empty", () => {
        expect(() => {
            let product = new product_1.default("123", "", 100);
        }).toThrowError("Name is required");
    });
    it("Should throw error when price is less then 0", () => {
        expect(() => {
            let product = new product_1.default("123", "13131", -1);
        }).toThrowError("Price must be greater than zero");
    });
    it("Should change name", () => {
        let product = new product_1.default("123", "13131", 10);
        product.changeName("Product 2");
        expect(product.name).toBe("Product 2");
    });
    it("Should change price", () => {
        let product = new product_1.default("123", "13131", 10);
        product.changePrice(100);
        expect(product.price).toBe(100);
    });
});
