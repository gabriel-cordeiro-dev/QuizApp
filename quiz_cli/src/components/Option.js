import React from "react";

import "../styles/option.css";

export function Option(props) {
  const { selected, alternativa, value } = props;
  if (selected)
    return (
      <div className="opcaoSelecionada">
        <div className="letraSelecionada">{alternativa}</div>
        <div className="texto">{value}</div>
      </div>
    );
  return (
    <div className="opcao">
      <div className="letra">{alternativa}</div>
      <div className="texto">{value}</div>
    </div>
  );
}
