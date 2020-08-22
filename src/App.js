import React from 'react';
import logo from './logo.svg';
import './App.css';
import Terrain2d from './Terrain2d';
import Terrain3d from './Terrain3d';

function App() {
  return (
    <div className="App">
      <div>
        <h1>2d Terrain canvas</h1>
        <h3>Draw terrain(DEM) data.</h3>
      </div>
      <div>
        <Terrain2d/>
      </div>
      <div>
        <h1>Generate 3d Terrain</h1>
      </div>
      <div>
        <Terrain3d/>
      </div>
    </div>
  );
}

export default App;
