import axios from "axios";
import { Either, Left, Right } from "../interfaces/either";
import { LocalStorage } from "../utils/localStorage";
import { ProductInterface } from "../interfaces/product";
import { URL_BACKEND } from "./url";

export interface InpuFindOneProductWithId {
    id: number
}

export interface OutputFindOneProductWithId  {
    product: ProductInterface;
  }

export class findOneProductWithIdAPI {

    async exec(input: InpuFindOneProductWithId): Promise<Either<ErrorHTTPInterface, OutputFindOneProductWithId>> {
        const url = `${URL_BACKEND}/product/find/`+String(input.id)

        const token = await LocalStorage.getTokenSession()

        if(token.left) return Left.create({
            message: "O token não é válido!",
            statusCode: 401
        })

        const authToken = `Bearer ${token.right}`

        
        try{
            const res = await axios.get(url, {
                headers: {
                    Authorization: authToken
                }
            })

            const data = res.data as OutputFindOneProductWithId

            return Right.create(data)
        }catch(e:any) {
            const data = e.response.data as ErrorHTTPInterface
            return Left.create(data)            
        }

    }

}