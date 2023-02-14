import { Sequelize } from "sequelize-typescript";
import Order from "../../../../domain/checkout/entity/order";
import OrderItem from "../../../../domain/checkout/entity/order_item";
import Customer from "../../../../domain/customer/entity/customer";
import Address from "../../../../domain/customer/value-object/address";
import Product from "../../../../domain/product/entity/product";
import CustomerModel from "../../../customer/repository/sequelize/customer.model";
import CustomerRepository from "../../../customer/repository/sequelize/customer.repository";
import ProductModel from "../../../product/repository/sequelize/product.model";
import ProductRepository from "../../../product/repository/sequelize/product.repository";
import OrderItemModel from "./order-item.model";
import OrderModel from "./order.model";
import OrderRepository from "./order.repository";


describe("Order repository test", () => {
    let sequilize: Sequelize;

    beforeEach(async () => {
        jest.setTimeout(60000);
        sequilize = new Sequelize({
            dialect: 'sqlite',
            storage: ':memory',
            logging: false,
            sync: { force: true },
        });

        await sequilize.addModels([CustomerModel, OrderModel, OrderItemModel, ProductModel])
        await sequilize.sync();
    })

    afterEach(async () => {
        await sequilize.drop();
        await sequilize.close();
    });

    it("Should create a new order", async () => {
        const customerRepository = new CustomerRepository();
        const customer = new Customer("1", "John Lennon");
        const address = new Address("Rua 3 de Janeiro", 277, "89128000", "Luiz Alves");
        customer.changeAddress(address);
        await customerRepository.create(customer);

        const productRepository = new ProductRepository();
        const product = new Product("1", "Product 1", 10);
        await productRepository.create(product);

        const orderRepository = new OrderRepository();
        const orderItem = new OrderItem("1", product.name, product.price, product.id, 2);
        const order = new Order("1", customer.id, [orderItem]);

        await orderRepository.create(order);

        const orderModel = await OrderModel.findOne({ where: { id: order.id }, include: ["items"] });

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
        })
    })

    it("Should update an order", async () => {
        const customerRepository = new CustomerRepository();
        const customer = new Customer("1", "John Lennon");
        const address = new Address("Rua 3 de Janeiro", 277, "89128000", "Luiz Alves");
        customer.changeAddress(address);
        await customerRepository.create(customer);

        const customer2 = new Customer("123", "John Lennon");
        const address2 = new Address("Rua 3 de Janeiro", 277, "89128000", "Luiz Alves");
        customer2.changeAddress(address2);
        await customerRepository.create(customer2);

        const productRepository = new ProductRepository();
        const product = new Product("1", "Product 1", 10);
        await productRepository.create(product);

        const orderRepository = new OrderRepository();
        const orderItem = new OrderItem("1", product.name, product.price, product.id, 2);
        const order = new Order("1", customer.id, [orderItem]);

        await orderRepository.create(order);

        const orderModel = await OrderModel.findOne({ where: { id: order.id }, include: ["items"] });

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
        })

        order.changeCustomer(customer2.id);

        await orderRepository.update(order);

        const orderModel2 = await OrderModel.findOne({ where: { id: order.id }, include: ["items"] });

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
        })
    })

    it("Should find an order", async () => {
        const customerRepository = new CustomerRepository();
        const customer = new Customer("1", "John Lennon");
        const address = new Address("Rua 3 de Janeiro", 277, "89128000", "Luiz Alves");
        customer.changeAddress(address);
        await customerRepository.create(customer);

        const productRepository = new ProductRepository();
        const product = new Product("1", "Product 1", 10);
        await productRepository.create(product);

        const orderRepository = new OrderRepository();
        const orderItem = new OrderItem("1", product.name, product.price, product.id, 2);
        const order = new Order("1", customer.id, [orderItem]);

        await orderRepository.create(order);

        const order2 = await orderRepository.find(order.id);

        expect(order).toEqual(order2)
    })

    it("Should find all orders", async () => {
        const customerRepository = new CustomerRepository();
        const customer = new Customer("1", "John Lennon");
        const address = new Address("Rua 3 de Janeiro", 277, "89128000", "Luiz Alves");
        customer.changeAddress(address);
        await customerRepository.create(customer);

        const productRepository = new ProductRepository();
        const product = new Product("1", "Product 1", 10);
        await productRepository.create(product);

        const orderRepository = new OrderRepository();
        const orderItem = new OrderItem("1", product.name, product.price, product.id, 2);
        const order = new Order("1", customer.id, [orderItem]);

        await orderRepository.create(order);

        const orderItem2 = new OrderItem("2", product.name, product.price, product.id, 2);
        const order2 = new Order("2", customer.id, [orderItem2]);

        await orderRepository.create(order2);

        const orders = await orderRepository.findAll();

        expect(orders).toHaveLength(2)
        expect(orders).toContainEqual(order)
        expect(orders).toContainEqual(order2)
    })

})