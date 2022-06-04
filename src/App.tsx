import React, { useEffect } from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import Home from './components/Home';
import history from './routerHistory'
import { ToastContainer } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { connectWallet } from './components/walletconnect/connection';


const App: React.FC = () => {



  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(connectWallet());
  }, [dispatch])

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
