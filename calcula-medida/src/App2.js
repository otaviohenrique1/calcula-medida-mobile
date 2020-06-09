import React, { useState, useEffect, useCallback } from 'react';
import Constants from "expo-constants";
import { Text, View, TextInput, FlatList, TouchableOpacity, RefreshControl, ScrollView } from 'react-native';
import { MaterialIcons } from "@expo/vector-icons";
// import { listaExemplo, listaExemplo2, listaVaziaExemplo } from "./data-app-pasta/exemplo-lista";
import { withFormik } from "formik";
import * as Yup from "yup";
import styles from "./styles";
import * as SQLite from "expo-sqlite";

const db = SQLite.openDatabase("database.db");

function wait(timeout) {
  return new Promise(resolve => {
      setTimeout(resolve, timeout);
  });
}

function App(props) {
  const [items, setItems] = useState(null);
  const [forceUpdate, forceUpdateId] = useForceUpdate();
  const [refleshing, setRefleshing] = useState(false);

  // Recarrega a tela com botao
  const onReflesh = useCallback(() => {
    setRefleshing(true);
    wait(2000).then(() => setRefleshing(false));
  }, [refleshing]);

  useEffect(() => {
    db.transaction((tx) => {
      tx.executeSql(`
        CREATE TABLE IF NOT EXISTS produtos (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          nome TEXT NOT NULL,
          quantidade TEXT NOT NULL
        );
      `);
    });
  }, []);

  useEffect(() => {
    db.transaction((tx) => {
        tx.executeSql(
            "SELECT * FROM produtos",
            [],
            (_, { rows: { _array } }) => setItems(_array)
        );
    });
  }, []);

  const removeProduto = (id) => {
    db.transaction(
        tx => {
            tx.executeSql(`DELETE FROM produtos WHERE id = ?`, [id]);
        },
        null,
        forceUpdate
    );
  };

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
            <TouchableOpacity style={styles.botaoCadastro} onPress={props.handleSubmit}>
              <MaterialIcons name="add" size={35} color="#111111"/>
            </TouchableOpacity>
            <TouchableOpacity style={styles.botaoCadastro}>
              <MaterialIcons name="clear" size={35} color="#111111"/>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.areaLista}>
          <ScrollView
            refreshControl={
              <RefreshControl
                refreshing={refleshing}
                onRefresh={onReflesh}
              />
            }
          >
            {(items === null || items.length === 0) ?
              <View style={styles.listaVaziaArea}>
                <Text style={styles.listaVaziaTexto}>Sem dados</Text>
              </View>
            :
              <FlatList
                refreshControl={
                  <RefreshControl
                      refreshing={refleshing}
                      onRefresh={onReflesh}
                  />
                }
                data={items}
                renderItem={
                  ({item}) => (
                    <View
                      key={`${forceUpdateId}`}
                      style={styles.item}
                    >
                      <View style={styles.itemAreaTitulo}>
                        <Text style={styles.itemTitulo}>{item.nome}</Text>
                        <Text style={styles.itemTitulo}>{item.quantidade}</Text>
                      </View>
                      <View style={styles.areaBotaoItem}>
                        <TouchableOpacity style={styles.botaoItem} onPress={removeProduto(item.id)}>
                          <MaterialIcons name="delete" size={28} color="#111111"/>
                        </TouchableOpacity>
                      </View>
                    </View>
                  )
                }
                // keyExtractor={item => item.id}
                keyExtractor={item => item.id.toString()}
              />
            }
          </ScrollView>
        </View>
      </View>
    </View>
  );
}

function useForceUpdate() {
  const [value, setValue] = useState(0);
  return [() => setValue(value + 1), value];
}

export default (withFormik({
  mapPropsToValues: () => ({nome: '', quantidade: '', id: 0 }),
  validationSchema: Yup.object().shape({
    nome: Yup.string()
      .required('Preencha o campo nome'),
    quantidade: Yup.string()
      .required('Preencha o campo quantidade'),
  }),
  enableReinitialize: true,
  handleSubmit: (values) => {
    db.transaction(
      (tx) => {
        tx.executeSql(
          "INSERT INTO produtos (nome, quantidade) VALUES (?, ?)",
          [values.nome, values.quantidade]
        );
      },
    );
  }
}))(App);
