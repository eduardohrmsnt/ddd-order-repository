import Address from "./address";
import Customer from "./customer";
import Order from "./order";
import OrderItem from "./order_item";
import Product from "./product";

describe("Product unit tests", () => {

    it("Should throw error when id is empty", () =>{
        expect(() =>{
            let product = new Product("", "Product 1", 100);
        }).toThrowError("Id is required");
    })

    it("Should throw error when name is empty", () =>{
        expect(() =>{
            let product = new Product("123", "", 100);
        }).toThrowError("Name is required");
    })

    
    it("Should throw error when price is less then 0", () =>{
        expect(() =>{
            let product = new Product("123", "13131", -1);
        }).toThrowError("Price must be greater than zero");
    })

    it("Should change name", () =>{

        let product = new Product("123", "13131", 10);
        product.changeName("Product 2");
        expect(product.name).toBe("Product 2");
    })

    it("Should change price", () =>{

        let product = new Product("123", "13131", 10);
        product.changePrice(100);
        expect(product.price).toBe(100);
    })

});