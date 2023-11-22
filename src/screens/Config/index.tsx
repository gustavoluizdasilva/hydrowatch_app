import React, { useState, useEffect } from "react"
import { Alert, Button, Text, TextInput, View } from "react-native"
import Styles from "./style";
import InputGroup from "./components/inputGroup/InputGroup";
import { RouteProp } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import axios from "axios";
import { useNavigation } from '@react-navigation/native';
import { AppNavigationProp } from "../../navigation/interface";

type RootStackParamList = {
  Cadastro: { id: string };
};

type ConfigScreenRouteProp = RouteProp<RootStackParamList, 'Cadastro'>; // Corrigi o nome para 'Cadastro'
type ConfigScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Cadastro'>; // Corrigi o nome para 'Cadastro'

interface ConfigProps {
  route: ConfigScreenRouteProp;
  navigation: ConfigScreenNavigationProp;
}

const GreenHouseConfig: React.FC<ConfigProps> = ({ route }) => {
    const { id } = route.params || { id: '' };
    const [dados, setDados] = useState<IEstufaCfg | null>(null);
    const navigation = useNavigation<AppNavigationProp>()

    const [estufa, setEstufa] = useState<string>('');
    const [cultivar, setCultivar] = useState<string>('');
    const [flowrateMaxima, setflowrateMaxima] = useState<string>('');
    const [flowrateMinima, setflowrateMinima] = useState<string>('');
    const [temperatureMaxima, settemperatureMaxima] = useState<string>('');
    const [temperatureMinima, settemperatureMinima] = useState<string>('');
    const [humidityMaxima, sethumidityMaxima] = useState<string>('');
    const [humidityMinima, sethumidityMinima] = useState<string>('');

    const [isFocusedID, setFocusID] = useState(false);
    const [isFocusedC, setFocusC] = useState(false);

    const handleCadastro = async () => {
      const url = 'http://192.168.3.8:8080/save-greenhouse';
      const fullUrl = id ? `${url}/${id}` : url;
      const data = {
        greenhouse: estufa,
        cultivar: cultivar,
        idsensor: 1,
        temperature: {
          min: parseFloat(temperatureMinima),
          max: parseFloat(temperatureMaxima),
        },
        humidity: {
          min: parseFloat(humidityMinima),
          max: parseFloat(humidityMaxima),
        },
        flowrate: {
          min: parseFloat(flowrateMinima),
          max: parseFloat(flowrateMaxima),
        },
      };

      const method = id ? 'PUT' : 'POST';

      try {
        const response = await fetch(fullUrl, {
          method: method,
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        });

        if (response.ok) {
          navigation.navigate("Hydrowatch");
        } else {
          const errorMessage = `Erro ao salvar dados: ${response.status}`;
          Alert.alert('Erro: ', errorMessage);
          console.error(errorMessage);
        }
      } catch (error: any) {
        const errorMessage = 'Erro na requisição: ' + error.message;
        Alert.alert('Erro: ', errorMessage);
        console.error(errorMessage);
      }
    };

    useEffect(() => {
      if (id) {
      const fetchData = async () => {
        try {
          const response = await axios.get(`http://192.168.3.8:8080/getByIDGreenHouseConfig?id=${id}`);
          setDados(response.data);
          setEstufa(response.data?.greenhouse ?? '');
          setCultivar(response.data?.cultivar ?? '');  // Certifique-se de alterar para o nome correto se necessário
          settemperatureMaxima(response.data?.temperature.max?.toString() ?? '');
          settemperatureMinima(response.data?.temperature.min?.toString() ?? '');
          sethumidityMaxima(response.data?.humidity.max?.toString() ?? '');
          sethumidityMinima(response.data?.humidity.min?.toString() ?? '');
          setflowrateMaxima(response.data?.flowrate.max?.toString() ?? '');
          setflowrateMinima(response.data?.flowrate.min?.toString() ?? '');
        } catch (error) {
          console.error('Erro ao obter dados:', error);
        }
      };

      fetchData();
      }
    }, [id]);


    return (
    <View style={Styles.container}>
        <Text style={Styles.title}>Estufa</Text>

        <View style={Styles.inputGroup}>
        <TextInput style={[Styles.input, { borderColor: isFocusedID ? '#6C9F77' : 'black' }]}
          onFocus={() => setFocusID(true)}
          onBlur={() => setFocusID(false)}
          maxLength={60}
          value={estufa}
          onChangeText={(text) => setEstufa(text || '')}
          placeholder="Identificação da Estufa"
          placeholderTextColor="black"/>

        <TextInput style={[Styles.input, { borderColor: isFocusedC ? '#6C9F77' : 'black' }]}
          onFocus={() => setFocusC(true)}
          onBlur={() => setFocusC(false)}
          maxLength={40}
          value={cultivar}
          onChangeText={setCultivar}
          placeholder="Cultivar"
          placeholderTextColor="black"/>
        </View>

        <InputGroup titleGroup="Vazão de Água (L/m)" min={flowrateMinima} onMinChange={setflowrateMinima} max={flowrateMaxima} onMaxChange={setflowrateMaxima}></InputGroup>
        <InputGroup titleGroup="Temperatura (°C)" min={temperatureMinima} onMinChange={settemperatureMinima} max={temperatureMaxima} onMaxChange={settemperatureMaxima}></InputGroup>
        <InputGroup titleGroup="Umidade (%)" min={humidityMinima} onMinChange={sethumidityMinima} max={humidityMaxima} onMaxChange={sethumidityMaxima}></InputGroup>

        <Button title="CADASTRAR" color="#4CAF50" onPress={() => {handleCadastro()}} />
    </View>
    );
}

export default GreenHouseConfig
