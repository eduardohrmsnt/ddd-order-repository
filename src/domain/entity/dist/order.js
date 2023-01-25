"use strict";
exports.__esModule = true;
var Order = /** @class */ (function () {
    function Order(id, customerId, items) {
        this._id = id;
        this._customerId = customerId;
        this._items = items;
        this._total = this.total();
        this.validate();
    }
    Object.defineProperty(Order.prototype, "id", {
        get: function () {
            return this._id;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Order.prototype, "customerId", {
        get: function () {
            return this._customerId;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Order.prototype, "items", {
        get: function () {
            return this._items;
        },
        enumerable: false,
        configurable: true
    });
    Order.prototype.total = function () {
        return this._items.reduce(function (acc, item) { return acc + item.orderItemTotal(); }, 0);
    };
    Order.prototype.changeCustomer = function (customerId) {
        this._customerId = customerId;
    };
    Order.prototype.validate = function () {
        if (this._id.length === 0) {
            throw Error("Id is required");
        }
        if (this._customerId.length === 0) {
            throw Error("CustomerId is required");
        }
        if (this._items.length === 0) {
            throw Error("Items are required");
        }
        if (this._items.some(function (item) { return item.quantity <= 0; })) {
            throw Error("Quantity must be greater than 0");
        }
        return true;
    };
    return Order;
}());
exports["default"] = Order;
