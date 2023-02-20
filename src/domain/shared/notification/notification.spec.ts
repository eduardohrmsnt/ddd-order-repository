import Notification from "./notification";

describe("Unit test for notification", () => {
    it("should create errors", () =>{
        const notification = new Notification();

        const error = {
            message: "Error message",
            context: "Customer"
        }


        notification.addError(error);

        expect(notification.messages("Customer")).toBe("Customer: Error message,");

        
        const error2 = {
            message: "Error message2",
            context: "Customer"
        }

        notification.addError(error2);

        expect(notification.messages("Customer")).toBe("Customer: Error message,Customer: Error message2,")

        const error3 = {
            message: "Error message3",
            context: "Order"
        }

        notification.addError(error3);

        expect(notification.messages("Customer")).toBe("Customer: Error message,Customer: Error message2,")
    
        
        expect(notification.messages()).toBe("Customer: Error message,Customer: Error message2,Order: Error message3,")
    
    })

    it("Should check if notification has at least one error", () => {
        const notification = new Notification();

        const error = {
            message: "Error message",
            context: "Customer"
        }

        notification.addError(error);

        expect(notification.hasErrors()).toBe(true);
    });

    it("Should get all errors props", () => { 
        const notification = new Notification();

        const error = {
            message: "Error message",
            context: "Customer"
        }

        notification.addError(error);

        expect(notification.getErrors()).toHaveLength(1);
    })
})