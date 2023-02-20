"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Product {
    constructor(id, name, price) {
        this._id = id;
        this._name = name;
        this._price = price;
        this.validate();
    }
    get id() {
        return this._id;
    }
    get name() {
        return this._name;
    }
    get price() {
        return this._price;
    }
    validate() {
        if (this._id.length === 0) {
            throw Error("Id is required");
        }
        if (this._name.length === 0) {
            throw Error("Name is required");
        }
        if (this._price < 0) {
            throw Error("Price must be greater than zero");
        }
    }
    changeName(name) {
        this._name = name;
        this.validate();
    }
    changePrice(price) {
        this._price = price;
        this.validate();
    }
}
exports.default = Product;
