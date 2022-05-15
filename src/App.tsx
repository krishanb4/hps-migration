import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import Home from './components/Home';
import history from './routerHistory'
import { ToastContainer } from 'react-toastify';




const App: React.FC = () => {



  return (
    <Router history={history}>
      <Switch>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
      <ToastContainer />
    </Router>
  )
}



export default App;
