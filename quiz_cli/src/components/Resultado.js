import React from "react";

import { Botao } from "./Botao";

import "../styles/resultado.css";

class Resultado extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="resultadoContainer">
        <div className="tituloForm">Resultado</div>
        <div className="formResultado">
          <div className="resultado">
            Você respondeu corretamente {this.props.acertos} perguntas!
          </div>
          <div className="botaoFormulario">
            <Botao
              type="button"
              texto="Ver Ranking"
              onClick={this.props.handleVerRanking}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default Resultado;
