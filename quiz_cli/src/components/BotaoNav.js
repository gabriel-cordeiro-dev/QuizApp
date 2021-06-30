import React from "react";

import "../styles/botaonav.css";

export function BotaoNav(props) {
  const { texto, onClick } = props;
  return (
    <button className="botaoNav" type="button" onClick={onClick}>
      {texto}
    </button>
  );
}
