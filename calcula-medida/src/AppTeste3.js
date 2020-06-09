import React, { useState, Component } from 'react';
import { Text, View, TextInput, FlatList, TouchableOpacity } from 'react-native';
import { MaterialIcons } from "@expo/vector-icons";
import { listaExemplo, listaExemplo2, listaVaziaExemplo } from "./data-app-pasta/exemplo-lista";
import styles from "./styles";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      itens: []
    };
  }

  onAdd = (item) => {
    const { itens } = this.state;
    this.setState({ itens: [item, ...itens] });
  };
  
  onRemove = (index) => {
    const { itens } = this.state;
    this.setState({ itens: itens.filter((element, i) => i !== index) });
  };

  render() {
    const { itens } = this.state;
    return (
      <View style={styles.container}>
        <Header />
        <View style={styles.areaPagina}>
          <Cadastro
            onAdd={this.onAdd}
          />
        </View>
      </View>
    );
  }
}

class Header extends Component {
  render() {
    return (
      <View style={styles.areaHeader}>
        <Text style={styles.titulo}>Lista de compras</Text>
        <TouchableOpacity style={styles.busca}>
          <MaterialIcons name="search" size={50} color="#111111"/>
        </TouchableOpacity>
      </View>
    );
  }
}

class Cadastro extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nome: '',
      quantidade: ''
    }
  }

  onChange = ({ target }) => {
    const { value, name } = target;
    this.setState({ [name] : value });
  };

  onSubmit = (event) => {
    event.preventDefault();
    this.props.onAdd(this.state);
    this.onClear();
  };

  onClear = () => {
    this.setState({
      nome: '',
      quantidade: ''
    });
  };

  render() {
    let { nome, quantidade } = this.state;

    return (
      <CadastroView
        onChange={this.onChange}
        onSubmit={this.onSubmit}
        onClear={this.onClear}
        nome={nome}
        quantidade={quantidade}
      />
    );
  }
}

function CadastroView({onChange, onSubmit, onClear, nome, quantidade}) {
  return (
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
  );
}

export default App;

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

export default AppTeste1;
