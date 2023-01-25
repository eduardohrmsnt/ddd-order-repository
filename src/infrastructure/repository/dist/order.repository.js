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
var order_1 = require("../../domain/entity/order");
var order_item_1 = require("../../domain/entity/order_item");
var order_item_model_1 = require("../db/sequelize/model/order-item.model");
var order_model_1 = require("../db/sequelize/model/order.model");
var OrderRepository = /** @class */ (function () {
    function OrderRepository() {
    }
    OrderRepository.prototype.create = function (entity) {
        return __awaiter(this, void 0, Promise, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, order_model_1["default"].create({
                            id: entity.id,
                            customer_id: entity.customerId,
                            total: entity.total(),
                            items: entity.items.map(function (item) { return ({
                                id: item.id,
                                name: item.name,
                                price: item.price,
                                product_id: item.productId,
                                quantity: item.quantity
                            }); })
                        }, {
                            include: [{ model: order_item_model_1["default"] }]
                        })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    OrderRepository.prototype.update = function (entity) {
        return __awaiter(this, void 0, Promise, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, order_model_1["default"].update({
                            id: entity.id,
                            customer_id: entity.customerId,
                            total: entity.total(),
                            items: entity.items.map(function (item) { return ({
                                id: item.id,
                                name: item.name,
                                price: item.price,
                                product_id: item.productId,
                                quantity: item.quantity
                            }); })
                        }, {
                            where: {
                                id: entity.id
                            }
                        })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    OrderRepository.prototype.find = function (id) {
        return __awaiter(this, void 0, Promise, function () {
            var orderModel, items, order;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, order_model_1["default"].findOne({ where: { id: id }, include: ["items"] })];
                    case 1:
                        orderModel = _a.sent();
                        items = orderModel.items.map(function (item) { return new order_item_1["default"](item.id, item.name, item.price, item.product_id, item.quantity); });
                        order = new order_1["default"](orderModel.id, orderModel.customer_id, items);
                        return [2 /*return*/, order];
                }
            });
        });
    };
    OrderRepository.prototype.findAll = function () {
        return __awaiter(this, void 0, Promise, function () {
            var ordersModel;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, order_model_1["default"].findAll({ include: ["items"] })];
                    case 1:
                        ordersModel = _a.sent();
                        return [2 /*return*/, ordersModel.map(function (orderModel) {
                                var items = orderModel.items.map(function (item) { return new order_item_1["default"](item.id, item.name, item.price, item.product_id, item.quantity); });
                                var order = new order_1["default"](orderModel.id, orderModel.customer_id, items);
                                return order;
                            })];
                }
            });
        });
    };
    return OrderRepository;
}());
exports["default"] = OrderRepository;
