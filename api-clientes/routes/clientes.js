const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser'); // Garantir que os dados JSON do body sejam processados
const app = express();
const port = 5001;

// Configuração do CORS para permitir requisições de qualquer origem
app.use(cors());
app.use(express.json()); // Middleware para processar dados JSON
app.use(bodyParser.urlencoded({ extended: true }));

// Dados fictícios de clientes
let clientes = [
  { id: 1, nome: "João Silva", email: "joao@gmail.com", cpf: "12345678900", contato: "(11) 98765-4321", cep: "12345-678", numero: "123", cidade: "São Paulo", estado: "SP" },
  { id: 2, nome: "Maria Oliveira", email: "maria@gmail.com", cpf: "98765432100", contato: "(11) 91234-5678", cep: "54321-123", numero: "456", cidade: "Rio de Janeiro", estado: "RJ" }
];

// Endpoint para retornar os clientes
app.get('/api/clientes', (req, res) => {
  console.log("Requisição GET recebida em /api/clientes");
  res.json(clientes);
});

// Endpoint para adicionar um novo cliente
app.post('/api/clientes', (req, res) => {
  console.log("Requisição POST recebida em /api/clientes");
  console.log("Dados recebidos:", req.body);

  const novoCliente = {
    id: clientes.length > 0 ? clientes[clientes.length - 1].id + 1 : 1,
    ...req.body,
  };
  clientes.push(novoCliente);
  res.status(201).json(novoCliente);
});

// Endpoint para editar um cliente existente
app.put('/api/clientes/:id', (req, res) => {
  const id = parseInt(req.params.id);
  console.log(`Requisição PUT recebida em /api/clientes/${id}`);
  console.log("Dados recebidos:", req.body);

  const clienteIndex = clientes.findIndex((cliente) => cliente.id === id);
  if (clienteIndex === -1) {
    console.error("Cliente não encontrado!");
    return res.status(404).json({ message: "Cliente não encontrado" });
  }

  clientes[clienteIndex] = { ...clientes[clienteIndex], ...req.body };
  res.json(clientes[clienteIndex]);
});

// Endpoint para excluir um cliente
app.delete('/api/clientes/:id', (req, res) => {
  const id = parseInt(req.params.id);
  console.log(`Requisição DELETE recebida em /api/clientes/${id}`);

  const clienteIndex = clientes.findIndex((cliente) => cliente.id === id);
  if (clienteIndex === -1) {
    console.error("Cliente não encontrado!");
    return res.status(404).json({ message: "Cliente não encontrado" });
  }

  clientes.splice(clienteIndex, 1);
  res.status(204).send(); // Sem conteúdo, mas sucesso
});

// Inicia o servidor
app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
