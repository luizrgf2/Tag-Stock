import axios from "axios";
import { Either, Left, Right } from "../interfaces/either";
import { ProductInterface } from "../interfaces/product";
import { LocalStorage } from "../utils/localStorage";
import { URL_BACKEND } from "./url";

export interface InputCreateProduct {
    branch: number;
    description: string;
    shelf: string;
    supervisor: number;
    amount: number;
}

export interface OutputCreateProduct {
    product: ProductInterface
}

export class CreateProductAPI {

    async exec(input: InputCreateProduct): Promise<Either<ErrorHTTPInterface, OutputCreateProduct>> {
        const url = `${URL_BACKEND}/product/create`

        const token = await LocalStorage.getTokenSession()

        if(token.left) return Left.create({
            message: "O token não é válido!",
            statusCode: 401
        })

        const authToken = `Bearer ${token.right}`

        
        try{
            const res = await axios.post(url, input, {
                headers: {
                    Authorization: authToken
                }
            })

            const data = res.data as OutputCreateProduct
            return Right.create(data)
        }catch(e:any) {
            const data = e.response.data as ErrorHTTPInterface
            return Left.create(data)            
        }

    }

}