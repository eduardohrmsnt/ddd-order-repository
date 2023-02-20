"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Order {
    constructor(id, customerId, items) {
        this._id = id;
        this._customerId = customerId;
        this._items = items;
        this._total = this.total();
        this.validate();
    }
    get id() {
        return this._id;
    }
    get customerId() {
        return this._customerId;
    }
    get items() {
        return this._items;
    }
    total() {
        return this._items.reduce((acc, item) => acc + item.orderItemTotal(), 0);
    }
    changeCustomer(customerId) {
        this._customerId = customerId;
    }
    validate() {
        if (this._id.length === 0) {
            throw Error("Id is required");
        }
        if (this._customerId.length === 0) {
            throw Error("CustomerId is required");
        }
        if (this._items.length === 0) {
            throw Error("Items are required");
        }
        if (this._items.some(item => item.quantity <= 0)) {
            throw Error("Quantity must be greater than 0");
        }
        return true;
    }
}
exports.default = Order;
