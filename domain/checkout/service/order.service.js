"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const order_1 = __importDefault(require("../entity/order"));
const uuid_1 = require("uuid");
class OrderService {
    static total(orders) {
        return orders.reduce((acc, order) => acc + order.total(), 0);
    }
    static placeOrder(customer, items) {
        const order = new order_1.default((0, uuid_1.v4)(), customer.id, items);
        customer.addRewardPoints(order.total() / 2);
        return order;
    }
}
exports.default = OrderService;
