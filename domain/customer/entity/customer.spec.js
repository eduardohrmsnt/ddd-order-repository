"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const address_1 = __importDefault(require("../value-object/address"));
const customer_1 = __importDefault(require("./customer"));
describe("Customer unit tests", () => {
    it("should get 1 as result", () => {
        const result = 1;
        expect(result).toBe(1);
    });
    it("should throw error when id is empty", () => {
        expect(() => {
            let customer = new customer_1.default("", "John");
        }).toThrowError("Id is Required");
    });
    it("should throw error when name is empty", () => {
        expect(() => {
            let customer = new customer_1.default("123", "");
        }).toThrowError("Name is Required");
    });
    it("should change name", () => {
        //Arrange
        const customer = new customer_1.default("123", "John");
        //Act
        customer.changeName("Jane");
        //Assert
        expect(customer.name).toBe("Jane");
    });
    it("should activate customer", () => {
        //Arrange
        const customer = new customer_1.default("123", "John");
        const address = new address_1.default("Rua 3 de Janeiro", 277, "89128000", "Luiz Alves");
        customer.changeAddress(address);
        customer.activate();
        //Assert
        expect(customer.isActive()).toBe(true);
    });
    it("should deactivate customer", () => {
        //Arrange
        const customer = new customer_1.default("123", "John");
        customer.deactivate();
        //Assert
        expect(customer.isActive()).toBe(false);
    });
    it("should add reward points", () => {
        //Arrange
        const customer = new customer_1.default("123", "John");
        expect(customer.rewardPoints).toBe(0);
        customer.addRewardPoints(10);
        //Assert
        expect(customer.rewardPoints).toBe(10);
        customer.addRewardPoints(10);
        //Assert
        expect(customer.rewardPoints).toBe(20);
    });
    it("should show error when address is undefined when you activate a customer", () => {
        expect(() => {
            const customer = new customer_1.default("123", "John");
            customer.activate();
        }).toThrowError("Address is mandatory to activate a customer");
    });
});
