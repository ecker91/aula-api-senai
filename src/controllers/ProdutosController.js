import ConexaoMySql from "../database/ConexaoMySql.js";

class ProdutosController {
  async adicionar(req, res) {
    try {
      const novoProduto = req.body;

      if (!novoProduto.nome || !novoProduto.preco || !novoProduto.estoque) {
        res.status(400).send("Preencha todos os campos obrigatórios.");
        return;
      }

      if(novoProduto.descricao){
        const conexao = await new ConexaoMySql().getConexao();
        const comandoSql =
          "INSERT INTO produtos (nome, preco, descricao, estoque) VALUES (?,?,?,?);";
  
        const resultado = await conexao.execute(comandoSql, [
          novoProduto.nome,
          novoProduto.preco,
          novoProduto.descricao,
          novoProduto.estoque,
        ]);
        res.send(resultado)
      }

      const conexao = await new ConexaoMySql().getConexao();
      const comandoSql =
        "INSERT INTO produtos (nome, preco, estoque) VALUES (?,?,?);";

      const resultado = await conexao.execute(comandoSql, [
        novoProduto.nome,
        novoProduto.preco,
        novoProduto.estoque,
      ]);

      res.send(resultado);
    } catch (erro) {
      res.status(500).send(erro);
    }
  }

  async listar(req, res) {
    try {
      const conexao = await new ConexaoMySql().getConexao();
      const comandoSql = "SELECT * FROM produtos WHERE nome LIKE ?";

      const filtro = req.query.filtro || "";

      const [resultado] = await conexao.execute(comandoSql, [`%${filtro}%`]);

      res.send(resultado);
    } catch (erro) {
      res.status(500).send(erro);
    }
  }

  async atualizar(req, res) {
    try {
      const produtoEditar = req.body;

      if (!produtoEditar.nome || !produtoEditar.preco || !produtoEditar.estoque || !produtoEditar.id) {
        res.status(400).send("Os campos id, nome, preco e estoque são obrigatórios.");
        return;
      }

      if(produtoEditar.descricao){
        const conexao = await new ConexaoMySql().getConexao();
        const comandoSql = "UPDATE produtos SET nome = ?, descricao = ?, preco = ?, estoque = ? WHERE id = ?";
  
        const resultado = await conexao.execute(comandoSql, [
          produtoEditar.nome,
          produtoEditar.descricao,
          produtoEditar.preco,
          produtoEditar.estoque,
          produtoEditar.id,
        ]);
      }

      const conexao = await new ConexaoMySql().getConexao();
      const comandoSql = "UPDATE produtos SET nome = ?, preco = ?, estoque = ? WHERE id = ?";

      const resultado = await conexao.execute(comandoSql, [
        produtoEditar.nome,
        produtoEditar.preco,
        produtoEditar.estoque,
        produtoEditar.id,
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
      const comandoSql = "DELETE FROM produtos WHERE id = ?";

      const resultado = await conexao.execute(comandoSql, [idUsuario]);
      res.send(resultado);
    } catch (erro) {
      res.status(500).send(erro);
    }
  }
}

export default ProdutosController;
