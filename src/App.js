import React from "react";
import 'antd/dist/antd.css';
import "./App.css";
import { Switch, Route, BrowserRouter } from "react-router-dom";
import Home from "./pages/Home";
import PageNotFound from "./pages/pageNotFound";
import Login from "./pages/Login";
import Register from "./pages/Register";
import PrivateRoute from "./utils/privateRouter";
import AddMovie from "./pages/addMovie";
import Index from "./pages/Index";

function App() {
  return (
      <>
      <BrowserRouter>
        <Switch>
            <Route exact path="/" component={Index} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />
            <PrivateRoute component={Home} exact path="/home"/>
            <PrivateRoute component={AddMovie} exact path="/add-movie"/>
            <PrivateRoute component={PageNotFound} exact path="*"/>
          </Switch>
      </BrowserRouter>
      </>
  );
}

export default App;
