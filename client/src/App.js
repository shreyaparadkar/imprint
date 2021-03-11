import React, { useEffect } from 'react';
import { Switch, Route, useHistory } from 'react-router-dom';
import jwt_decode from 'jwt-decode';

import { ProtectedRoute } from './routes/protected.route';
import UserAuth from './screens/userAuth';
import Dashboard from './screens/dashboard';
import pageNotFound from './screens/404';
import Home from './components/dashboard/home';
import addNotes from './components/dashboard/addNotes';
import removeClient from './components/dashboard/removeClient';
import viewClient from './components/dashboard/viewClient';
import auth from './auth/auth';

const dashboardRoutes = () => {
  return <Switch>
    <ProtectedRoute path='/dashboard/add' component={addNotes} />
    <ProtectedRoute path='/dashboard/remove' component={removeClient} />
    <ProtectedRoute path='/dashboard/view' component={viewClient} />
    <ProtectedRoute path='/dashboard' component={Home} />
  </Switch>
}

const App = () => {
  
  const history = useHistory();

  useEffect(() => { 
    if (localStorage.login) {
      const login = JSON.parse(localStorage.login);
      const decoded = jwt_decode(login.token);
      
      const currentTime = Date.now() / 1000;
      if (decoded.exp < currentTime) {
        auth.logout(() => { history.push('/') });
      }

      if (history.location.pathname === '/')
        history.push('/dashboard');
    } 
  });
  
  return (
    <div className="App">
      <Switch>
        <Route exact path="/" component={UserAuth} />
        <ProtectedRoute path="/dashboard" component={()=><Dashboard routes={dashboardRoutes}/>}/>
        <Route path="*" component={pageNotFound} />
      </Switch>
    </div>
  )
}

export default App;