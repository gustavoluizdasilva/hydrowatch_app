import { StyleSheet } from 'react-native';

const Styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 25,
     },
     card: {
      borderColor: 'black',
      borderWidth: 3,
      borderRadius: 15,
      marginTop: 15,
      marginBottom: 5
     },
     titleInfo: {
      marginTop: 10,
      marginLeft: 25,
     },
     horizontalContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around'
     },
     containerInfo: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
        marginBottom: 10
     },
     infoTitle: {
        fontSize: 19,
        fontWeight: 'bold',
        color: 'black',
     },
     infoData: {
      fontSize: 15,
      fontWeight: 'bold',
      color: 'black',
   },
     infoValue: {
        fontSize: 20,
        color: 'black',
     },
     addButton: {
      flex: 1,
      justifyContent: 'flex-end',
      alignItems: 'flex-end',
      padding: 10,
     },
     addButtonText: {
        fontSize: 20,
        color: 'black'
     },
     linearGradient: {
         borderWidth: 3,
        borderRadius: 15,
        marginTop: 15,
        marginBottom: 5
    },
    centeredView: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 22,
    },
    modalView: {
      margin: 20,
      backgroundColor: 'white',
      borderRadius: 20,
      padding: 35,
      alignItems: 'center',
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5,
    },
    buttonContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      width: '60%',
      marginTop: 15,
    },
    modalText: {
      marginBottom: 15,
      textAlign: 'center',
      color: 'black',
      fontSize: 20,
    },
    absolute: {
      position: 'absolute',
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
    },
    containerBtn: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
    },
    buttonYes: {
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: 12,
      paddingHorizontal: 32,
      borderRadius: 4,
      elevation: 3,
      backgroundColor: '#219B4A',
    },
    buttonNo: {
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: 12,
      paddingHorizontal: 32,
      borderRadius: 4,
      elevation: 3,
      backgroundColor: '#E41F1F',
    },
    text: {
      fontSize: 16,
      lineHeight: 21,
      fontWeight: 'bold',
      letterSpacing: 0.25,
      color: 'white',
    },
    space: {
      width: 20,
    },
    containerTop: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginRight: 10,
      marginTop: 10
    },
});

export default Styles
