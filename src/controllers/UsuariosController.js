import ConexaoMySql from "../database/ConexaoMySql.js";

class UsuariosController {
  async adicionar(req, res) {
    try {
      const novoUsuario = req.body;

      if (!novoUsuario.nome || !novoUsuario.email || !novoUsuario.senha) {
        res.status(400).send("Preencha todos os campos obrigatórios.");
        return;
      }

      const conexao = await new ConexaoMySql().getConexao();
      const comandoSql =
        "INSERT INTO usuarios (nome, email, senha) VALUES (?,?,md5(?));";

      const resultado = await conexao.execute(comandoSql, [
        novoUsuario.nome,
        novoUsuario.email,
        novoUsuario.senha,
      ]);

      res.send(resultado);
    } catch (erro) {
      if (erro.code === "ER_DUP_ENTRY") {
        res.status(400).send("Email já cadastrado");
        return;
      }
      res.status(500).send(erro);
    }
  }

  async listar(req, res) {
    try {
      const conexao = await new ConexaoMySql().getConexao();
      const comandoSql = "SELECT * FROM usuarios WHERE nome LIKE ?";

      const filtro = req.query.filtro || "";

      const [resultado] = await conexao.execute(comandoSql, [`%${filtro}%`]);

      res.send(
        resultado.map((u) => {
          delete u.senha;
          return u;
        })
      );
    } catch (erro) {
      res.status(500).send(erro);
    }
  }

  async atualizar(req, res) {
    try {
      const usuarioEditar = req.body;

      if (!usuarioEditar.nome || !usuarioEditar.email || !usuarioEditar.id) {
        res.status(400).send("Os campos id, nome e email são obrigatórios.");
        return;
      }

      const conexao = await new ConexaoMySql().getConexao();
      const comandoSql = "UPDATE usuarios SET nome = ?, email = ? WHERE id = ?";

      const resultado = await conexao.execute(comandoSql, [
        usuarioEditar.nome,
        usuarioEditar.email,
        usuarioEditar.id,
      ]);

      res.send(resultado);
    } catch (erro) {
      res.status(500).send(erro);
    }
  }

  async excluir(req, res) {
    try {
      const idUsuario = req.params.id;
      const conexao = await new ConexaoMySql().getConexao();
      const comandoSql = "DELETE FROM usuarios WHERE id = ?";

      const resultado = await conexao.execute(comandoSql, [idUsuario]);
      res.send(resultado);
    } catch (erro) {
      res.status(500).send(erro);
    }
  }
}

export default UsuariosController;
