import axios from "axios"
import { Either, Left, Right } from "../interfaces/either"
import { URL_BACKEND } from "./url"

interface InputAuthAPI {
    email: string,
    pass: string
}

interface OutpuAuthAPI {
    token: string
}

export class AuthAPI {

    async exec(input: InputAuthAPI): Promise<Either<ErrorHTTPInterface, OutpuAuthAPI>> {
        const url = `${URL_BACKEND}/auth/login`

        
        try{
            const res = await axios.post(url, input)

            const data = res.data as OutpuAuthAPI
            return Right.create(data)
        }catch(e:any) {
            const data = e.response.data as ErrorHTTPInterface
            return Left.create(data)            
        }

    }

}