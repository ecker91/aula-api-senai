import cors from "cors";
import express from "express";
import UsuariosController from "./controllers/UsuariosController.js";
import ClientesController from "./controllers/ClientesController.js";
import ProdutosController from "./controllers/ProdutosController.js";
import AutenticacaoController from "./controllers/AutenticacaoController.js";

const app = express();
app.use(express.json());
app.use(cors({ origin: "*" }));

const usuariosController = new UsuariosController();
const clientesController = new ClientesController();
const produtosController = new ProdutosController();
const autenticacaoController = new AutenticacaoController();

app.use((req, res, next) => {
  const usuarioLogado = req.headers["x-usuario"];
  if (!usuarioLogado) {
    res.status(401).send("Não autorizado");
    return;
  }
  next();
});

//rota login
app.post("/login", autenticacaoController.login);

//endpoints usuarios
app.get("/usuarios", usuariosController.listar);
app.post("/usuarios", usuariosController.adicionar);
app.put("/usuarios", usuariosController.atualizar);
app.delete("/usuarios/:id", usuariosController.excluir);

//endpoints clientes
app.get("/clientes", clientesController.listar);
app.post("/clientes", clientesController.adicionar);
app.put("/clientes", clientesController.atualizar);
app.delete("/clientes/:id", clientesController.excluir);

//endpoints produtos
app.get("/produtos", produtosController.listar);
app.post("/produtos", produtosController.adicionar);
app.put("/produtos", produtosController.atualizar);
app.delete("/produtos/:id", produtosController.excluir);

const port = 3000;
app.listen(port, () => {
  console.log(`API está rodando na porta ${port}`);
});
