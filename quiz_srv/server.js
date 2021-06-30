const express = require("express");
const cors = require("cors");

const login = require("./routes/login");
const perguntas = require("./routes/pergunta");
const criarUsuario = require("./routes/create-user");
const ranking = require("./routes/ranking");
const auth = require("./auth");

const app = express();

app.use(cors());
app.use(express.json());

//rotas
app.use(login);
app.use(criarUsuario);
app.use("/ranking", ranking);
app.use("/pergunta", auth, perguntas);
app.use("/pergunta/:id", auth, perguntas);

app.listen(5555, () => {
  console.log("server rodando");
});
