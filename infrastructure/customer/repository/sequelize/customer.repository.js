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
const customer_1 = __importDefault(require("../../../../domain/customer/entity/customer"));
const address_1 = __importDefault(require("../../../../domain/customer/value-object/address"));
const customer_model_1 = __importDefault(require("./customer.model"));
class CustomerRepository {
    create(entity) {
        return __awaiter(this, void 0, void 0, function* () {
            yield customer_model_1.default.create({
                id: entity.id,
                name: entity.name,
                active: entity.isActive(),
                city: entity.address.city,
                rewardPoints: entity.rewardPoints,
                street: entity.address.street,
                number: entity.address.number,
                zipcode: entity.address.zip,
            });
        });
    }
    update(entity) {
        return __awaiter(this, void 0, void 0, function* () {
            yield customer_model_1.default.update({
                name: entity.name,
                active: entity.isActive(),
                city: entity.address.city,
                rewardPoints: entity.rewardPoints,
                street: entity.address.street,
                number: entity.address.number,
                zipcode: entity.address.zip,
            }, {
                where: {
                    id: entity.id
                }
            });
        });
    }
    find(id) {
        return __awaiter(this, void 0, void 0, function* () {
            let customerModel;
            try {
                customerModel = yield customer_model_1.default.findOne({ where: { id }, rejectOnEmpty: true });
            }
            catch (error) {
                throw new Error("Customer not found");
            }
            const customer = new customer_1.default(id, customerModel.name);
            customer.addRewardPoints(customerModel.rewardPoints);
            const address = new address_1.default(customerModel.street, customerModel.number, customerModel.zipcode, customerModel.city);
            customer.changeAddress(address);
            return customer;
        });
    }
    findAll() {
        return __awaiter(this, void 0, void 0, function* () {
            const customerModels = yield customer_model_1.default.findAll();
            return customerModels.map((customerModels) => {
                let customer = new customer_1.default(customerModels.id, customerModels.name);
                customer.addRewardPoints(customerModels.rewardPoints);
                let address = new address_1.default(customerModels.street, customerModels.number, customerModels.zipcode, customerModels.city);
                customer.changeAddress(address);
                if (customerModels.active) {
                    customer.activate();
                }
                return customer;
            });
        });
    }
}
exports.default = CustomerRepository;
