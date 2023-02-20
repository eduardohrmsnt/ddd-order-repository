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
const address_1 = __importDefault(require("../../../domain/customer/value-object/address"));
class UpdateCustomerUseCase {
    constructor(customerRepository) {
        this.customerRepository = customerRepository;
    }
    execute(input) {
        return __awaiter(this, void 0, void 0, function* () {
            const customer = yield this.customerRepository.find(input.id);
            customer.changeName(input.name);
            customer.changeAddress(new address_1.default(input.address.street, input.address.number, input.address.zip, input.address.city));
            yield this.customerRepository.update(customer);
            return {
                id: customer.id,
                name: customer.name,
                address: {
                    city: customer.address.city,
                    street: customer.address.street,
                    zip: customer.address.zip,
                    number: customer.address.number
                }
            };
        });
    }
}
exports.default = UpdateCustomerUseCase;
