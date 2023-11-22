import { StyleSheet } from "react-native";

const Styles = StyleSheet.create({
    field: {
      width: '100%',
      marginVertical: 10,
    },
    label: {
      fontSize: 18,
      fontWeight: 'bold',
      color: '#4CAF50',
      marginBottom: 5,
    },
    inputGroup: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    input: {
      width: '45%',
      height: 40,
      borderWidth: 2,
      borderColor: 'black',
      borderRadius: 5,
      padding: 10,
      color: 'black',
    },
});

export default Styles
