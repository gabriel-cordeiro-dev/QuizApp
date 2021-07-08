import React, { useState, useEffect } from "react";
import axios from "axios";

import "../styles/ranking.css";

export function Ranking() {
  const [lista, setLista] = useState([]);
  const [rankingSobrante, setRankingSobrante] = useState([
    { posicao: 1, usuario: "", pontuacao: null },
    { posicao: 2, usuario: "", pontuacao: null },
    { posicao: 3, usuario: "", pontuacao: null },
    { posicao: 4, usuario: "", pontuacao: null },
    { posicao: 5, usuario: "", pontuacao: null },
    { posicao: 6, usuario: "", pontuacao: null },
    { posicao: 7, usuario: "", pontuacao: null },
    { posicao: 8, usuario: "", pontuacao: null },
    { posicao: 9, usuario: "", pontuacao: null },
    { posicao: 10, usuario: "", pontuacao: null },
  ]);

  const ordena = (dados, ordem, campo) => {
    let min = 0;
    let aux = 0;
    for (var i = 0; i < dados.length; i++) {
      min = i;
      for (var j = i + 1; j < dados.length; j++) {
        if (campo === "pontuacao") {
          if (ordem === "asc") {
            if (dados[j].pontuacao < dados[min].pontuacao) min = j;
          }
          if (ordem === "desc") {
            if (dados[j].pontuacao > dados[min].pontuacao) min = j;
          }
        }
        if (campo === "nome") {
          if (ordem === "asc") {
            if (dados[j].usuario < dados[min].usuario) min = j;
          }
          if (ordem === "desc") {
            if (dados[j].usuario > dados[min].usuario) min = j;
          }
        }
      }
      if (i !== min) {
        aux = dados[i];
        dados[i] = dados[min];
        dados[min] = aux;
      }
    }
    let l = 0;
    const newDados = dados.map((rank) => {
      l = l + 1;
      const userRank = {
        posicao: l,
        usuario: rank.usuario,
        pontuacao: rank.pontuacao,
      };
      return userRank;
    });
    if (newDados.length > 10) newDados.length = 10;
    setLista(newDados);
  };

  useEffect(() => {
    axios.get("http://3.235.249.44:5555/ranking").then(async (res) => {
      let pos = 0;

      const desordenada = await Promise.all(
        res.data.map((individual) => {
          pos = pos + 1;
          const userRank = {
            posicao: pos,
            usuario:
              individual.username[0].toUpperCase() +
              individual.username.substring(1),
            pontuacao: individual.pontuacao,
          };
          return userRank;
        })
      );

      ordena(desordenada, "desc", "pontuacao");
      const sobrante = [];
      if (res.data.length < 10) {
        for (var i = res.data.length; i < 10; i++) {
          sobrante.push({
            posicao: i + 1,
            usuario: "",
            pontuacao: null,
          });
        }
      }

      setRankingSobrante(sobrante);
    });
  }, []);

  return (
    <div className="rankingContainer">
      <div className="rankingTitle">Ranking dos Jogadores</div>
      <table className="rankingTable">
        <thead>
          <tr>
            <th className="azul">Posição</th>
            <th className="azul">Nome</th>
            <th className="azul">Pontuação</th>
          </tr>
        </thead>

        <tbody>
          {lista.map((teste) => {
            return (
              <tr key={teste.posicao}>
                <td>{teste.posicao}º</td>
                <td>{teste.usuario}</td>
                <td>{teste.pontuacao}</td>
              </tr>
            );
          })}
          {rankingSobrante.map((teste) => {
            return (
              <tr key={teste.posicao}>
                <td>{teste.posicao}º</td>
                <td>{teste.usuario}</td>
                <td>{teste.pontuacao}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
