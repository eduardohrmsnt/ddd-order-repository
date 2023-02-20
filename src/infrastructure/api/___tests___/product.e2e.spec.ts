import { app, sequelize} from '../express';
import request from 'supertest';

describe("E2E test for product", () => {
    beforeEach(async () => {
        await sequelize.sync({force: true});
    })

    afterAll(async() => {
        await sequelize.close();
    })

    it("should create a product", async() => {
        const response = await request(app)
            .post("/product")
            .send({
                name: "Produto barato",
                price: 10
            })

            expect(response.status).toBe(200);
            expect(response.body.name).toBe("Produto barato")
            expect(response.body.price).toBe(10)
    })

    it("should not create a customer", async() => {
        const response = await request(app)
            .post("/product")
            .send({
                name: "",
                product: -10
            })

            expect(response.status).toBe(500);
    })

    it("should list all customers", async() => {

        const product1 ={
            name: "Produto Barato",
            price: 10
        }

        const response = await request(app)
        .post("/product")
        .send(product1)

        expect(response.status).toBe(200);

        const product2 ={
            name: "Produto Caro",
            price: 100
            
        }
        const response2 = await request(app)
        .post("/product")
        .send(product2)

        expect(response2.status).toBe(200);

        const listResponse = await request(app)
            .get("/product").send();

        expect(listResponse.status).toBe(200);
        expect(listResponse.body.products.length).toBe(2);
        expect(product1.name).toEqual(listResponse.body.products[0].name);
        expect(product2.name).toEqual(listResponse.body.products[1].name);
    })
})