"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const customer_1 = __importDefault(require("../../customer/entity/customer"));
const order_1 = __importDefault(require("../entity/order"));
const order_item_1 = __importDefault(require("../entity/order_item"));
const order_service_1 = __importDefault(require("./order.service"));
describe("Order service unit tests", () => {
    it("should place an order", () => {
        const customer = new customer_1.default("1", "Eduardo Hermes");
        const item1 = new order_item_1.default("1", "item1", 10, "1", 1);
        const order = order_service_1.default.placeOrder(customer, [item1]);
        expect(customer.rewardPoints).toBe(5);
        expect(order.total()).toBe(10);
    });
    it("Should get total of all orders", () => {
        const orderItem1 = new order_item_1.default("1", "Item", 10, "1", 3);
        const orderItem2 = new order_item_1.default("2", "Item2", 10, "1", 2);
        const order1 = new order_1.default("123", "1", [orderItem1]);
        const order2 = new order_1.default("123", "1", [orderItem2]);
        const total = order_service_1.default.total([order1, order2]);
        expect(total).toBe(50);
    });
});
