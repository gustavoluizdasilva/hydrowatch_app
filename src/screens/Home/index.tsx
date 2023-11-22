import { useNavigation } from '@react-navigation/native';
import React, {useState, useEffect} from 'react';
import { View, Text, Pressable, SafeAreaView, ScrollView, TouchableOpacity, Image, Modal } from 'react-native';
import { AppNavigationProp } from '../../navigation/interface';
import Styles from './style';
import axios from 'axios';
import { BlurView } from '@react-native-community/blur';
import LinearGradient from 'react-native-linear-gradient';

interface DeleteConfirmationModalProps {
  isVisible: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

const DeleteConfirmationModal: React.FC<DeleteConfirmationModalProps> = ({ isVisible, onConfirm, onCancel }) => {
  return (
    <View style={Styles.centeredView}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={isVisible}
      >
      <BlurView
        style={Styles.absolute}
        blurType="light"
        blurAmount={5}
        reducedTransparencyFallbackColor="white" // Cor de fallback caso o efeito de embaçamento não seja suportado
      ></BlurView>
        <View style={Styles.centeredView}>
          <View style={Styles.modalView}>
            <Text style={Styles.modalText}>Deseja remover a estufa?</Text>

            <View style={Styles.containerBtn}>
              <Pressable style={Styles.buttonYes} onPress={onConfirm}>
                <Text style={Styles.text}>Sim</Text>
              </Pressable>
              <View style={Styles.space} />
              <Pressable style={Styles.buttonNo} onPress={onCancel}>
                <Text style={Styles.text}>Não</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const Home = () => {
  const navigation = useNavigation<AppNavigationProp>()
  const [estufas, setEstufa] = useState<Array<IEstufa> | null>(null);
  const [isDeleteModalVisible, setDeleteModalVisible] = useState(false);
  const [deletingId, setDeletingId] = useState('');

  const goToDetails = (id: string) => {
    navigation.navigate("Cadastro", { id: id })
  }

  const goToGraphics = (id: string) => {
    navigation.navigate("Graficos", { id: id })
  }

  const handleDelete = (id: string) => {
    // Mostrar o modal de confirmação antes de deletar
    setDeletingId(id);
    setDeleteModalVisible(true);
  };

  const handleConfirmDelete = () => {
    // Executar a exclusão se o usuário confirmar
    axios.delete(`http://192.168.3.8:8080/delete-greenhouse?id=${deletingId}`)
      .then((response) => {
        if (response.status === 200) {
          const updatedEstufas = estufas && estufas.filter(estufa => estufa.ID !== deletingId);
          setEstufa(updatedEstufas);
        } else {
          console.error('Erro ao excluir a estufa.');
        }
      })
      .catch((error) => {
        console.error('Erro:', error);
      })
      .finally(() => {
        // Fechar o modal, independentemente do resultado da exclusão
        setDeleteModalVisible(false);
        setDeletingId('');
      });
  };

  const handleCancelDelete = () => {
    setDeleteModalVisible(false);
    setDeletingId('');
  };

  useEffect(() => {
    const apiUrl = 'http://192.168.3.8:8080/getGreenHouses';

    axios.get(apiUrl)
      .then((response) => {
        setEstufa(response.data);
      })
      .catch((error) => {
        console.error('Error:', error);
      });

    const ws = new WebSocket('ws://192.168.3.8:8080/ws');

    ws.onopen = () => {
      console.log('Conexão estabelecida com sucesso!');
    };

    ws.onmessage = (event) => {
      const data: IData = JSON.parse(event.data);
      setEstufa((estufas) => {
        const new_estufas = estufas && estufas.map(estufa => {
          if (data.id_greenshouse == estufa.id_sensor) {
            return {
              ...estufa,
              temp: data.temperature,
              humi: data.humidity,
              flow: data.flowrate

            }
          } else {
            return estufa;
          }
        });
        return(new_estufas);
      })
    };

    ws.onerror = (error) => {
      console.log('Erro na conexão: ' + error.message);
    };

    ws.onclose = () => {
      console.log('Conexão fechada.');
    };

    return () => {
      ws.close();
    };
  }, []);

  return (
    <SafeAreaView style={Styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        { estufas && estufas.map(estufa => (
            <Pressable style={Styles.card} onPress={() => goToGraphics(estufa.ID)} key={estufa.ID}>
              <LinearGradient colors={['#5DCB61', '#DDF3E2']}
                style={{borderRadius: 12}}>
              <View style={Styles.containerTop}>
                <View style={Styles.titleInfo}>
                  <Text style={Styles.infoTitle}>Estufa: {estufa.greenhouse}</Text>
                  <Text style={Styles.infoTitle}>Cultivar: {estufa.cultivar}</Text>
                </View>
                <View>
                  <TouchableOpacity onPress={() => handleDelete(estufa.ID)}>
                      <Image
                        source={require('../../assets/images/lixeira.png')}
                        style={{ width: 40, height: 40 }}
                      />
                  </TouchableOpacity>
                  <DeleteConfirmationModal
                    isVisible={isDeleteModalVisible}
                    onConfirm={handleConfirmDelete}
                    onCancel={handleCancelDelete}
                  />
                  <TouchableOpacity onPress={() => goToDetails(estufa.ID)}>
                      <Image
                        source={require('../../assets/images/engrenagem.png')}
                        style={{ width: 40, height: 40 }}
                      />
                  </TouchableOpacity>
                </View>
              </View>
              <View style={Styles.horizontalContainer}>
                <View style={Styles.containerInfo}>
                  <Image
                      source={require('../../assets/images/termometro.png')}
                      style={{ width: 40, height: 40  }}
                    />
                  <Text style={Styles.infoData}>Temperatura</Text>
                  <Text style={Styles.infoValue}>{estufa.temp}°C</Text>
                </View>
                <View style={Styles.containerInfo}>
                  <Image
                      source={require('../../assets/images/umidade.png')}
                      style={{ width: 40, height: 40  }}
                    />
                  <Text style={Styles.infoData}>Umidade</Text>
                  <Text style={Styles.infoValue}>{estufa.humi}%</Text>
                </View>
                <View style={Styles.containerInfo}>
                <Image
                      source={require('../../assets/images/torneira.png')}
                      style={{ width: 40, height: 40  }}
                    />
                  <Text style={Styles.infoData}>Vazão de Água</Text>
                  <Text style={Styles.infoValue}>{estufa.flow} L/m</Text>
                </View>
              </View>
              </LinearGradient>
            </Pressable>

          ))
        }
      </ScrollView>
      <View>
      <TouchableOpacity onPress={() => goToDetails('')}style={{ alignItems: 'flex-end', marginBottom: 5, marginTop: 5 }}>
                    <Image
                      source={require('../../assets/images/mais.png')}
                      style={{ width: 60, height: 60 }}
                    />
                </TouchableOpacity>
      </View>
    </SafeAreaView>
 );
};

export default Home;
