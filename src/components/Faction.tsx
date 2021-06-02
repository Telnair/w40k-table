import React, { useState } from "react";
import { Counter } from "./Counter";
import { Editable } from "./Editable";

export const Faction: React.FC = () => {
  const [ primaryVP, setPrimaryVP ] = useState(0);
  const [ secondaryVP, setSecondaryVP ] = useState([ 0, 0, 0 ]);
  const [ currentCP, setCurrentCP ] = useState(0);

  const totalVP = secondaryVP.reduce<number>((res, curr) => res += curr, primaryVP);

  const makeSecondaryChangeHandler = (idx: number) => (value: number) => {
    const nextValue = [ ...secondaryVP ];
    nextValue[idx] = value;
    setSecondaryVP(nextValue);
  }

  return (
    <article className="table__player">
      <p className="table__input-block faction">Faction: <Editable initialValue="Name" className="accented" /></p>
      <p className="important">CP: <Counter onChange={setCurrentCP} value={currentCP} /></p>
      <p className="important">VP: <span className="accented">{totalVP}</span></p>
      <ul className="objectives">
        <li>Primary: <Counter step={5} onChange={setPrimaryVP} value={primaryVP} /></li>
        {secondaryVP.map((v, idx) => (
          <Secondary initialValue={`Secondary ${idx + 1}`} value={v} onChange={makeSecondaryChangeHandler(idx)} />
        ))}
      </ul>
    </article>
  );
}

const Secondary: React.FC<{ initialValue: string; value: number; onChange: (value: number) => void }> = (props) => {
  const { initialValue, onChange, value } = props;

  return (
    <li className="table__input-block">
      <Editable initialValue={initialValue} />: <Counter onChange={onChange} value={value} />
    </li>
  )
}