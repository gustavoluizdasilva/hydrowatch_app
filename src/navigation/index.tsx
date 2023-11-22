import React from "react"
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { AppStackParamList } from "./interface";
import GreenHouseConfig from "../screens/Config";
import Home from "../screens/Home";
import Graphic from "../screens/Graphic";



const Stack = createNativeStackNavigator<AppStackParamList>()

const AppNavigator = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Hydrowatch" component={Home}/>
            <Stack.Screen name="Cadastro" component={GreenHouseConfig}/>
            <Stack.Screen name="Graficos" component={Graphic}/>
        </Stack.Navigator>
    )
}

export default AppNavigator
