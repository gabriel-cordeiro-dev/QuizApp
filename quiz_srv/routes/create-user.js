const User = require("../models/user");
const bcrypt = require("bcrypt");
const router = require("./pergunta");
const salt = 10;

router.post("/criar", (req, res) => {
  bcrypt.hash(req.body.password, salt, (err, hash) => {
    if (err) {
      console.log("Erro ao cifrar senha", err);
    } else {
      console.log("hash", hash);

      User.create({
        username: req.body.username,
        password: hash,
      })
        .then((user) => {
          return res.json({ msg: "Usuário cadastrado com sucesso" });
        })
        .catch((err) => {
          return res.status(500).json({ msg: err });
        });
    }
  });
});

router.post("/atualizar-pontuacao", (req, res) => {
  const { username, novaPontuacao } = req.body;

  User.update({ pontuacao: novaPontuacao }, { where: { username: username } })
    .then(function (result) {
      return res.json({ msg: "Pontuação atualizada com sucesso" });
    })
    .catch(function (err) {
      request.server.log(["error"], err.stack);
    });
});

module.exports = router;
