import { StyleSheet } from "react-native";
import Constants from "expo-constants";

export default StyleSheet.create({
    container: {
      flex: 1,
      paddingTop: Constants.statusBarHeight,
    },
    areaHeader: {
      paddingTop: 5,
      paddingBottom: 5,
      paddingLeft: 10,
      paddingRight: 10,
      backgroundColor: '#00ccff',
      flexDirection: 'row',
      justifyContent: 'space-between'
    },
    areaTitulo: {
      alignItems: 'center',
      justifyContent: 'center',
    },
    titulo: {
      fontSize: 40,
      color: '#000000',
      alignItems: 'center',
      lineHeight: 60,
    },
    busca: {
      padding: 2,
      alignItems: 'center',
      justifyContent: 'center',
    },
    areaPagina: {
      flex: 1,
    },
    areaFormulario: {
      borderColor: 'gray',
      borderStyle: 'solid',
      borderWidth: 1,
      borderTopWidth: 0,
      borderBottomWidth: 1,
      borderRightWidth: 0,
      borderLeftWidth: 0,
      marginBottom: 10,
    },
    areaCampos: {
      paddingTop: 5,
      paddingBottom: 5,
      paddingLeft: 10,
      paddingRight: 10,
    },
    campos: {
      borderColor: 'gray',
      borderStyle: 'solid',
      borderWidth: 1,
      borderTopWidth: 0,
      borderBottomWidth: 1,
      borderRightWidth: 0,
      borderLeftWidth: 0,
      fontSize: 30,
      marginBottom: 5,
    },
    areaBotaoCadatro: {
      flexDirection: 'row',
      justifyContent: 'flex-end',
      alignItems: 'flex-start',
      padding: 5,
    },
    botaoCadastro: {
      borderRadius: 50,
      borderWidth: 2,
      borderStyle: 'solid',
      borderColor: '#1e90ff',
      backgroundColor: '#1e90ff',
      padding: 2,
      marginLeft: 10,
      marginRight: 10,
    },
    areaLista: {
      flex: 1,
    },
    item: {
      backgroundColor: '#afcecf',
      paddingTop: 15,
      paddingBottom: 15,
      paddingLeft: 15,
      paddingRight: 10,
      marginVertical: 8,
      marginHorizontal: 16,
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    itemAreaTitulo: {
      flexDirection: 'column',
      justifyContent: 'center'
    },
    itemTitulo: {
      fontSize: 25,
    },
    areaBotaoItem: {
      flexDirection: 'row',
      borderWidth: 2,
      borderStyle: 'solid',
      borderTopWidth: 0,
      borderBottomWidth: 0,
      borderLeftWidth: 1,
      borderRightWidth: 0,
    },
    botaoItem: {
      margin: 5,
      alignItems: 'center',
      justifyContent: 'center',
    },
    erroTexto: {
        fontSize: 20,
        color: 'red',
    },
    listaVaziaArea: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    listaVaziaTexto: {
        fontSize: 40,
        color: '#000000',
    },
});