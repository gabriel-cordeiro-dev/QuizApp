import React from "react";

import { Header } from "./Header";
import "../styles/perguntaslayout.css";

function PerguntasLayout(props) {
  return (
    <>
      <Header />
      <div className="contentContainer">{props.children}</div>
    </>
  );
}

export default PerguntasLayout;
