import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:"center",
        alignItems:"center",
        backgroundColor:"#000000"
    },
    logoImage: {
        width:230,
        height:230,
        borderRadius:70
    },
    containerProducts:{
        flex:1,
        width:"100%",
        alignItems:"center"
    },
    containerTagsIsEmpty:{
        justifyContent:"center",
        alignItems:"center",
        marginTop:"50%"
    },
    product:{
        justifyContent:"center",
        alignItems:"center",
        padding:10,
        marginTop:10,
        borderRadius:10,
        width:"100%",
        height:150,
        backgroundColor:"#121212",
    }
})