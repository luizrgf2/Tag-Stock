import { TouchableOpacity, View, Text, StyleSheet, GestureResponderEvent, TextInput, NativeSyntheticEvent, TextInputChangeEventData} from "react-native";


interface InputProps{
    secureTextEntry?: boolean
    placeholder?:string
    onChange?: (event:NativeSyntheticEvent<TextInputChangeEventData>)=>void
}


const style = StyleSheet.create({
    input: {
        marginTop:20,
        width:"80%",
        height: 40,
        backgroundColor: 'rgba(255, 255, 255, 0.3)',
        borderRadius: 8,
        paddingLeft: 10,
        color: 'white',
    },
})

export function Input(props:InputProps){
    return (
        <TextInput 
            secureTextEntry = {props.secureTextEntry}
            onChange={props.onChange}
            placeholderTextColor="white"
            placeholder={props.placeholder}
            style={style.input}
        ></TextInput>
    )
}