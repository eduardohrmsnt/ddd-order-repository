import Address from "../../domain/entity/address";
import Customer from "../../domain/entity/customer";
import CustomerRepositoryInterface from "../../domain/repository/customer-repository-inteface";
import CustomerModel from "../db/sequelize/model/customer.model";

export default class CustomerRepository implements CustomerRepositoryInterface{
    async create(entity: Customer): Promise<void>{
        await CustomerModel.create({
            id: entity.id,
            name: entity.name,
            active: entity.isActive(),
            city: entity.address.city,
            rewardPoints: entity.rewardPoints,
            street: entity.address.street,
            number: entity.address.number,
            zipcode: entity.address.zip,

        })
    }
    async update(entity: Customer): Promise<void>{
        await CustomerModel.update({
            name: entity.name,
            active: entity.isActive(),
            city: entity.address.city,
            rewardPoints: entity.rewardPoints,
            street: entity.address.street,
            number: entity.address.number,
            zipcode: entity.address.zip,
        },
        {
            where: {
                id: entity.id
            }
        })
    }
    async find(id: string): Promise<Customer>{
        let customerModel;
        
        try{
            customerModel = await CustomerModel.findOne({ where: { id }, rejectOnEmpty: true});
        } catch(error){
            throw new Error("Customer not found");
        }

        const customer = new Customer(id, customerModel.name);
        customer.addRewardPoints(customerModel.rewardPoints);
        const address = new Address(
            customerModel.street,
            customerModel.number,
            customerModel.zipcode,
            customerModel.city
        )

        customer.changeAddress(address);
        return customer;
    }

    async findAll(): Promise<Customer[]>{
       const customerModels = await CustomerModel.findAll();
       return customerModels.map((customerModels) => 
        {
            let customer = new Customer(customerModels.id, customerModels.name);
            customer.addRewardPoints(customerModels.rewardPoints);
            let address = new Address(
                customerModels.street,
                customerModels.number,
                customerModels.zipcode,
                customerModels.city
            )
            
            customer.changeAddress(address);
            if(customerModels.active)
            {
                customer.activate();
            }

            return customer;
        }
       )
    }

}