import ConexaoMySql from "../database/ConexaoMySql.js";

class ClientesController {
  async adicionar(req, res) {
    try {
      const novoCliente = req.body;

      if (!novoCliente.nome || !novoCliente.email || !novoCliente.cpf) {
        res.status(400).send("Os campos nome, email e CPF são obrigatórios.");
        return;
      }

      if (novoCliente.telefone) {
        const conexao = await new ConexaoMySql().getConexao();
        const comandoSql =
          "INSERT INTO clientes (nome, email, telefone, cpf) VALUES (?,?,?,?);";

        const resultado = await conexao.execute(comandoSql, [
          novoCliente.nome,
          novoCliente.email,
          novoCliente.telefone,
          novoCliente.cpf,
        ]);

        res.send(resultado);
      }
      const conexao = await new ConexaoMySql().getConexao();
      const comandoSql =
        "INSERT INTO clientes (nome, email, cpf) VALUES (?,?,?);";

      const resultado = await conexao.execute(comandoSql, [
        novoCliente.nome,
        novoCliente.email,
        novoCliente.cpf,
      ]);

      res.send(resultado);
    } catch (erro) {
      if (erro.code === "ER_DUP_ENTRY") {
        res.status(400).send("CPF ou email já cadastrado");
        return;
      }
      res.status(500).send(erro);
    }
  }

  async listar(req, res) {
    try {
      const conexao = await new ConexaoMySql().getConexao();
      const comandoSql = "SELECT * FROM clientes WHERE nome LIKE ?";

      const filtro = req.query.filtro || "";

      const [resultado] = await conexao.execute(comandoSql, [`%${filtro}%`]);

      res.send(resultado);
    } catch (erro) {
      res.status(500).send(erro);
    }
  }

  async atualizar(req, res) {
    try {
      const clienteEditar = req.body;

      if (!clienteEditar.nome || !clienteEditar.email || !clienteEditar.id || !clienteEditar.cpf) {
        res.status(400).send("Os campos id, nome, email e cpf são obrigatórios.");
        return;
      }

      if (clienteEditar.telefone) {
        const conexao = await new ConexaoMySql().getConexao();
        const comandoSql = "UPDATE clientes SET nome = ?, email = ?, telefone = ?, cpf = ? WHERE id = ?";

        const resultado = await conexao.execute(comandoSql, [
          clienteEditar.nome,
          clienteEditar.email,
          clienteEditar.telefone,
          clienteEditar.cpf,
          clienteEditar.id,
        ]);
        res.send(resultado);
      }

      const conexao = await new ConexaoMySql().getConexao();
      const comandoSql = "UPDATE clientes SET nome = ?, email = ?, cpf=? WHERE id = ?";

      const resultado = await conexao.execute(comandoSql, [
        clienteEditar.nome,
        clienteEditar.email,
        clienteEditar.cpf,
        clienteEditar.id,
      ]);

      res.send(resultado);
    } catch (erro) {
      res.status(500).send(erro);
    }
  }

  async excluir(req, res) {
    try {
      const idCliente = req.params.id;
      const conexao = await new ConexaoMySql().getConexao();
      const comandoSql = "DELETE FROM clientes WHERE id = ?";

      const resultado = await conexao.execute(comandoSql, [idCliente]);
      res.send(resultado);
    } catch (erro) {
      res.status(500).send(erro);
    }
  }
}

export default ClientesController;
