import xlsx from "node-xlsx"
import * as fs from "expo-file-system"
import * as Doc from "expo-document-picker"
import { ProductInterface } from "../../../src/interfaces/product"
import { Either, Left, Right } from "../../../src/interfaces/either"
import {Buffer} from 'buffer'

export class XLSXController {
    static async parseXLSX(xlsxFile: Buffer): Promise<Either<Error,ProductInterface[]>> {
        const xlsxParsed = xlsx.parse(xlsxFile, {
            type: "buffer"
        })

        let data = xlsxParsed[0].data
        const header: string[] = data[0]
        data = data.slice(1,data.length)


        if(header[0] !== "FILIAL") return Left.create(new Error("Erro planilha não está no formato correto!"))
        if(header[1] !== "PRODUTO") return Left.create(new Error("Erro planilha não está no formato correto!"))
        if(header[2] !== "DESCRIÇÃO PRODUTO") return Left.create(new Error("Erro planilha não está no formato correto!"))
        if(header[3] !== "PRATELEIRA 1") return Left.create(new Error("Erro planilha não está no formato correto!"))
        if(header[4] !== "FISCAL") return Left.create(new Error("Erro planilha não está no formato correto!"))
        if(header[5] !== "QUANTIDADE") return Left.create(new Error("Erro planilha não está no formato correto!"))



        const dataConverted = data.map(item=>({
            branch: item[0],
            description: item[2],
            shelf: item[3],
            supervisor: item[4],
            amount: Number(item[5]),
            createdAt: new Date(),
            updatedAt: new Date()
        } as ProductInterface))

        return Right.create(dataConverted)

    }

    static async readFile(): Promise<Either<Error,ProductInterface[]>>{
        
        const doc = await Doc.getDocumentAsync({
            type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
            multiple: false
        })
        
        if(doc.assets) {
            const file = doc.assets[0]
            const fileURI = file.uri

            const fileOpen = await fs.readAsStringAsync(fileURI,{
                encoding: fs.EncodingType.Base64
            })

            const fileBuffer =  Buffer.from(fileOpen, 'base64');

            const productsOrError = await XLSXController.parseXLSX(fileBuffer)


            if(productsOrError.left) return Left.create(productsOrError.left)
            
            return Right.create(productsOrError.right)
        }

        return Left.create(new Error("Erro para abrir a planilha!"))

    }
}