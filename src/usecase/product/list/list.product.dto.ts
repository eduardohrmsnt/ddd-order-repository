export interface InputListProductDto {

}

export interface OutputListProductDto{
    products: Product[]
}

export class Product {
    id: string;
    name: string;
    price: number;
}