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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var sequelize_typescript_1 = require("sequelize-typescript");
var address_1 = require("../../domain/entity/address");
var customer_1 = require("../../domain/entity/customer");
var order_1 = require("../../domain/entity/order");
var order_item_1 = require("../../domain/entity/order_item");
var product_1 = require("../../domain/entity/product");
var customer_model_1 = require("../db/sequelize/model/customer.model");
var order_item_model_1 = require("../db/sequelize/model/order-item.model");
var order_model_1 = require("../db/sequelize/model/order.model");
var product_model_1 = require("../db/sequelize/model/product.model");
var customer_repository_1 = require("./customer.repository");
var order_repository_1 = require("./order.repository");
var product_repository_1 = require("./product.repository");
describe("Order repository test", function () {
    var sequilize;
    beforeEach(function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    sequilize = new sequelize_typescript_1.Sequelize({
                        dialect: 'sqlite',
                        storage: ':memory',
                        logging: false,
                        sync: { force: true }
                    });
                    sequilize.addModels([customer_model_1["default"], order_model_1["default"], order_item_model_1["default"], product_model_1["default"]]);
                    return [4 /*yield*/, sequilize.sync()];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    afterEach(function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, sequilize.close()];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    it("Should create a new order", function () { return __awaiter(void 0, void 0, void 0, function () {
        var customerRepository, customer, address, productRepository, product, orderRepository, orderItem, order, orderModel;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    customerRepository = new customer_repository_1["default"]();
                    customer = new customer_1["default"]("1", "John Lennon");
                    address = new address_1["default"]("Rua 3 de Janeiro", 277, "89128000", "Luiz Alves");
                    customer.changeAddress(address);
                    return [4 /*yield*/, customerRepository.create(customer)];
                case 1:
                    _a.sent();
                    productRepository = new product_repository_1["default"]();
                    product = new product_1["default"]("1", "Product 1", 10);
                    return [4 /*yield*/, productRepository.create(product)];
                case 2:
                    _a.sent();
                    orderRepository = new order_repository_1["default"]();
                    orderItem = new order_item_1["default"]("1", product.name, product.price, product.id, 2);
                    order = new order_1["default"]("1", customer.id, [orderItem]);
                    return [4 /*yield*/, orderRepository.create(order)];
                case 3:
                    _a.sent();
                    return [4 /*yield*/, order_model_1["default"].findOne({ where: { id: order.id }, include: ["items"] })];
                case 4:
                    orderModel = _a.sent();
                    expect(orderModel.toJSON()).toStrictEqual({
                        id: "1",
                        customer_id: "1",
                        total: order.total(),
                        items: [
                            {
                                id: orderItem.id,
                                name: orderItem.name,
                                price: orderItem.price,
                                quantity: orderItem.quantity,
                                product_id: orderItem.productId,
                                order_id: "1"
                            }
                        ]
                    });
                    return [2 /*return*/];
            }
        });
    }); });
    it("Should update an order", function () { return __awaiter(void 0, void 0, void 0, function () {
        var customerRepository, customer, address, customer2, address2, productRepository, product, orderRepository, orderItem, order, orderModel, orderModel2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    customerRepository = new customer_repository_1["default"]();
                    customer = new customer_1["default"]("1", "John Lennon");
                    address = new address_1["default"]("Rua 3 de Janeiro", 277, "89128000", "Luiz Alves");
                    customer.changeAddress(address);
                    return [4 /*yield*/, customerRepository.create(customer)];
                case 1:
                    _a.sent();
                    customer2 = new customer_1["default"]("123", "John Lennon");
                    address2 = new address_1["default"]("Rua 3 de Janeiro", 277, "89128000", "Luiz Alves");
                    customer2.changeAddress(address2);
                    return [4 /*yield*/, customerRepository.create(customer2)];
                case 2:
                    _a.sent();
                    productRepository = new product_repository_1["default"]();
                    product = new product_1["default"]("1", "Product 1", 10);
                    return [4 /*yield*/, productRepository.create(product)];
                case 3:
                    _a.sent();
                    orderRepository = new order_repository_1["default"]();
                    orderItem = new order_item_1["default"]("1", product.name, product.price, product.id, 2);
                    order = new order_1["default"]("1", customer.id, [orderItem]);
                    return [4 /*yield*/, orderRepository.create(order)];
                case 4:
                    _a.sent();
                    return [4 /*yield*/, order_model_1["default"].findOne({ where: { id: order.id }, include: ["items"] })];
                case 5:
                    orderModel = _a.sent();
                    expect(orderModel.toJSON()).toStrictEqual({
                        id: "1",
                        customer_id: customer.id,
                        total: order.total(),
                        items: [
                            {
                                id: orderItem.id,
                                name: orderItem.name,
                                price: orderItem.price,
                                quantity: orderItem.quantity,
                                product_id: orderItem.productId,
                                order_id: "1"
                            }
                        ]
                    });
                    order.changeCustomer(customer2.id);
                    return [4 /*yield*/, orderRepository.update(order)];
                case 6:
                    _a.sent();
                    return [4 /*yield*/, order_model_1["default"].findOne({ where: { id: order.id }, include: ["items"] })];
                case 7:
                    orderModel2 = _a.sent();
                    expect(orderModel2.toJSON()).toStrictEqual({
                        id: "1",
                        customer_id: customer2.id,
                        total: order.total(),
                        items: [
                            {
                                id: orderItem.id,
                                name: orderItem.name,
                                price: orderItem.price,
                                quantity: orderItem.quantity,
                                product_id: orderItem.productId,
                                order_id: "1"
                            }
                        ]
                    });
                    return [2 /*return*/];
            }
        });
    }); });
    it("Should find an order", function () { return __awaiter(void 0, void 0, void 0, function () {
        var customerRepository, customer, address, productRepository, product, orderRepository, orderItem, order, order2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    customerRepository = new customer_repository_1["default"]();
                    customer = new customer_1["default"]("1", "John Lennon");
                    address = new address_1["default"]("Rua 3 de Janeiro", 277, "89128000", "Luiz Alves");
                    customer.changeAddress(address);
                    return [4 /*yield*/, customerRepository.create(customer)];
                case 1:
                    _a.sent();
                    productRepository = new product_repository_1["default"]();
                    product = new product_1["default"]("1", "Product 1", 10);
                    return [4 /*yield*/, productRepository.create(product)];
                case 2:
                    _a.sent();
                    orderRepository = new order_repository_1["default"]();
                    orderItem = new order_item_1["default"]("1", product.name, product.price, product.id, 2);
                    order = new order_1["default"]("1", customer.id, [orderItem]);
                    return [4 /*yield*/, orderRepository.create(order)];
                case 3:
                    _a.sent();
                    return [4 /*yield*/, orderRepository.find(order.id)];
                case 4:
                    order2 = _a.sent();
                    expect(order).toEqual(order2);
                    return [2 /*return*/];
            }
        });
    }); });
    it("Should find all orders", function () { return __awaiter(void 0, void 0, void 0, function () {
        var customerRepository, customer, address, productRepository, product, orderRepository, orderItem, order, orderItem2, order2, orders;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    customerRepository = new customer_repository_1["default"]();
                    customer = new customer_1["default"]("1", "John Lennon");
                    address = new address_1["default"]("Rua 3 de Janeiro", 277, "89128000", "Luiz Alves");
                    customer.changeAddress(address);
                    return [4 /*yield*/, customerRepository.create(customer)];
                case 1:
                    _a.sent();
                    productRepository = new product_repository_1["default"]();
                    product = new product_1["default"]("1", "Product 1", 10);
                    return [4 /*yield*/, productRepository.create(product)];
                case 2:
                    _a.sent();
                    orderRepository = new order_repository_1["default"]();
                    orderItem = new order_item_1["default"]("1", product.name, product.price, product.id, 2);
                    order = new order_1["default"]("1", customer.id, [orderItem]);
                    return [4 /*yield*/, orderRepository.create(order)];
                case 3:
                    _a.sent();
                    orderItem2 = new order_item_1["default"]("2", product.name, product.price, product.id, 2);
                    order2 = new order_1["default"]("2", customer.id, [orderItem2]);
                    return [4 /*yield*/, orderRepository.create(order2)];
                case 4:
                    _a.sent();
                    return [4 /*yield*/, orderRepository.findAll()];
                case 5:
                    orders = _a.sent();
                    expect(orders).toHaveLength(2);
                    expect(orders).toContainEqual(order);
                    expect(orders).toContainEqual(order2);
                    return [2 /*return*/];
            }
        });
    }); });
});
