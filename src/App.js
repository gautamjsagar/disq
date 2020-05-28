import React from 'react';
import './App.css';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Login from './Frontend/Auth/Login';
import Register from './Frontend/Auth/Register';
import ForgotPassword from './Frontend/Auth/ForgotPassword';

function App() {
  return (
    <div className="App">
      <BrowserRouter> 
        <Switch>  
          <Route exact path="/"  component={Login}  />
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <Route path="/forgotpassword" component={ForgotPassword} />  
        </Switch>
      </BrowserRouter>
    </div>
  );
}
export default App;