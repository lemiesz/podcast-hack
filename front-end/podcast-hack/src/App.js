import logo from './logo.svg';
import './App.css';
import React from 'react';
import { Route, Switch } from 'react-router-dom';
import UploadPodcast from './components/UploadPocast';
import { doc, setDoc } from "firebase/firestore"; 
import { db } from './firebase';

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
