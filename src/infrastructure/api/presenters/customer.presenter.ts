import { toXML } from "jstoxml";
import { OutputListCustomerDto } from "../../../usecase/customer/list/list.costumer.dto";

export default class CustomerPresenter {
    static toXML(data: OutputListCustomerDto): string {
        const xmlOptions = {
            header: true,
            ident: "    ",
            newline: "\n",
            allowEmpty: true
        };

        return toXML({
            customer: data.customers.map((customer) => ({
                id: customer.id,
                name: customer.name,
                address: {
                    city: customer.address.city,
                    number: customer.address.number,
                    street: customer.address.street,
                    zip: customer.address.zip
                }
                })
                )},
            xmlOptions
        )
    }
}