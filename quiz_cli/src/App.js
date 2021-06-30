import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

import "./styles/global.css";

import PerguntasLayout from "./components/PerguntasLayout";
import Questions from "./components/Questions";
import { Ranking } from "./components/Ranking";
import LoginForm from "./components/LoginForm";
import { isAuth } from "./utils/auth";

function App() {
  return (
    <PerguntasLayout>
      <Router>
        <Switch>
          <Route
            path="/pergunta"
            render={() => (isAuth() ? <Questions /> : <Redirect to="/login" />)}
          />
          <Route
            path="/ranking"
            render={() => (isAuth() ? <Ranking /> : <Redirect to="/login" />)}
          />
          <Route
            path="/login"
            render={() =>
              isAuth() ? <Redirect to="/pergunta" /> : <LoginForm />
            }
          />
          <Route path="/" render={() => <Ranking />} />
        </Switch>
      </Router>
    </PerguntasLayout>
  );
}

export default App;
