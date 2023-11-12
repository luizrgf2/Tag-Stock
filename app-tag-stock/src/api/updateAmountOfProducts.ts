import axios from "axios";
import { Either, Left, Right } from "../interfaces/either";
import { ProductInterface } from "../interfaces/product";
import { LocalStorage } from "../utils/localStorage";

export interface InputUpdateAmountOfProducts {
    branch: number;
    description: string;
    shelf: string;
    supervisor: number;
    amountToSubstract: number;
}


export class UpdateAmountOfProductAPI {

    async exec(input: InputUpdateAmountOfProducts): Promise<Either<ErrorHTTPInterface, void>> {
        const url = `${process.env.EXPO_PUBLIC_URL_BACKEND_END}/product/updateamount`

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

            return Right.create(undefined)
        }catch(e:any) {
            const data = e.response.data as ErrorHTTPInterface
            return Left.create(data)            
        }

    }

}