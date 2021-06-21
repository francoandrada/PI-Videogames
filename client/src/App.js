import React from 'react';
import { Route } from 'react-router';
import './App.css';
import Home from './Components/Home/Home'
import VideogameDetail from './Components/VideogameDetail/VideogamesDetail'
import Navbar from './Components/Navbar/Navbar';
import Footer from './Components/Footer/Footer';
import Welcome from './Components/Welcome/Welcome';
import VideogameCreate from './Components/VideogameCreate/VideogameCreate';
import NotFound from './Components/NotFound/NotFound';

function App() {

  return (
    <React.Fragment>

      <div class="noFooter">
        <Route exact path="/" component={Welcome} class="noFooter"/>     
        <Route path="/videogames" component={Navbar} />
        <Route exact path="/videogames" component={Home} class="noFooter"/>
        <Route exact path="/videogames/notFound" component={NotFound}/>
        <Route exact path="/videogames/:id" component={VideogameDetail}/>
        <Route exact path="/videogame/create" component={VideogameCreate}/>
      </div>
        <Route path="/" component={Footer} />

    </React.Fragment>

  );
}

export default App;
