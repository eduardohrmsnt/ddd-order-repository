import Customer from "../../../domain/customer/entity/customer";
import CustomerRepositoryInterface from "../../../domain/customer/repository/customer-repository-inteface"
import { OutputFindCustomerDto } from "../find/find.customer.dto";
import { InputListCustomerDto, OutputListCustomerDto } from "./list.costumer.dto";

export default class ListCustomerUseCase{
    private customerRepository: CustomerRepositoryInterface

    constructor(customerRepository: CustomerRepositoryInterface){
        this.customerRepository = customerRepository;
    }

    async execute(input: InputListCustomerDto): Promise<OutputListCustomerDto>{
        const customers = await this.customerRepository.findAll();

        return OutputMapper.toOutput(customers);
    }
}

class OutputMapper{
    static toOutput(customer: Customer[]): OutputListCustomerDto{
        return{
            customers: customer.map((customer) => ({
                id: customer.id,
                name: customer.name,
                address: {
                    street: customer.address.street,
                    number: customer.address.number,
                    zip: customer.address.zip,
                    city: customer.address.city
                }
            }))
        }
    }
}