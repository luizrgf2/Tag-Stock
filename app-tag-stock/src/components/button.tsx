import { TouchableOpacity, View, Text, StyleSheet, GestureResponderEvent} from "react-native";
import { primaryColor } from "../utils/colors";


interface ButtonProps{
    children:any,
    onPress: (event:GestureResponderEvent)=>void
}


const style = StyleSheet.create({
    button: {
        marginTop:20,
        borderRadius:10,
        color:"white",
        justifyContent:"center",
        alignItems:"center",
        width:150,
        height: 40,
        backgroundColor:primaryColor

    }
})

export function CustomButton(props:ButtonProps){
    return (
        <TouchableOpacity
            onPress={props.onPress}
            >
                <View  style={style.button}>
                    <Text style={{color:"white"}}>{props.children}</Text>
                </View>
        </TouchableOpacity>
    )
}