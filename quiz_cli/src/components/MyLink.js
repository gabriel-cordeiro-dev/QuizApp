import React from "react";

import "../styles/mylink.css";

export function MyLink(props) {
  const { texto, to } = props;
  return (
    <a className="myLink" href={to}>
      {texto}
    </a>
  );
}
