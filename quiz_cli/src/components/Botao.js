import React from "react";

import "../styles/botao.css";

export function Botao(props) {
  const { texto, type, onClick } = props;
  if (type === "submit")
    return (
      <button className="botao" type={type}>
        {texto}
      </button>
    );
  return (
    <button className="botao" type={type} onClick={onClick}>
      {texto}
    </button>
  );
}
