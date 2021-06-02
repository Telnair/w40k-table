import React from 'react';
import { Faction } from './components/Faction';
import { General } from './components/General';

import './App.css';

const App: React.FC = () => {
  return (
    <main>
      <General />
      <section className="table">
        <Faction />
        <Faction />
      </section>
    </main>
  );
}

export default App;
