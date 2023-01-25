import Address from "./address";
import Customer from "./customer";
import Order from "./order";
import OrderItem from "./order_item";

describe("Order unit tests", () => {


    it("should throw error when id is empty", () =>{

        expect(() => {
            let order = new Order("","123", []);
            
        }).toThrowError("Id is required");

    })

    it("should throw error when customerId is empty", () =>{

        expect(() => {
            let order = new Order("1","", []);
            
        }).toThrowError("CustomerId is required");

    })

    it("should throw error when customerId is empty", () =>{

        expect(() => {
            let order = new Order("1","123", []);
            
        }).toThrowError("Items are required");

    })

    it("should throw error when customerId is empty", () =>{

        const item = new OrderItem("1", "Full Cycle", 10, "1", 1);
        const item1 = new OrderItem("2", "Full Cycle", 10, "2", 2);
        const item2 = new OrderItem("3", "Full Cycle", 10, "3", 2);
        const order = new Order("1","123", [item, item1, item2]);
        expect(order.total()).toBe(50);

    })



});