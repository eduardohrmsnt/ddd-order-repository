import Address from "./address";
import Customer from "./customer";

describe("Customer unit tests", () => {
    it("should get 1 as result", () => {
        const result = 1;
        expect(result).toBe(1);
    })

    it("should throw error when id is empty", () =>{
        expect(() =>{
            let customer = new Customer("", "John");
        }).toThrowError("Id is Required")
    })

    it("should throw error when name is empty", () =>{
        expect(() =>{
            let customer = new Customer("123", "");
        }).toThrowError("Name is Required")
    })

    it("should change name", () =>{
        //Arrange
        const customer = new Customer("123", "John");

        //Act
        customer.changeName("Jane");

        //Assert
        expect(
            customer.name
        ).toBe("Jane")
    })

    it("should activate customer", () =>{
        //Arrange
        const customer = new Customer("123", "John");
         const address= new Address("Rua 3 de Janeiro", 277, "89128000", "Luiz Alves")

         customer.changeAddress(address);

         customer.activate();
        //Assert
        expect(
            customer.isActive()
        ).toBe(true)
    })

    it("should deactivate customer", () =>{
        //Arrange
        const customer = new Customer("123", "John");

         customer.deactivate();
        //Assert
        expect(
            customer.isActive()
        ).toBe(false)
    })

    it("should add reward points", () =>{
        //Arrange
        const customer = new Customer("123", "John");

        expect(customer.rewardPoints).toBe(0);

         customer.addRewardPoints(10);
        //Assert
        expect(customer.rewardPoints).toBe(10);

        
        customer.addRewardPoints(10);
        //Assert
        expect(customer.rewardPoints).toBe(20);
    })


    it("should show error when address is undefined when you activate a customer", () =>{

        expect(() =>{
            const customer = new Customer("123", "John");
            customer.activate();
        }).toThrowError("Address is mandatory to activate a customer")
    })

});