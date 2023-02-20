import { app, sequelize} from '../express';
import request from 'supertest';

describe("E2E test for customer", () => {
    beforeEach(async () => {
        await sequelize.sync({force: true});
    })

    afterAll(async() => {
        await sequelize.close();
    })

    it("should create a customer", async() => {
        const response = await request(app)
            .post("/customer")
            .send({
                name: "John",
                address: {
                    street: "Rua 3 de Janeiro",
                    city: "Luiz Alves",
                    number: 305,
                    zip: "89128000"
                },
            })

            expect(response.status).toBe(200);
            expect(response.body.name).toBe("John")
            expect(response.body.address.city).toBe("Luiz Alves")
            expect(response.body.address.street).toBe("Rua 3 de Janeiro")
            expect(response.body.address.zip).toBe("89128000")
            expect(response.body.address.number).toBe(305)
    })

    it("should not create a customer", async() => {
        const response = await request(app)
            .post("/customer")
            .send({
                name: "",
                address: {
                    street: "Rua 3 de Janeiro",
                    city: "Luiz Alves",
                    number: 305,
                    zip: "89128000"
                },
            })

            expect(response.status).toBe(500);
    })

    it("should list all customers", async() => {

        const customer1 ={
            name: "J0hn",
            address: {
                street: "Rua 3 de Janeiro",
                city: "Luiz Alves",
                number: 305,
                zip: "89128000"
            },
        }

        const response = await request(app)
        .post("/customer")
        .send(customer1)

        expect(response.status).toBe(200);

        const customer2 ={
            name: "Jahn",
            address: {
                street: "Rua 3 de Janeiro",
                city: "Luiz Alves",
                number: 305,
                zip: "89128000"
            },
        }
        const response2 = await request(app)
        .post("/customer")
        .send(customer2)

        expect(response2.status).toBe(200);

        const listResponse = await request(app)
            .get("/customer").send();

        expect(listResponse.status).toBe(200);
        expect(listResponse.body.customers.length).toBe(2);
        expect(customer1.name).toEqual(listResponse.body.customers[0].name);
        expect(customer2.name).toEqual(listResponse.body.customers[1].name);

        const listResponseXML = await request(app)
        .get("/customer")
        .set("Accept", "application/xml")
        .send();

        expect(listResponseXML.status).toBe(200);
        expect(listResponseXML.text).toContain(`<?xml version="1.0" encoding="UTF-8"?>`);
    })
})