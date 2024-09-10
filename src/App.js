import React from 'react';
import HomePage from "./pages/HomePage";


console.log(process.env.REACT_APP_API_POKEMON_V2)

function App() {
  return (
    <div className="App">
      <HomePage />
    </div>
  );
}

export default App;
