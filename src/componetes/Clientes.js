import React from "react";
import { Table, Button, Modal, Form } from "react-bootstrap";

class Clientes extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      clientes: [], // Lista de clientes
      showModal: false, // Controle para exibir o modal
      modalType: "", // "adicionar" ou "editar"
      clienteAtual: {
        id: "",
        nome: "",
        email: "",
        cpf: "",
        contato: "",
        cep: "",
        numero: "",
        cidade: "",
        estado: "",
      },
    };
  }

  componentDidMount() {
    this.buscarClientes();
  }

  buscarClientes = () => {
    fetch("http://localhost:5001/api/clientes")
      .then((resposta) => {
        if (!resposta.ok) {
          throw new Error("Erro ao buscar clientes");
        }
        return resposta.json();
      })
      .then((dados) => {
        this.setState({ clientes: dados });
      })
      .catch((erro) => console.error("Erro ao buscar clientes:", erro));
  };

  handleShowModal = (tipo, cliente = null) => {
    if (tipo === "editar" && cliente) {
      this.setState({ clienteAtual: { ...cliente }, modalType: tipo, showModal: true });
    } else if (tipo === "adicionar") {
      this.setState({
        clienteAtual: {
          id: "",
          nome: "",
          email: "",
          cpf: "",
          contato: "",
          cep: "",
          numero: "",
          cidade: "",
          estado: "",
        },
        modalType: tipo,
        showModal: true,
      });
    }
  };

  handleCloseModal = () => {
    this.setState({ showModal: false });
  };

  handleInputChange = (e) => {
    const { name, value } = e.target;
    this.setState({
      clienteAtual: { ...this.state.clienteAtual, [name]: value },
    });
  };

  handleSalvar = () => {
    const { modalType, clienteAtual } = this.state;
    const url = modalType === "adicionar"
      ? "http://localhost:5001/api/clientes"
      : `http://localhost:5001/api/clientes/${clienteAtual.id}`;

    const method = modalType === "adicionar" ? "POST" : "PUT";

    fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(clienteAtual),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Erro ao salvar cliente");
        }
        return response.json();
      })
      .then(() => {
        this.buscarClientes(); // Atualizar a lista de clientes
        this.handleCloseModal(); // Fechar o modal
      })
      .catch((error) => console.error("Erro ao salvar cliente:", error));
  };

  handleExcluir = (id) => {
    fetch(`http://localhost:5001/api/clientes/${id}`, { method: "DELETE" })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Erro ao excluir cliente");
        }
        this.buscarClientes();
      })
      .catch((erro) => console.error("Erro ao excluir cliente:", erro));
  };

  render() {
    const { clientes, showModal, modalType, clienteAtual } = this.state;

    return (
      <div>
        <div className="mb-3">
          <Button variant="primary" onClick={() => this.handleShowModal("adicionar")}>
            Adicionar Cliente
          </Button>
        </div>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Nome</th>
              <th>Email</th>
              <th>CPF</th>
              <th>Contato</th>
              <th>CEP</th>
              <th>Número</th>
              <th>Cidade</th>
              <th>Estado</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {clientes.map((cliente) => (
              <tr key={cliente.id}>
                <td>{cliente.nome}</td>
                <td>{cliente.email}</td>
                <td>{cliente.cpf}</td>
                <td>{cliente.contato}</td>
                <td>{cliente.cep}</td>
                <td>{cliente.numero}</td>
                <td>{cliente.cidade}</td>
                <td>{cliente.estado}</td>
                <td>
                  <Button
                    variant="warning"
                    size="sm"
                    className="me-2"
                    onClick={() => this.handleShowModal("editar", cliente)}
                  >
                    Editar
                  </Button>
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => this.handleExcluir(cliente.id)}
                  >
                    Excluir
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>

        {/* Modal para Adicionar/Editar Cliente */}
        <Modal show={showModal} onHide={this.handleCloseModal}>
          <Modal.Header closeButton>
            <Modal.Title>{modalType === "adicionar" ? "Adicionar Cliente" : "Editar Cliente"}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              {["nome", "email", "cpf", "contato", "cep", "numero", "cidade", "estado"].map((field) => (
                <Form.Group className="mb-3" key={field}>
                  <Form.Label>{field.charAt(0).toUpperCase() + field.slice(1)}</Form.Label>
                  <Form.Control
                    type="text"
                    name={field}
                    value={clienteAtual[field]}
                    onChange={this.handleInputChange}
                  />
                </Form.Group>
              ))}
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.handleCloseModal}>
              Cancelar
            </Button>
            <Button variant="primary" onClick={this.handleSalvar}>
              Salvar
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

export default Clientes;
