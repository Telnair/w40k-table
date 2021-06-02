import React, { useState } from "react";
import { Counter } from "./Counter";
import { Editable } from "./Editable";

export const General: React.FC = () => {
  const [ round, setRound ] = useState(0);

  return (
    <section className="general">
      <h1 className="mission">
        <Editable initialValue="Mission" className="accented" />
      </h1>
      <h2 className="round">Round: <Counter onChange={setRound} value={round} /></h2>
    </section>
  );
}