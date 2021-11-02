import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import './app.css';
import ForgotPassword from './pages/ForgetPassword';
import Register from './pages/Register';
import ResetForm from './pages/ResetForm';
import NotFound from './pages/NotFound';
function App() {
  return (
    <>
      <Router>
        <Switch>
          <Route path="/" exact>
            <Login />
          </Route>
          <Route path="/forgot" exact>
            <ForgotPassword />
          </Route>
          <Route path="/dashboard" exact>
            <Dashboard />
          </Route>
          <Route path="/register" exact>
            <Register />
          </Route>
          <Route path="/reset/:resetId" exact>
            <ResetForm />
          </Route>
          <Route path="/activate/:username&:ac_status" exact>
            <Login />
          </Route>
          <Route path="*" ><NotFound/></Route>

        </Switch>
      </Router>
    </>
  );
}

export default App;
