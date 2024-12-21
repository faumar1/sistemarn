import React from "react";
import { Table,Button } from "react-bootstrap";

class Clientes extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      clientes: []
    
    }
  }
  componentDidMount(){
    this.buscarClietes();
  }
  componentWillUnmount(){

  }
  buscarClietes = () => {
    fetch("http://localhost:5001/api/clientes")
    .then(resposta => resposta.json())
    .then(dados => {
      this.setState({clientes :dados})
    })
  }
  DeletarClientes = (id) =>{
    fetch("http://localhost:5001/api/clientes"+id,{method: 'DELLETE'})
    .then(resposta => {
    if(resposta.ok){
      this.buscarClietes();
    }
    })
  }

  render() {
    return (
      <table className="table table-hover">
        <thead>
          <tr>
            <th>Nome</th>
            <th>Idade</th>
            <th>Data de Nascimento</th>
            <th>Endereço</th>
            <th>Número</th>
            <th>CEP</th>
            <th>Sexo</th>
            <th>Contato</th>
            <th>Opções</th>
          </tr>
        </thead>
        <tbody>
          {
          this.state.clientes.map((cliente) =>             
              <tr key={cliente.id}>
              <td>{cliente.nome}</td>
              <td>{cliente.idade}</td>
              <td>{cliente.dataNascimento}</td>
              <td>{cliente.endereco}</td>
              <td>{cliente.numero}</td>
              <td>{cliente.cep}</td>
              <td>{cliente.sexo}</td>
              <td>{cliente.contato}</td>
              <td>editar <button type="button" onClick={() => this.DeletarClientes(Clientes.id)} class="btn btn-primary">excluir</button></td>
              </tr>
              ) 
            }
    
    </tbody>
  </table>
    )
}
}


  
export default Clientes;
