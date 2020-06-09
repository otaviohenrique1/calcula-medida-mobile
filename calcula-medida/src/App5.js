import React, { useState, useEffect } from 'react';
import { Text, View, TextInput, ScrollView, TouchableOpacity } from 'react-native';
import { MaterialIcons } from "@expo/vector-icons";
import styles from "./styles";
import * as SQLite from "expo-sqlite";

const db = SQLite.openDatabase("database.db");

function ListaItems({ onRemove }) {
  const [items, setItems] = useState(null);
  
  useEffect(() => {
    db.transaction((tx) => {
        tx.executeSql(
            "SELECT * FROM produtos",
            [],
            (_, { rows: { _array } }) => setItems(_array)
        );
    });
  }, []);

  return(
    <View>
      {(items === null || items.length === 0) ?
        <View style={styles.listaVaziaArea}>
          <Text style={styles.listaVaziaTexto}>Sem dados</Text>
        </View>
      :
        items.map(({id, nome, quantidade}) => (
          <View
            style={styles.item}
            key={id}
          >
            <View style={styles.itemAreaTitulo}>
              <Text style={styles.itemTitulo}>{nome}</Text>
              <Text style={styles.itemTitulo}>{quantidade}</Text>
            </View>
            <View style={styles.areaBotaoItem}>
              <TouchableOpacity style={styles.botaoItem} onPress={() => onRemove && onRemove(id)}>
                <MaterialIcons name="delete" size={28} color="#111111"/>
              </TouchableOpacity>
            </View>
          </View>
        ))
      }
    </View>
  );
}

function App() {
  const [nome, setNome] = React.useState(null);
  const [quantidade, setQuantidade] = React.useState(null);
  const [forceUpdate, forceUpdateId] = useForceUpdate();
  const [erro, setErro] = React.useState(true);

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

  const onAdd = (nome, quantidade) => {
    if (nome === null || nome === "" || quantidade === null || quantidade === "") {
      setErro(false);
      // return false;
    } else {
      setErro(true);
      db.transaction(
        (tx) => {
          tx.executeSql(
            "INSERT INTO produtos (nome, quantidade) VALUES (?, ?)",
            [nome, quantidade]
          );
        },
        null,
        forceUpdate
      );
    }
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
            {(erro === false) ?
              <Text style={styles.erroTexto}>Nome e Quantidade vazios</Text>
            : <Text></Text>}
            <TextInput
              style={styles.campos}
              value={nome}
              placeholder="Digite o nome"
              onChangeText={text => setNome(text)}
            />
            <TextInput
              style={styles.campos}
              value={quantidade}
              placeholder="Digite o quantidade"
              onChangeText={text => setQuantidade(text)}
            />
          </View>
          <View style={styles.areaBotaoCadatro}>
            <TouchableOpacity style={styles.botaoCadastro} onPress={onAdd}>
              <MaterialIcons name="add" size={35} color="#111111"/>
            </TouchableOpacity>
            <TouchableOpacity style={styles.botaoCadastro}>
              <MaterialIcons name="clear" size={35} color="#111111"/>
            </TouchableOpacity>
          </View>
        </View>
        <ScrollView  style={styles.areaLista}>
          <ListaItems
            key={`${forceUpdateId}`}
            onRemove={id =>
              db.transaction(
                  tx => {
                      tx.executeSql(`DELETE FROM produtos WHERE id = ?`, [id]);
                  },
                  null,
                  forceUpdate
              )
            }
          />
        </ScrollView>
      </View>
    </View>
  );
}

function useForceUpdate() {
  const [value, setValue] = useState(0);
  return [() => setValue(value + 1), value];
}

// export default (withFormik({
//   mapPropsToValues: () => ({nome: '', quantidade: '', id: 0 }),
//   validationSchema: Yup.object().shape({
//     nome: Yup.string()
//       .required('Preencha o campo nome'),
//     quantidade: Yup.string()
//       .required('Preencha o campo quantidade'),
//   }),
//   handleSubmit: (values) => {
//     db.transaction(
//       (tx) => {
//         tx.executeSql(
//           "INSERT INTO produtos (nome, quantidade) VALUES (?, ?)",
//           [values.nome, values.quantidade]
//         );
//       },
//     );
//   }
// }))(App);

export default App;