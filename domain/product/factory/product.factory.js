"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const product_1 = __importDefault(require("../entity/product"));
const uuid_1 = require("uuid");
class ProductFactory {
    static create(name, price) {
        return new product_1.default((0, uuid_1.v4)(), name, price);
    }
}
exports.default = ProductFactory;
