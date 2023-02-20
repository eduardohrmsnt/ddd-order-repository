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
const sequelize_typescript_1 = require("sequelize-typescript");
const order_1 = __importDefault(require("../../../../domain/checkout/entity/order"));
const order_item_1 = __importDefault(require("../../../../domain/checkout/entity/order_item"));
const customer_1 = __importDefault(require("../../../../domain/customer/entity/customer"));
const address_1 = __importDefault(require("../../../../domain/customer/value-object/address"));
const product_1 = __importDefault(require("../../../../domain/product/entity/product"));
const customer_model_1 = __importDefault(require("../../../customer/repository/sequelize/customer.model"));
const customer_repository_1 = __importDefault(require("../../../customer/repository/sequelize/customer.repository"));
const product_model_1 = __importDefault(require("../../../product/repository/sequelize/product.model"));
const product_repository_1 = __importDefault(require("../../../product/repository/sequelize/product.repository"));
const order_item_model_1 = __importDefault(require("./order-item.model"));
const order_model_1 = __importDefault(require("./order.model"));
const order_repository_1 = __importDefault(require("./order.repository"));
describe("Order repository test", () => {
    let sequilize;
    beforeEach(() => __awaiter(void 0, void 0, void 0, function* () {
        jest.setTimeout(60000);
        sequilize = new sequelize_typescript_1.Sequelize({
            dialect: 'sqlite',
            storage: ':memory:',
            logging: false,
            sync: { force: true },
        });
        yield sequilize.addModels([customer_model_1.default, order_model_1.default, order_item_model_1.default, product_model_1.default]);
        yield sequilize.sync();
    }));
    afterEach(() => __awaiter(void 0, void 0, void 0, function* () {
        yield sequilize.drop();
        yield sequilize.close();
    }));
    it("Should create a new order", () => __awaiter(void 0, void 0, void 0, function* () {
        const customerRepository = new customer_repository_1.default();
        const customer = new customer_1.default("1", "John Lennon");
        const address = new address_1.default("Rua 3 de Janeiro", 277, "89128000", "Luiz Alves");
        customer.changeAddress(address);
        yield customerRepository.create(customer);
        const productRepository = new product_repository_1.default();
        const product = new product_1.default("1", "Product 1", 10);
        yield productRepository.create(product);
        const orderRepository = new order_repository_1.default();
        const orderItem = new order_item_1.default("1", product.name, product.price, product.id, 2);
        const order = new order_1.default("1", customer.id, [orderItem]);
        yield orderRepository.create(order);
        const orderModel = yield order_model_1.default.findOne({ where: { id: order.id }, include: ["items"] });
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
    }));
    it("Should update an order", () => __awaiter(void 0, void 0, void 0, function* () {
        const customerRepository = new customer_repository_1.default();
        const customer = new customer_1.default("1", "John Lennon");
        const address = new address_1.default("Rua 3 de Janeiro", 277, "89128000", "Luiz Alves");
        customer.changeAddress(address);
        yield customerRepository.create(customer);
        const customer2 = new customer_1.default("123", "John Lennon");
        const address2 = new address_1.default("Rua 3 de Janeiro", 277, "89128000", "Luiz Alves");
        customer2.changeAddress(address2);
        yield customerRepository.create(customer2);
        const productRepository = new product_repository_1.default();
        const product = new product_1.default("1", "Product 1", 10);
        yield productRepository.create(product);
        const orderRepository = new order_repository_1.default();
        const orderItem = new order_item_1.default("1", product.name, product.price, product.id, 2);
        const order = new order_1.default("1", customer.id, [orderItem]);
        yield orderRepository.create(order);
        const orderModel = yield order_model_1.default.findOne({ where: { id: order.id }, include: ["items"] });
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
        yield orderRepository.update(order);
        const orderModel2 = yield order_model_1.default.findOne({ where: { id: order.id }, include: ["items"] });
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
    }));
    it("Should find an order", () => __awaiter(void 0, void 0, void 0, function* () {
        const customerRepository = new customer_repository_1.default();
        const customer = new customer_1.default("1", "John Lennon");
        const address = new address_1.default("Rua 3 de Janeiro", 277, "89128000", "Luiz Alves");
        customer.changeAddress(address);
        yield customerRepository.create(customer);
        const productRepository = new product_repository_1.default();
        const product = new product_1.default("1", "Product 1", 10);
        yield productRepository.create(product);
        const orderRepository = new order_repository_1.default();
        const orderItem = new order_item_1.default("1", product.name, product.price, product.id, 2);
        const order = new order_1.default("1", customer.id, [orderItem]);
        yield orderRepository.create(order);
        const order2 = yield orderRepository.find(order.id);
        expect(order).toEqual(order2);
    }));
    it("Should find all orders", () => __awaiter(void 0, void 0, void 0, function* () {
        const customerRepository = new customer_repository_1.default();
        const customer = new customer_1.default("1", "John Lennon");
        const address = new address_1.default("Rua 3 de Janeiro", 277, "89128000", "Luiz Alves");
        customer.changeAddress(address);
        yield customerRepository.create(customer);
        const productRepository = new product_repository_1.default();
        const product = new product_1.default("1", "Product 1", 10);
        yield productRepository.create(product);
        const orderRepository = new order_repository_1.default();
        const orderItem = new order_item_1.default("1", product.name, product.price, product.id, 2);
        const order = new order_1.default("1", customer.id, [orderItem]);
        yield orderRepository.create(order);
        const orderItem2 = new order_item_1.default("2", product.name, product.price, product.id, 2);
        const order2 = new order_1.default("2", customer.id, [orderItem2]);
        yield orderRepository.create(order2);
        const orders = yield orderRepository.findAll();
        expect(orders).toHaveLength(2);
        expect(orders).toContainEqual(order);
        expect(orders).toContainEqual(order2);
    }));
});
