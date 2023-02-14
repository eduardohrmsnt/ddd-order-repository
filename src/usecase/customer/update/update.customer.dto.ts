export interface InputUpdateCustomerDto{
    id: string,
    name: string,
    address: { 
        zip: string,
        street: string,
        number: number,
        city: string
    }
}

export interface OutputUpdateCustomerDto{
    id: string,
    name: string,
    address: { 
        zip: string,
        street: string,
        number: number,
        city: string
    }
}