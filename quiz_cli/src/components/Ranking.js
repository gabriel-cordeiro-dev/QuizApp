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

  useEffect(() => {
    axios.get("http://localhost:5555/ranking").then(async (res) => {
      let pos = 0;
      setLista(
        await Promise.all(
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
        )
      );

      const sobrante = [];
      for (var i = res.data.length; i < 10; i++) {
        sobrante.push({
          posicao: i + 1,
          usuario: "",
          pontuacao: null,
        });
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
