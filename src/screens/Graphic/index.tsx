import { RouteProp, useRoute } from '@react-navigation/native';
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, SafeAreaView, ScrollView, Alert } from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { AppStackParamList } from '../../navigation/interface';
import axios from 'axios';
import TemperatureChart from './temperatureChart';
import HumidityChart from './humidityChart';
import FlowrateChart from './flowrateChart';
import Styles from './style';

type GraphicRouteProp = RouteProp<AppStackParamList, 'Graficos'>;

const Graphic = () => {
  const route = useRoute<GraphicRouteProp>();
  const { id } = route.params;
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [isStartDatePickerVisible, setStartDatePickerVisible] = useState(false);
  const [isEndDatePickerVisible, setEndDatePickerVisible] = useState(false);

  const showStartDatePicker = () => setStartDatePickerVisible(true);
  const hideStartDatePicker = () => setStartDatePickerVisible(false);
  const handleStartDateConfirm = (date: Date) => {
    setStartDate(date);
    hideStartDatePicker();
  };

  const showEndDatePicker = () => setEndDatePickerVisible(true);
  const hideEndDatePicker = () => setEndDatePickerVisible(false);
  const handleEndDateConfirm = (date: Date) => {
    setEndDate(date);
    hideEndDatePicker();
  };

  const handleSearch = async () => {
    try {
      if (!startDate || !endDate) {
        Alert.alert('Por favor, selecione as datas de início e término.');
        return;
      }

      // Formatar as datas para o formato YYYY-MM-DD
      const formattedStartDate = startDate.toISOString().split('T')[0];
      const formattedEndDate = endDate.toISOString().split('T')[0];

      const apiUrl = `http://192.168.3.8:8080/getDataSensor?idgreenhouse=1&start_date=${formattedStartDate}&end_date=${formattedEndDate}`;
      const response = await axios.get(apiUrl);

    } catch (error: any) {
      Alert.alert('Erro na requisição:', error.message);
    }
  };

  return (
    <SafeAreaView style={Styles.container}>
    <View style={Styles.container}>
      <View style={Styles.date}>
        <View style={Styles.dateContainer}>
          <Text style={Styles.label}>Data Início</Text>
          <TouchableOpacity onPress={showStartDatePicker} style={Styles.datePickerButton}>
            <Text style={Styles.datePickerButtonText}>
              {startDate ? startDate.toLocaleDateString('en-GB') : 'Selecionar Data de Início'}
            </Text>
          </TouchableOpacity>
          <DateTimePickerModal
            isVisible={isStartDatePickerVisible}
            mode="date"
            onConfirm={handleStartDateConfirm}
            onCancel={hideStartDatePicker}
          />
        </View>

        <View style={Styles.dateContainer}>
          <Text style={Styles.label}>Data Final</Text>
          <TouchableOpacity onPress={showEndDatePicker} style={Styles.datePickerButton}>
            <Text style={Styles.datePickerButtonText}>
              {endDate ? endDate.toLocaleDateString('en-GB') : 'Selecionar Data de Término'}
            </Text>
          </TouchableOpacity>
          <DateTimePickerModal
            isVisible={isEndDatePickerVisible}
            mode="date"
            onConfirm={handleEndDateConfirm}
            onCancel={hideEndDatePicker}
          />
        </View>

        <TouchableOpacity onPress={handleSearch} style={Styles.searchButton}>
          <Image
              source={require('../../assets/images/lupa.png')}
              style={{ width: 40, height: 40 }}
            />
        </TouchableOpacity>
      </View>

        <ScrollView showsVerticalScrollIndicator={false}>
          <TemperatureChart startDate={startDate} endDate={endDate} />
          <HumidityChart startDate={startDate} endDate={endDate} />
          <FlowrateChart startDate={startDate} endDate={endDate} />
        </ScrollView>
      </View>
    </SafeAreaView>

  );
};



export default Graphic;
