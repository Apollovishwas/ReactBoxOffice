import { Switch, Route } from "react-router-dom";
import React from "react";

function App() {
  return (
    <Switch>
      <Route exact path="/">
        This is the home page
      </Route>

      <Route exact path="/Starred">
        This one's starred
      </Route>

      <Route>This is 404 page. Not Found</Route>
    </Switch>
  );
}

export default App;
