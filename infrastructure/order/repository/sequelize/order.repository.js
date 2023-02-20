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
const order_1 = __importDefault(require("../../../../domain/checkout/entity/order"));
const order_item_1 = __importDefault(require("../../../../domain/checkout/entity/order_item"));
const order_item_model_1 = __importDefault(require("./order-item.model"));
const order_model_1 = __importDefault(require("./order.model"));
class OrderRepository {
    create(entity) {
        return __awaiter(this, void 0, void 0, function* () {
            yield order_model_1.default.create({
                id: entity.id,
                customer_id: entity.customerId,
                total: entity.total(),
                items: entity.items.map((item) => ({
                    id: item.id,
                    name: item.name,
                    price: item.price,
                    product_id: item.productId,
                    quantity: item.quantity
                })),
            }, {
                include: [{ model: order_item_model_1.default }],
            });
        });
    }
    update(entity) {
        return __awaiter(this, void 0, void 0, function* () {
            yield order_model_1.default.update({
                id: entity.id,
                customer_id: entity.customerId,
                total: entity.total(),
                items: entity.items.map((item) => ({
                    id: item.id,
                    name: item.name,
                    price: item.price,
                    product_id: item.productId,
                    quantity: item.quantity
                })),
            }, {
                where: {
                    id: entity.id
                },
            });
        });
    }
    find(id) {
        return __awaiter(this, void 0, void 0, function* () {
            let orderModel = yield order_model_1.default.findOne({ where: { id }, include: ["items"] });
            let items = orderModel.items.map((item) => new order_item_1.default(item.id, item.name, item.price, item.product_id, item.quantity));
            let order = new order_1.default(orderModel.id, orderModel.customer_id, items);
            return order;
        });
    }
    findAll() {
        return __awaiter(this, void 0, void 0, function* () {
            let ordersModel = yield order_model_1.default.findAll({ include: ["items"] });
            return ordersModel.map((orderModel) => {
                let items = orderModel.items.map((item) => new order_item_1.default(item.id, item.name, item.price, item.product_id, item.quantity));
                let order = new order_1.default(orderModel.id, orderModel.customer_id, items);
                return order;
            });
        });
    }
}
exports.default = OrderRepository;
