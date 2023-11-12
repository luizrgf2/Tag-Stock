import axios from "axios"
import { Either, Left, Right } from "../interfaces/either"

interface InputAuthAPI {
    email: string,
    pass: string
}

interface OutpuAuthAPI {
    token: string
}

export class AuthAPI {

    async exec(input: InputAuthAPI): Promise<Either<ErrorHTTPInterface, OutpuAuthAPI>> {
        const url = `${process.env.EXPO_PUBLIC_URL_BACKEND_END}/auth/login`

        
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