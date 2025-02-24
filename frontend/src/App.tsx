import React from 'react';
import Chat from './components/Chat';
import './styles/Chat.css';

function App() {
  return (
    <div className="App">
      <header>
        <h1>Customer Support Assistant</h1>
      </header>
      <main>
        <Chat />
      </main>
    </div>
  );
}

export default App;
