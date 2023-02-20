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
exports.customerRoute = void 0;
const express_1 = __importDefault(require("express"));
const create_customer_usecase_1 = __importDefault(require("../../../usecase/customer/create/create.customer.usecase"));
const list_customer_usecase_1 = __importDefault(require("../../../usecase/customer/list/list.customer.usecase"));
const customer_repository_1 = __importDefault(require("../../customer/repository/sequelize/customer.repository"));
exports.customerRoute = express_1.default.Router();
exports.customerRoute.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const usecase = new create_customer_usecase_1.default(new customer_repository_1.default());
    try {
        const customerDto = {
            name: req.body.name,
            address: {
                street: req.body.address.street,
                city: req.body.address.city,
                number: req.body.address.number,
                zip: req.body.address.zip
            }
        };
        const output = yield usecase.execute(customerDto);
        res.send(output);
    }
    catch (err) {
        res.status(500).send(err);
    }
}));
exports.customerRoute.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const usecase = new list_customer_usecase_1.default(new customer_repository_1.default());
    try {
        const output = yield usecase.execute({});
        res.send(output);
    }
    catch (err) {
        res.status(500).send(err);
    }
}));
