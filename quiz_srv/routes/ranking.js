const User = require("../models/user");
const bcrypt = require("bcrypt");
const router = require("express").Router();
const salt = 10;

router.get("/", (req, res) => {
  User.findAll({
    order: [
      ["pontuacao", "DESC"],
      ["username", "ASC"],
    ],
    limit: 10,
  })

    .then((ranking) => {
      if (ranking) {
        console.log("ranking", ranking);
        res.json(ranking);
      } else {
        console.log("Ranking não disponível");
        return res.status(400).json({
          err: "Ranking não disponível",
        });
      }
    })
    .catch((err) => {
      console.log("Erro", err);
      return res.json({ err: err });
    });
});
module.exports = router;
