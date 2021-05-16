import React, { useState } from 'react';
import './App.css';

const App: React.FC = () => {
  return (
    <main>
      <h1 className="mission">
        <Editable initialValue="Mission" className="accented" />
      </h1>
      <h2 className="round">Round: <Counter /></h2>
      <section className="table">
        <FactionTable />
        <FactionTable />
      </section>
    </main>
  );
}

const FactionTable: React.FC = () => {
  const [ victoryPoints, setVictoryPoints ] = useState([ 0, 0, 0, 0 ]);

  const makeVPChangeHandler = (idx: number) => (value: number) => {
    const updatedVP = [ ...victoryPoints ];
    updatedVP[idx] = value;
    setVictoryPoints(updatedVP);
  }

  const totalVP = victoryPoints.reduce((res, i) => res += i, 0);

  return (
    <article className="table__player">
      <p>Faction: <Editable initialValue="Name" className="accented" /></p>
      <p className="important">CP: <Counter /></p>
      <p className="important">VP: <span className="accented">{totalVP}</span></p>
      <ul className="objectives">
        <li>Primary: <Counter step={5} onChange={makeVPChangeHandler(0)} /></li>
        <li><Editable initialValue="Sec 1" />: <Counter onChange={makeVPChangeHandler(1)} /></li>
        <li><Editable initialValue="Sec 2" />: <Counter onChange={makeVPChangeHandler(2)} /></li>
        <li><Editable initialValue="Sec 3" />: <Counter onChange={makeVPChangeHandler(3)} /></li>
      </ul>
    </article>
  );
}

const Editable: React.FC<{ initialValue: string; className?: string; }> = (props) => {
  const { initialValue, className } = props;
  const [ isEdited, setIsEdited ] = useState(false);
  const [ value, setValue ] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  }

  const handleToggle = () => setIsEdited(!isEdited);
  const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => e.target.select();

  return (
    <span className={className}>
      {isEdited
        ? <input
          type="text"
          className="editable"
          value={value}
          onChange={handleChange}
          onBlur={handleToggle}
          autoFocus
          onFocus={handleFocus}
          spellCheck="false"
        />
        : <span onClick={handleToggle}>{value || initialValue}</span>}
    </span>
  );
}

const Counter: React.FC<{ initialValue?: number; step?: number; onChange?: (value: number) => void; }> = (props) => {
  const { initialValue = 0, step = 1, onChange } = props;
  const [ value, setValue ] = useState(initialValue);

  const handleClick = (e: React.MouseEvent<HTMLSpanElement>) => {
    const isDecrement = e.shiftKey;
    const nextValue = value + step * (isDecrement ? -1 : 1);
    setValue(nextValue);
    if (onChange) onChange(nextValue);
  }

  return (
    <span style={{ width: 50 }} className="accented" onClick={handleClick}>{value}</span>
  );
};

export default App;
