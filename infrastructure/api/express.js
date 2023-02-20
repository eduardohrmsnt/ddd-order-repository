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
exports.sequelize = exports.app = void 0;
const express_1 = __importDefault(require("express"));
const sequelize_typescript_1 = require("sequelize-typescript");
const customer_model_1 = __importDefault(require("../customer/repository/sequelize/customer.model"));
const customer_route_1 = require("./routes/customer.route");
exports.app = (0, express_1.default)();
exports.app.use(express_1.default.json());
exports.app.use("/customer", customer_route_1.customerRoute);
function setupDb() {
    return __awaiter(this, void 0, void 0, function* () {
        exports.sequelize = new sequelize_typescript_1.Sequelize({
            dialect: 'sqlite',
            storage: ':memory:',
            logging: false
        });
        yield exports.sequelize.addModels([customer_model_1.default]);
        yield exports.sequelize.sync();
    });
}
setupDb();
