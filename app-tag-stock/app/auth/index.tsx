import { View, Text , Image, KeyboardAvoidingView, SafeAreaView, StatusBar, Alert} from "react-native";
import {styles} from "./style"
import { router } from "expo-router";
import { CustomButton } from "../../src/components/button";
import { Input } from "../../src/components/input";
import { AuthAPI } from "../../src/api/auth";
import { useState } from "react";
import { LocalStorage } from "../../src/utils/localStorage";

export default function AuthPage(){

    const [emailState, setEmailState] = useState("")
    const [passwordState, setPasswordState] = useState("")


    async function handleLogin(){
        const api = new AuthAPI()
        const res = await api.exec({email: emailState, pass: passwordState})

        if(res.left) {
            const message = Array.isArray(res.left.message) ? res.left.message.join(". ") : res.left.message 
            return Alert.alert("Login Error", message)
        }

        const {token} = res.right

        const saveSessionOrError = await LocalStorage.saveTokenSession(token);

        if(saveSessionOrError.left) {
            return Alert.alert("Session Error", saveSessionOrError.left.message)
        }

        router.replace("/home/")
    }


    return(
        <KeyboardAvoidingView style={styles.container} behavior="padding">
            <StatusBar backgroundColor="black" barStyle="light-content"></StatusBar>
            <Image
                style={styles.logoImage}
                source={require("../../assets/tag-stock.png")}
            ></Image>

            <Input
                onChange={(event)=>{setEmailState(event.nativeEvent.text)}}
                placeholder="E-mail"
            ></Input>

            <Input
                secureTextEntry = {true}
                onChange={(event)=>{setPasswordState(event.nativeEvent.text)}}
                placeholder="Senha"
            ></Input>

            <CustomButton
                onPress={()=>{handleLogin()}}
            >
                ENTRAR
            </CustomButton>
            
        </KeyboardAvoidingView>
    )
}