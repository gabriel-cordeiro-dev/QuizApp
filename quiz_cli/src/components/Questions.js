import React from "react";
import axios from "axios";
import jwt from "jsonwebtoken";
import { getToken } from "../utils/auth";

import { CardPergunta } from "./CardPergunta";
import Resultado from "./Resultado";
import { Ranking } from "./Ranking";

class Questions extends React.Component {
  state = {
    perguntas: [],
    perguntaAtual: 0,
    alternativas: [],
    alternativasEmbaralhadas: [],
    opcaoSelecionada: "",
    acertos: 0,
    resultado: false,
    completo: false,
    username: "",
  };

  componentDidMount() {
    const access_token = getToken();
    var decoded = jwt.decode(access_token);
    if (decoded !== null) {
      this.setState({ username: decoded.username });
    }
    axios
      .get("http://localhost:5555/pergunta", {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      })
      .then(async (res) => {
        //console.log(res.data);
        this.setState({ perguntas: res.data });
        this.setState({
          alternativas: await Promise.all(
            res.data.map((pergunta) => {
              const alternativas = [
                pergunta.resposta,
                pergunta.alternativa_um,
                pergunta.alternativa_dois,
                pergunta.alternativa_tres,
              ];
              return alternativas;
            })
          ),
        });

        const primeirasAlternativas = [
          res.data[0].resposta,
          res.data[0].alternativa_um,
          res.data[0].alternativa_dois,
          res.data[0].alternativa_tres,
        ];

        this.embaralha(primeirasAlternativas);
      });
  }

  handleProximaPergunta = () => {
    if (
      this.state.opcaoSelecionada ===
      this.state.perguntas[this.state.perguntaAtual].resposta
    ) {
      this.setState({
        acertos: this.state.acertos + 1,
      });
    }
    this.embaralha(this.state.alternativas[this.state.perguntaAtual + 1]);
    this.setState({
      perguntaAtual: this.state.perguntaAtual + 1,
    });
  };

  handleFinalizar = async () => {
    let pontuacao = this.state.acertos;
    if (
      this.state.opcaoSelecionada ===
      this.state.perguntas[this.state.perguntaAtual].resposta
    ) {
      this.setState({
        acertos: this.state.acertos + 1,
      });
      pontuacao = this.state.acertos + 1;
    }
    this.handleSalvarPontuacao(this.state.username, pontuacao);
  };

  handleSalvarPontuacao = async (usuario, pontuacao) => {
    const access_token = getToken();
    axios
      .post(
        "http://localhost:5555/atualizar-pontuacao",
        {
          username: usuario,
          novaPontuacao: pontuacao,
        },
        {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        }
      )
      .then(async (res) => {
        this.setState({
          resultado: true,
        });
        this.setState({
          perguntas: [],
        });
      });
  };

  handleVerRanking = async () => {
    this.setState({
      resultado: false,
    });
    this.setState({
      completo: true,
    });
  };

  handleOpcaoSelecionada = (opcao) => {
    this.setState({
      opcaoSelecionada: opcao,
    });
  };
  // Método de embaralhamento baseado no algorítimo de Fisher-Yates
  embaralha = (array) => {
    var m = array.length,
      t,
      i;

    while (m) {
      i = Math.floor(Math.random() * m--);
      t = array[m];
      array[m] = array[i];
      array[i] = t;
    }

    this.setState({
      alternativasEmbaralhadas: array,
    });
  };

  render() {
    return (
      <>
        {this.state.perguntas[0] && (
          <>
            <CardPergunta
              numeroPergunta={this.state.perguntaAtual}
              pergunta={this.state.perguntas[this.state.perguntaAtual].pergunta}
              alternativasEmbaralhadas={this.state.alternativasEmbaralhadas}
              handleProximaPergunta={this.handleProximaPergunta}
              handleOpcaoSelecionada={this.handleOpcaoSelecionada}
              handleFinalizar={this.handleFinalizar}
            />
          </>
        )}
        {this.state.resultado && (
          <Resultado
            acertos={this.state.acertos}
            handleVerRanking={this.handleVerRanking}
          />
        )}
        {this.state.completo && <Ranking />}
      </>
    );
  }
}

export default Questions;
