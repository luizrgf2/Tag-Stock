import { useState } from "react"
import { TouchableOpacity, View, StyleSheet, Text, ActivityIndicator } from "react-native"
import { primaryColor } from "../utils/colors"
import AntDesign from "@expo/vector-icons/build/AntDesign"
import { MaterialCommunityIcons } from "@expo/vector-icons"


const style = StyleSheet.create({
    header:{
        paddingRight:10,
        flexDirection: "row",
        justifyContent:"flex-end",
        alignItems:"flex-end",
        width:"100%",
        height:70,
        backgroundColor:primaryColor
    },
})

interface headerProps{
    handleTagReader:(enabled:boolean)=>void
    handleFileXlsx: ()=>void
    updateAmountOfProducts: ()=>void,
    loadUpdateAmountOfProducts: boolean,
    loadState: boolean
}

export function HeaderComponent({handleTagReader, handleFileXlsx, loadState, updateAmountOfProducts, loadUpdateAmountOfProducts}:headerProps){

    const [tagReaderEnable,setTagReaderEnable,] = useState(false)



    return (
        <View style={style.header}>


            <TouchableOpacity
                onPress={()=>{
                    updateAmountOfProducts()
                }}
                >
                <View
                    style={{justifyContent:"center", alignItems:"center", marginRight: 20}}
                >
                    {
                        loadUpdateAmountOfProducts 
                        ?
                            <ActivityIndicator size="large" color="#0000ff" />
                        :
                            <MaterialCommunityIcons name="update" size={35} color="white" />
                        

                    }
                    <Text style={{color:"white"}}>Estoque</Text>
                </View>
            </TouchableOpacity>

            <TouchableOpacity
                onPress={()=>{
                    handleFileXlsx()
                }}
                >
                <View
                    style={{justifyContent:"center", alignItems:"center", marginRight: 20}}
                >
                    {
                        loadState 
                            ?
                                <ActivityIndicator size="large" color="#0000ff" />
                            :
                                <AntDesign name="addfile" size={35} color="white" />

                    }
                    <Text style={{color:"white"}}>XLSX</Text>
                </View>
            </TouchableOpacity>

            <TouchableOpacity
                onPress={()=>{
                    const anabled = !tagReaderEnable
                    setTagReaderEnable(anabled)
                    handleTagReader(anabled)
                }}
                >
                {tagReaderEnable ? 
                    <View
                        style={{justifyContent:"center", alignItems:"center"}}
                    >
                        <AntDesign name="tags" size={40} color="white" />
                        <Text style={{color:"white"}}>Parar</Text>
                    </View>
                    
                : 
                <View
                    style={{justifyContent:"center", alignItems:"center"}}
                >
                    <AntDesign name="tagso" size={40} color="white" />
                    <Text style={{color:"white"}}>Ler</Text>
                </View>
            }
                
            </TouchableOpacity>
        </View>
    )
}