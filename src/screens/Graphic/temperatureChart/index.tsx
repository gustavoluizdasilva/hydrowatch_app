import React, { useEffect, useState } from 'react';
import { View, Text, Alert } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import axios from 'axios';
import Styles from './styles';


interface TemperatureChartProps {
  startDate: Date | null;
  endDate: Date | null;
}

const TemperatureChart: React.FC<TemperatureChartProps> = ({ startDate, endDate }) => {
    const [data, setData] = useState<SensorData[]>([]);


  useEffect(() => {
    fetchData();
  }, [startDate, endDate]);

  const fetchData = async () => {
    try {
      if (!startDate || !endDate) {
        return;
      }

      // Formatar as datas para o formato YYYY-MM-DD
      const formattedStartDate = startDate.toISOString().split('T')[0];
      const formattedEndDate = endDate.toISOString().split('T')[0];

      const apiUrl = `http://192.168.3.8:8080/getDataSensor?idgreenhouse=1&start_date=${formattedStartDate}&end_date=${formattedEndDate}`;
      const response = await axios.get(apiUrl);
      setData(response.data);
    } catch (error: any) {
      Alert.alert('Erro na requisição:', error.message);
    }
  };

  return (
    <View style={Styles.container}>
      <Text style={Styles.title}>Gráfico de Temperatura</Text>
      {data.length > 0 ? (
        <LineChart
          data={{
            labels: data.map((item) => new Date(item._id).getDate().toString()), // Ajuste aqui
            datasets: [{ data: data.map((item) => item.avgTemperature) }],
          }}
          width={400}
          height={200}
          yAxisSuffix="°C"
          chartConfig={{
            backgroundColor: '#FFFFFF',
            backgroundGradientFrom: '#FFFFFF',
            backgroundGradientTo: '#FFFFFF',
            decimalPlaces: 1,
            color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
            style: {
              borderRadius: 16,
            },
            propsForDots: {
              r: '6',
              strokeWidth: '2',
              stroke: '#5DCB61',
            },
          }}
          bezier
        />
      ) : (
        <Text style={{color: 'black'}}>Nenhum dado disponível</Text>
      )}
    </View>
  );
}

export default TemperatureChart
