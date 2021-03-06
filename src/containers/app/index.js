import React from 'react'
import { Route } from 'react-router-dom'
import Home from '../home'
import About from '../about'
import Header from './header';
import GamePage from '../game';

import './app.css';

const App = () => (
  <div>
    <Header />

    <main>
      <Route exact path="/" component={Home} />
      <Route exact path="/about-us" component={About} />
      <Route exact path="/game/:debug?" component={GamePage} />
    </main>
  </div>
)

export default App
