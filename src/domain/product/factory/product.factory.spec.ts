import ProductFactory from "./product.factory";

describe("Product factory unit test", () => {

    it("Should create a product type A", () =>{ 

        const product = ProductFactory.create("Product A", 1);
        expect(product.id).toBeDefined();
        expect(product.name).toBe("Product A");
        expect(product.price).toBe(1);
    })

    it("Should create a product type B", () =>{ 

        const product = ProductFactory.create("Product B", 2);
        expect(product.id).toBeDefined();
        expect(product.name).toBe("Product B");
        expect(product.price).toBe(2);
    })

})