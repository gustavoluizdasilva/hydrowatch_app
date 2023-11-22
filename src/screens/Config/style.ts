import { StyleSheet } from "react-native";

const Styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
      backgroundColor: '#F0F0F0',
      alignItems: 'center',
      alignContent: 'center',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#4CAF50',
        marginVertical: 10,
    },
    inputGroup: {
        width: '90%',
    },
    input: {
        width: '100%',
        height: 40,
        borderWidth: 2,
        borderColor: 'black',
        borderRadius: 5,
        padding: 10,
        marginBottom: 10,
        color: 'black',
    },
});

export default Styles
