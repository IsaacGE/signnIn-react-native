import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import home from "./home";
import login from "./login";
import register from "./register";
import about from "./about";
import consult from "./consult";


const Stack = createNativeStackNavigator();

function navigator(){
    return(
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="login" component={login}/>
                <Stack.Screen name="home" component={home}/>
                <Stack.Screen name="register" component={register}/>
                <Stack.Screen name="consult" component={consult}/>
                <Stack.Screen name="about" component={about}/>
            </Stack.Navigator>
        </NavigationContainer>
    );
}
export default navigator;





