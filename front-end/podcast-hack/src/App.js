import logo from './logo.svg';
import './App.css';
import React from 'react';
import { Route, Switch } from 'react-router-dom';
import UploadPodcast from './components/UploadPocast';


function App() {
  return (
    <div className="App">
      <Switch>
        <Route>
          <UploadPodcast />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
