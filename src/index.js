import cors from "cors";
import express from "express";
import UsuariosController from "./controllers/UsuariosController.js";

const app = express();
app.use(express.json());
app.use(cors({ origin: "*" }));

const usuariosController = new UsuariosController();

app.get("/usuarios", usuariosController.listar);
app.post("/usuarios", usuariosController.adicionar);
app.put("/usuarios", usuariosController.atualizar);
app.delete("/usuarios/:id", usuariosController.excluir);

app.get("/clientes", (req, res) => {
  res.send(listaClientes);
});

app.post("/clientes", (req, res) => {
  listaClientes.push(req.body);
  res.send(req.body);
});

const port = 3000;
app.listen(port, () => {
  console.log(`API está rodando na porta ${port}`);
});
