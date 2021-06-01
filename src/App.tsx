import React, { useMemo, useState } from 'react';
import './App.css';

const App: React.FC = () => {
  const [ round, setRound ] = useState(0);

  return (
    <main>
      <section className="general">
        <h1 className="mission">
          <Editable initialValue="Mission" className="accented" />
        </h1>
        <h2 className="round">Round: <Counter onChange={setRound} value={round} /></h2>
      </section>
      <section className="table">
        <FactionTable />
        <FactionTable />
      </section>
    </main>
  );
}

const FactionTable: React.FC = () => {
  const [ primaryVP, setPrimaryVP ] = useState(0);
  const [ firstSecondaryVP, setFirstSecondaryVP ] = useState(0);
  const [ secondSecondaryVP, setSecondSecondaryVP ] = useState(0);
  const [ thirdSecondaryVP, setThirdSecondaryVP ] = useState(0);
  const [ currentCP, setCurrentCP ] = useState(0);

  const totalVP = useMemo(
    () => primaryVP + firstSecondaryVP + secondSecondaryVP + thirdSecondaryVP,
    [ primaryVP, firstSecondaryVP, secondSecondaryVP, thirdSecondaryVP ]
  );

  return (
    <article className="table__player">
      <p className="table__input-block faction">Faction: <Editable initialValue="Name" className="accented" /></p>
      <p className="important">CP: <Counter onChange={setCurrentCP} value={currentCP} /></p>
      <p className="important">VP: <span className="accented">{totalVP}</span></p>
      <ul className="objectives">
        <li>Primary: <Counter step={5} onChange={setPrimaryVP} value={primaryVP} /></li>
        <li className="table__input-block"><Editable initialValue="Sec 1" />: <Counter onChange={setFirstSecondaryVP} value={firstSecondaryVP} /></li>
        <li className="table__input-block"><Editable initialValue="Sec 2" />: <Counter onChange={setSecondSecondaryVP} value={secondSecondaryVP} /></li>
        <li className="table__input-block"><Editable initialValue="Sec 3" />: <Counter onChange={setThirdSecondaryVP} value={thirdSecondaryVP} /></li>
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
  const handleEnterKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') handleToggle();
  }

  return (
    <span className={className} style={{ cursor: 'pointer' }}>
      {isEdited
        ? <input
          type="text"
          className="editable"
          value={value}
          onChange={handleChange}
          onBlur={handleToggle}
          onKeyDown={handleEnterKey}
          autoFocus
          onFocus={handleFocus}
          spellCheck="false"
        />
        : <span onClick={handleToggle}>{value || initialValue}</span>
      }
    </span>
  );
}

const Counter: React.FC<{ step?: number; onChange: (value: number) => void; value: number }> = (props) => {
  const { value, step = 1, onChange } = props;

  const handleClick = (e: React.MouseEvent<HTMLSpanElement>) => {
    const isDecrement = e.shiftKey;
    const nextValue = value + step * (isDecrement ? -1 : 1);
    onChange(nextValue);
  }

  return (
    <span className="accented counter" style={{ cursor: 'pointer' }} onClick={handleClick}>{value}</span>
  );
};

export default App;
