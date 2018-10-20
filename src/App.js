import React, { Component } from 'react';
import './App.css';
import { BrowserRouter, Route } from 'react-router-dom';
import { Main } from './components/Main';
import List from './components/List';
import Question from './components/Question';

const Layout = () => (
  <div style={{ height: '100%' }}>
    <Route exact path="/" component={Main} />
    <Route exact path="/list" component={List} />
    <Route exact path="/question" component={Question} />
  </div>
);

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Layout />
      </BrowserRouter>
    );
  }
}

export default App;
