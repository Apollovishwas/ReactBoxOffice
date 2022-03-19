import React from "react";
import { Switch, Route } from "react-router-dom";
import Nav from "./Components/Nav";
import Home from "./Pages/Home";
import Starred from "./Pages/Starred";

function App() {
  return (
    <div>
      <Nav />
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>

        <Route exact path="/Starred">
          <Starred />
        </Route>

        <Route>This is 404 page. Not Found</Route>
      </Switch>
    </div>
  );
}

export default App;
