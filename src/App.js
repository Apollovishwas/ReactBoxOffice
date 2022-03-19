import React from "react";
import { Switch, Route } from "react-router-dom";

import Home from "./Pages/Home";
import Show from "./Pages/Show";
import Starred from "./Pages/Starred";

function App() {
  return (
    <div>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>

        <Route exact path="/Starred">
          <Starred />
        </Route>
        <Route exact path="/Show/:id">
          <Show />
        </Route>

        <Route>This is 404 page. Not Found</Route>
      </Switch>
    </div>
  );
}

export default App;
