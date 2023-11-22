import { NativeStackNavigationProp } from "@react-navigation/native-stack"

export type AppStackParamList = {
    Hydrowatch: undefined,
    Cadastro: {id: string},
    Graficos: {id: string},
}

export type AppNavigationProp = NativeStackNavigationProp<AppStackParamList>
