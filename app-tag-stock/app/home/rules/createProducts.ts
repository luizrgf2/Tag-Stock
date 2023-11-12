import { CreateProductAPI } from "../../../src/api/createProducts";
import { Either, Right } from "../../../src/interfaces/either";
import { ProductInterface } from "../../../src/interfaces/product";


export interface CreateProductsErrors {
    errors: {
        description: string,
        error: string
    }[]
}

export class CreateProducts {
    static async exec(products: Omit<ProductInterface, "id" | "createdAt" | "updatedAt">[]): Promise<Either<Error, CreateProductsErrors>> {

        const api = new CreateProductAPI()

        const errors: CreateProductsErrors = {errors: []}

        for(const product of products) {
            const createProductOrError = await api.exec({
                amount: product.amount,
                branch: product.branch,
                description: product.description,
                shelf: product.shelf,
                supervisor: product.supervisor
            })

            if(createProductOrError.left) {
                const description = product.description
                const errorMessage = Array.isArray(createProductOrError.left.message) ? createProductOrError.left.message.join(" ") : createProductOrError.left.message

                errors.errors.push({
                    description: description,
                    error: errorMessage
                })
            }

            
        }
        return Right.create(errors)
    }
}