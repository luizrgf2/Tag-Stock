import { View , SafeAreaView, StatusBar, Text, Alert, FlatList} from "react-native";
import NfcManager, {NfcEvents, NfcTech, TagEvent, NfcAdapter} from 'react-native-nfc-manager';
import {styles} from "./style"
import Toast from "react-native-toast-message"
import { useState } from "react";
import { AntDesign } from '@expo/vector-icons';
import { primaryColor } from "../../src/utils/colors";
import { HeaderComponent } from "../../src/components/header";
import { XLSXController } from "./rules/readXLSX";
import { CreateProducts } from "./rules/createProducts";
import { findOneProductWithIdAPI } from "../../src/api/findOneProductWithId";
import { ProductInterface } from "../../src/interfaces/product";
import { UpdateAmountOfProductAPI } from "../../src/api/updateAmountOfProducts";

const enableNFCScan = async ()=>{
    console.log("Enabled NFC...")
    await NfcManager.requestTechnology(NfcTech.MifareClassic);
}
const disableNFCScan = async ()=>{await NfcManager.cancelTechnologyRequest()}

async function readTAG(addTag:(tag:TagEvent)=>void) {
    NfcManager.setEventListener(NfcEvents.DiscoverTag, (tag:TagEvent) => {

        if(tag.id){


            addTag(tag)
        }else{
            Toast.show({
                type:"error",
                text1:"Erro para registrar a tag!",
                visibilityTime:1000
            })
        }
    })

    await NfcManager.registerTagEvent()

}

async function stopReadTag(){
    NfcManager.setEventListener(NfcEvents.DiscoverTag, null)
    await NfcManager.registerTagEvent()
    await NfcManager.cancelTechnologyRequest()
}


function TagIsEmptyComponent(){
    return(
        <View style={styles.containerTagsIsEmpty}>
            <AntDesign name="tags" size={200} color="white" />
            <Text style={{color:"white", fontSize:16}}>As tags lidas serão listadas aqui ..</Text>
        </View>
    )
}


export default function HomePage(){


    const [productsState,setProductsState] = useState<ProductInterface[]>([])
    const [loadUploadState, setLoadUploadState] = useState(false)
    const [loadUpdateAmountState, setLoadUpdateAmountState] = useState(false)



    async function addTag(tag:TagEvent){
        const existsTag = productsState.filter(item=>item.id === tag.id)
        

        if(existsTag.length > 0) return
    

        let idProduct = 0

        if(tag.ndefMessage.length > 0){
            const bytes = tag.ndefMessage[0].payload;
            let data = String.fromCharCode.apply(null, bytes);
            data  = data.replace(/[^0-9]/g, '');

            idProduct = Number(data)
            
        }


        if(isNaN(idProduct)) {
            return  Toast.show({
                type:"error",
                text1:"Tag RFID inválida!",
                visibilityTime:1000
            })
        }

        await handleFindOneProductWithId(idProduct)
    }

    async function handleTagReader(enabled:boolean){
        if(enabled === true){
            await readTAG(addTag)
        }else if(enabled === false){
            await stopReadTag()
        }
    }

    async function handleCreateProducts() {

        setLoadUploadState(true)

        const productsOrError =await  XLSXController.readFile()
        if(productsOrError.left) {
            const message = Array.isArray(productsOrError.left.message) ? productsOrError.left.message.join(" ") : productsOrError.left.message
            setLoadUploadState(false)
            return Toast.show({
                type:"error",
                text1:"Erro para abrir o xlsx",
                text2:message,
                visibilityTime:1000
            })
        }

        const createProductsOrError = await CreateProducts.exec(productsOrError.right)
        if(createProductsOrError.left) {
            const message = Array.isArray(createProductsOrError.left.message) ? createProductsOrError.left.message.join(" ") : createProductsOrError.left.message
            setLoadUploadState(false)
            return Toast.show({
                type:"error",
                text1:"Erro para criar os produtos",
                text2:message,
                visibilityTime:1000
            })
        }

        if(createProductsOrError.right.errors.length > 0) {
            const errors = createProductsOrError.right.errors.map(item=>`${item.description} : ${item.error}`).join("\n")
            Toast.show({
                type:"error",
                text1:"Errors de criação",
                text2:errors,
                visibilityTime:1000
            })
        }else if(createProductsOrError.left){
            Toast.show({
                type:"info",
                text1:"Sucesso",
                text2: "Nenhum erro na criação dos produtos!",
                visibilityTime:1000
            })
        }

        setLoadUploadState(false)

    }

    async function handleFindOneProductWithId(id: number) {
        const api = new findOneProductWithIdAPI()

        const res = await api.exec({
            id: id
        })

        if(res.left) {
            const message = Array.isArray(res.left.message) ? res.left.message.join(" ") : res.left.message
            return Toast.show({
                type:"error",
                text1:message,
                visibilityTime:1000
            })
        }   

        Toast.show({
            type:"info",
            text1:"Produto registrado!",
            visibilityTime:1000
        })

        setProductsState(state=>[...state, {
            amount: res.right.product.amount,
            branch: res.right.product.branch,
            createdAt: res.right.product.createdAt,
            description: res.right.product.description,
            id: res.right.product.id,
            shelf: res.right.product.shelf,
            supervisor: res.right.product.supervisor,
            updatedAt: res.right.product.updatedAt,
        }])

    }

    async function handleUpdateAmountOfProducts() {
        const api = new UpdateAmountOfProductAPI()
        const productsToDeleteInList: ProductInterface[] = []
        setLoadUpdateAmountState(true)

        for(const product of productsState) {

            const res = await api.exec({
                amountToSubstract: 1,
                branch: product.branch,
                description: product.description,
                shelf: product.shelf,
                supervisor: product.supervisor
            })

            if(res.left) {
                Toast.show({
                    type:"error",
                    text1:`Erro para atualizar a quantidade do produto ${product.description}`,
                    visibilityTime: 2000
                })
                continue;
            }
            productsToDeleteInList.push(product)

        }
        Toast.show({
            type:"info",
            text1:`Sucesso!`,
            visibilityTime: 2000
        })

        const productsToRemoveFilteres = productsState.filter(item=> !productsToDeleteInList.includes(item))
        setProductsState(productsToRemoveFilteres)
        setLoadUpdateAmountState(false)

    }

    return (
        <>
        <SafeAreaView style={styles.container}>
            <StatusBar backgroundColor={primaryColor}></StatusBar>

            <HeaderComponent
                handleTagReader={handleTagReader}
                handleFileXlsx={()=>handleCreateProducts()}
                loadState = {loadUploadState}
                updateAmountOfProducts={handleUpdateAmountOfProducts}
                loadUpdateAmountOfProducts={loadUpdateAmountState}
            ></HeaderComponent>

            <View style={styles.containerProducts}>
                {productsState.length === 0 ? <TagIsEmptyComponent></TagIsEmptyComponent> : (
                    <FlatList
                        data={productsState}
                        renderItem={(product)=>(
                            <View style={styles.product}>
                                <Text style={{color:"white",fontWeight:"bold", fontSize:15}}>ID Produto: </Text>
                                <Text style={{color:"white"}}>{product.item.id}</Text>
                                <Text style={{color:"white",fontWeight:"bold", fontSize:15}}>Descrição: </Text>
                                <Text style={{color:"white"}}>{product.item.description}</Text>
                                <Text style={{color:"white",fontWeight:"bold", fontSize:15}}>Quantidade: </Text>
                                <Text style={{color:"white"}}>{product.item.amount}</Text>
                            </View>
                        )}
                        keyExtractor={item=>item.id}
                        style={{width:"100%",}}
                    ></FlatList>
                )}
            </View>
            <Toast></Toast>

        </SafeAreaView>
        </>
    )
}