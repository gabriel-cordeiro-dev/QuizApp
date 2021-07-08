const User = require("../models/user");
const router = require("express").Router();


router.get("/", (req, res) => {
  User.findAll()

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
