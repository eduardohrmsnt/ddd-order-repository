"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const order_1 = __importDefault(require("./order"));
const order_item_1 = __importDefault(require("./order_item"));
describe("Order unit tests", () => {
    it("should throw error when id is empty", () => {
        expect(() => {
            let order = new order_1.default("", "123", []);
        }).toThrowError("Id is required");
    });
    it("should throw error when customerId is empty", () => {
        expect(() => {
            let order = new order_1.default("1", "", []);
        }).toThrowError("CustomerId is required");
    });
    it("should throw error when customerId is empty", () => {
        expect(() => {
            let order = new order_1.default("1", "123", []);
        }).toThrowError("Items are required");
    });
    it("should throw error when customerId is empty", () => {
        const item = new order_item_1.default("1", "Full Cycle", 10, "1", 1);
        const item1 = new order_item_1.default("2", "Full Cycle", 10, "2", 2);
        const item2 = new order_item_1.default("3", "Full Cycle", 10, "3", 2);
        const order = new order_1.default("1", "123", [item, item1, item2]);
        expect(order.total()).toBe(50);
    });
});
