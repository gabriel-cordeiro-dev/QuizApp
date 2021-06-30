import React from "react";

import { isAuth, logout } from "../utils/auth";
import { BotaoNav } from "./BotaoNav";
import { MyLink } from "./MyLink";
import "../styles/header.css";

export function Header(props) {
  const autenticado = isAuth();

  return (
    <header>
      <div className="logo">
        <div className="numeroslinha1">
          <div className="numero2">
            <div className="numero">2</div>
          </div>
        </div>
        <div className="numeroslinha2">
          <div className="numero1">
            <div className="numero">1</div>
          </div>
          <div className="numero3">
            <div className="numero">3</div>
          </div>
        </div>
      </div>
      <div className="customnavbar">
        <h1 className="titulo">MUNDO DOS NÚMEROS</h1>
        <nav>
          <BotaoNav texto="Cadastro de Jogadores" onClick={() => logout()} /> |{" "}
          {autenticado ? (
            <BotaoNav texto="Logout" onClick={() => logout()} />
          ) : (
            <MyLink to="/login" texto="Login" />
          )}
        </nav>
      </div>
    </header>
  );
}
