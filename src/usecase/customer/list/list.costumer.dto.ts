
type Customer = {
    id: string;
    name: string;
    address: {
        city: string;
        number: number;
        zip: string;
        street: string;
    }
}

export interface InputListCustomerDto{

}

export interface OutputListCustomerDto{
    customers: Customer[]
}