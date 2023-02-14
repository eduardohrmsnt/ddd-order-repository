
import Customer from "../../customer/entity/customer";
import Order from "../entity/order";
import OrderItem from "../entity/order_item";
import OrderService from "./order.service";

describe("Order service unit tests", () =>{

    it("should place an order", () => {
        const customer = new Customer("1", "Eduardo Hermes");
        const item1 = new OrderItem("1", "item1", 10, "1", 1);

        const order = OrderService.placeOrder(customer, [item1]);

        expect(customer.rewardPoints).toBe(5);
        expect(order.total()).toBe(10);
    });

    it("Should get total of all orders", () => {
        const orderItem1 = new OrderItem("1", "Item", 10, "1", 3);
        const orderItem2 = new OrderItem("2", "Item2", 10, "1", 2);
        const order1 = new Order("123", "1", [orderItem1]);
        const order2 = new Order("123", "1", [orderItem2]);

        const total = OrderService.total([order1, order2]);

        expect(total).toBe(50);
    });
})