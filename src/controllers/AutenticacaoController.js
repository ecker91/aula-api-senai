import ConexaoMySql from "../database/ConexaoMySql.js";

class AutenticacaoController {
  async login(req, res) {
    try {
      const { email, senha } = req.body;
      if (!email || !senha) {
        res.status(400).send("Preencha todos os campos");
        return;
      }

      const conexao = await new ConexaoMySql().getConexao();
      const comandoSql =
        "SELECT * FROM usuarios WHERE email = ? AND senha = md5(?)";

      const [resultado] = await conexao.execute(comandoSql, [email, senha]);

      const usuarioEncontrado = resultado[0];

      if (!usuarioEncontrado) {
        res.status(401).send("Email ou senha incorreta");
        return;
      }
      delete usuarioEncontrado.senha;
      res.send(usuarioEncontrado);
    } catch (error) {
      res.status(500).send(error);
    }
  }
}

export default AutenticacaoController;
