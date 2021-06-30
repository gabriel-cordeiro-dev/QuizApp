import React from "react";

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import { Botao } from "./Botao";
import { login } from "../utils/auth";

import "../styles/loginform.css";

class LoginForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      password: "",
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  handleSubmit(e) {
    e.preventDefault();

    const options = {
      method: "post",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(this.state),
    };

    fetch("http://localhost:5555/login", options)
      .then((res) => {
        if (!res.ok) {
          console.log(res.status);
          alert(res.statusText);
        }

        return res.json();
      })
      .then((data) => {
        login(data.token);
        window.location.href = "/pergunta";
      })
      .catch((err) => console.log(err));
  }

  render() {
    const formStyle = {
      width: "100%",
      maxWidth: 600,
      background: "skyblue",
      padding: "50px 0 0 0",
    };
    const labelStyle = {
      width: "60px",
      display: "flex",
      alignItens: "center",
      justifyContent: "flex-end",
      marginRight: "10px",
      background: "skyblue",
      fontSize: "20px",
      fontWeight: "600",
    };
    const formControlStyle = {
      borderRadius: "0",
      width: "390px",
    };

    return (
      <Row className="py-5">
        <Col>
          <div className="tituloForm">Login de Jogador</div>
          <div className="formLogin">
            <Form
              onSubmit={this.handleSubmit}
              style={formStyle}
              className="mx-auto"
            >
              <Form.Group controlId="username">
                <div className="inputField">
                  <Form.Label style={labelStyle}>Usuário:</Form.Label>
                  <Form.Control
                    type="text"
                    name="username"
                    style={formControlStyle}
                    onChange={this.handleChange}
                    value={this.state.username}
                  />
                </div>
              </Form.Group>
              <Form.Group controlId="password">
                <div className="inputField">
                  <Form.Label style={labelStyle}>Senha:</Form.Label>
                  <Form.Control
                    type="password"
                    name="password"
                    style={formControlStyle}
                    onChange={this.handleChange}
                    value={this.state.password}
                  />
                </div>
              </Form.Group>
              <div className="botaoFormulario">
                <Botao type="submit" texto="Entrar" />
              </div>
            </Form>
          </div>
        </Col>
      </Row>
    );
  }
}

export default LoginForm;
