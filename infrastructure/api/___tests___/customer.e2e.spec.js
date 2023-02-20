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
const express_1 = require("../express");
const supertest_1 = __importDefault(require("supertest"));
describe("E2E test for customer", () => {
    beforeEach(() => __awaiter(void 0, void 0, void 0, function* () {
        yield express_1.sequelize.sync({ force: true });
    }));
    afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
        yield express_1.sequelize.close();
    }));
    it("should create a customer", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(express_1.app)
            .post("/customer")
            .send({
            name: "John",
            address: {
                street: "Rua 3 de Janeiro",
                city: "Luiz Alves",
                number: 305,
                zip: "89128000"
            },
        });
        expect(response.status).toBe(200);
        expect(response.body.name).toBe("John");
        expect(response.body.address.city).toBe("Luiz Alves");
        expect(response.body.address.street).toBe("Rua 3 de Janeiro");
        expect(response.body.address.zip).toBe("89128000");
        expect(response.body.address.number).toBe(305);
    }));
    it("should not create a customer", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(express_1.app)
            .post("/customer")
            .send({
            name: "",
            address: {
                street: "Rua 3 de Janeiro",
                city: "Luiz Alves",
                number: 305,
                zip: "89128000"
            },
        });
        expect(response.status).toBe(500);
    }));
    it("should list all customers", () => __awaiter(void 0, void 0, void 0, function* () {
        const customer1 = {
            name: "J0hn",
            address: {
                street: "Rua 3 de Janeiro",
                city: "Luiz Alves",
                number: 305,
                zip: "89128000"
            },
        };
        const response = yield (0, supertest_1.default)(express_1.app)
            .post("/customer")
            .send(customer1);
        expect(response.status).toBe(200);
        const customer2 = {
            name: "Jahn",
            address: {
                street: "Rua 3 de Janeiro",
                city: "Luiz Alves",
                number: 305,
                zip: "89128000"
            },
        };
        const response2 = yield (0, supertest_1.default)(express_1.app)
            .post("/customer")
            .send(customer2);
        expect(response2.status).toBe(200);
        const listResponse = yield (0, supertest_1.default)(express_1.app)
            .get("/customer").send();
        expect(listResponse.status).toBe(200);
        expect(listResponse.body.customers.length).toBe(2);
        expect(customer1.name).toEqual(listResponse.body.customers[0].name);
        expect(customer2.name).toEqual(listResponse.body.customers[1].name);
    }));
});
