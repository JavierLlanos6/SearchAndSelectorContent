import './App.css';

import React from 'react';
import Select from 'react-select';

const options = [
  {value: 'all', label: 'All'},
  {value: 'music', label: 'Music'},
  {value: 'tvShow', label: 'TvShow'},
]

function App() {
  return (
    <div className="App">
      <h1>Search your artist!</h1>
      <input 
        type='text'
        placeholder='Name of artist'
        value='{none}'
        onChange='{none}'
      />
      <Select 
        options = {options}
      />  
      <button>
        Buscar
      </button>     
    </div>
  );
}

export default App;
