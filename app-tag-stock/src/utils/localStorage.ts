import AsyncStorage from '@react-native-async-storage/async-storage';
import { Either, Left, Right } from '../interfaces/either';


export class LocalStorage {
    static async saveTokenSession(token: string):Promise<Either<Error,void>> {
        try{
            await AsyncStorage.setItem("token",token)
            return Right.create(undefined)
        }catch(e) { 
            return Left.create(new Error("Erro para salvar a sessão do usuário!"))
        }
    }

    static async getTokenSession():Promise<Either<Error,string>> {
        try{
            const token = await AsyncStorage.getItem("token")
            
            if(!token) return Left.create(new Error("Não existe sessão!"))

            return Right.create(token)

        }catch(e) { 
            return Left.create(new Error("Erro para pegar a sessão do usuário!"))
        }
    }
}