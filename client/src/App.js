import React from 'react';
import { Route } from 'react-router';
import './App.css';
import Home from './Components/Home/Home'
import VideogameDetail from './Components/VideogameDetail/VideogamesDetail'
import Navbar from './Components/Navbar/Navbar';

function App() {

  return (
    <React.Fragment>
      <div className="App">
        <Navbar />
        <Route exact path="/" component={Home} />
        <Route exact path="/videogames/:id" component={VideogameDetail} />
      </div>

    </React.Fragment>

  );
}

export default App;
