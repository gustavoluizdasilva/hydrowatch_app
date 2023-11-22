import { StyleSheet } from 'react-native';

const Styles = StyleSheet.create({
    container:{
        flex: 1,
        paddingHorizontal: 0,
        backgroundColor: 'white'
    },
    date: {
      flexDirection: 'row',
      paddingTop: 20,
      paddingHorizontal: 20,
      justifyContent: 'space-between',
      alignItems: 'center',
      height: 90
    },
    dateContainer: {
      flex: 1,
      marginRight: 10,
    },
    label: {
      fontSize: 16,
      color: '#000000',
      marginBottom: 5,
    },
    datePickerButton: {
      padding: 10,
      backgroundColor: '#DDDDDD',
      flex: 1,
      borderRadius: 5,
      borderColor: 'black',
      borderWidth: 2,
    },
    datePickerButtonText: {
      color: '#000000',
    },
    searchButton: {
      backgroundColor: '#DDDDDD',
      padding: 10,
      borderColor: 'black',
      borderWidth: 2,
      borderRadius: 5,
      marginTop: 10,
    },
    searchButtonText: {
      color: '#ffffff',
      fontSize: 16,
    },
  });

export default Styles;
