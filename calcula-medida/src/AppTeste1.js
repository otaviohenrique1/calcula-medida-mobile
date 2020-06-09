import React, { useState, useEffect } from 'react';
import { Text, View, TextInput, FlatList, TouchableOpacity, AsyncStorage } from 'react-native';
import { MaterialIcons } from "@expo/vector-icons";
import { listaExemplo, listaExemplo2, listaVaziaExemplo } from "./data-app-pasta/exemplo-lista";
import { withFormik } from "formik";
import * as Yup from "yup";
import styles from "./styles";

function AppTeste1(props) {
  const [lista, setLista] = useState([]);
  
  useEffect(() => {
    setLista(...lista, listaExemplo2);
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.areaHeader}>
        <Text style={styles.titulo}>Lista de compras</Text>
        <TouchableOpacity style={styles.busca}>
          <MaterialIcons name="search" size={50} color="#111111"/>
        </TouchableOpacity>
      </View>
      <View style={styles.areaPagina}>
        <View style={styles.areaFormulario}>
          <View style={styles.areaCampos}>
            <TextInput
              style={styles.campos}
              value={props.values.nome}
              placeholder="Digite o nome"
              onChangeText={text => props.setFieldValue('nome', text)}
            />
            { props.touched.nome 
            && props.errors.nome 
            && <Text style={styles.erroTexto}>{props.errors.nome}</Text> }
            <TextInput
              style={styles.campos}
              value={props.values.quantidade}
              placeholder="Digite o quantidade"
              onChangeText={text => props.setFieldValue('quantidade', text)}
            />
            { props.touched.quantidade 
            && props.errors.quantidade 
            && <Text style={styles.erroTexto}>{props.errors.quantidade}</Text> }
          </View>
          <View style={styles.areaBotaoCadatro}>
            <TouchableOpacity style={styles.botaoCadastro} onPress={() => props.handleSubmit}>
              <MaterialIcons name="add" size={35} color="#111111"/>
            </TouchableOpacity>
            <TouchableOpacity style={styles.botaoCadastro} onPress={() => {
              props.setFieldValue('nome', '');
              props.setFieldValue('quantidade', '');
            }}>
              <MaterialIcons name="clear" size={35} color="#111111"/>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.areaLista}>
          <FlatList
            data={lista}
            renderItem={
              ({item}) => (
                <View
                  style={styles.item}
                >
                  <View style={styles.itemAreaTitulo}>
                    <Text style={styles.itemTitulo}>{item.nome}</Text>
                    <Text style={styles.itemTitulo}>{item.quantidade}</Text>
                  </View>
                  <View style={styles.areaBotaoItem}>
                    <TouchableOpacity style={styles.botaoItem} onPress={() => {}}>
                      <MaterialIcons name="delete" size={28} color="#111111"/>
                    </TouchableOpacity>
                  </View>
                </View>
              )
            }
            keyExtractor={item => item.id.toString()}
          />
        </View>
      </View>
    </View>
  );
}

export default (withFormik({
  mapPropsToValues: () => ({nome: '', quantidade: ''}),
  validationSchema: Yup.object().shape({
    nome: Yup.string()
      .required('Preencha o campo nome'),
    quantidade: Yup.string()
      .required('Preencha o campo quantidade'),
  }),
  handleSubmit: (values, { resetForm }) => {
    let data = {
      nome: values.nome,
      quantidade: values.quantidade,
    };
    resetForm({nome: '', quantidade: ''});
  }
}))(AppTeste1);
