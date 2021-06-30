import React, { useState } from "react";

import { Option } from "./Option";
import { Botao } from "./Botao";

import "../styles/cardpergunta.css";

export function CardPergunta(props) {
  const [oneSelected, setOneSelected] = useState(false);
  const [optionSelected, setOptionSelected] = useState([0, 0, 0, 0]);

  const {
    numeroPergunta,
    pergunta,
    alternativasEmbaralhadas,
    handleProximaPergunta,
    handleOpcaoSelecionada,
    handleFinalizar,
  } = props;

  const handleBotaoProximaPergunta = () => {
    handleProximaPergunta();
    setOneSelected(false);
    setOptionSelected([0, 0, 0, 0]);
  };

  return (
    <div className="cardPergunta">
      <div className="cabecalhoPergunta">
        <div className="numeroPergunta">Questão {numeroPergunta + 1}/10</div>
        <div className="enunciado">{pergunta}</div>
      </div>
      <div className="opcoes">
        <button
          type="button"
          onClick={() => {
            setOneSelected(true);
            setOptionSelected([1, 0, 0, 0]);
            handleOpcaoSelecionada(alternativasEmbaralhadas[0]);
          }}
          style={{ border: "none" }}
        >
          <Option
            alternativa="A"
            value={alternativasEmbaralhadas[0]}
            selected={optionSelected[0]}
          />
        </button>
        <button
          type="button"
          onClick={() => {
            setOneSelected(true);
            setOptionSelected([0, 1, 0, 0]);
            handleOpcaoSelecionada(alternativasEmbaralhadas[1]);
          }}
          style={{ border: "none" }}
        >
          <Option
            alternativa="B"
            value={alternativasEmbaralhadas[1]}
            selected={optionSelected[1]}
          />
        </button>

        <button
          type="button"
          onClick={() => {
            setOneSelected(true);
            setOptionSelected([0, 0, 1, 0]);
            handleOpcaoSelecionada(alternativasEmbaralhadas[2]);
          }}
          style={{ border: "none" }}
        >
          <Option
            alternativa="C"
            value={alternativasEmbaralhadas[2]}
            selected={optionSelected[2]}
          />
        </button>
        <button
          type="button"
          onClick={() => {
            setOneSelected(true);
            setOptionSelected([0, 0, 0, 1]);
            handleOpcaoSelecionada(alternativasEmbaralhadas[3]);
          }}
          style={{ border: "none" }}
        >
          <Option
            alternativa="D"
            value={alternativasEmbaralhadas[3]}
            selected={optionSelected[3]}
          />
        </button>
      </div>
      {oneSelected && (
        <Botao
          texto={numeroPergunta === 9 ? "Finalizar" : "Próxima Pergunta"}
          type="button"
          onClick={
            numeroPergunta === 9 ? handleFinalizar : handleBotaoProximaPergunta
          }
        />
      )}
    </div>
  );
}
