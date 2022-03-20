import React from "react";
import { Switch, Route } from "react-router-dom";
import { ThemeProvider } from "styled-components";

import Home from "./Pages/Home";
import Show from "./Pages/Show";
import Starred from "./Pages/Starred";

const theme = {
  mainColors: {
    blue: "#2400ff",
    gray: "#c6c6c6",
    dark: "#353535",
  },
};

function App() {
  return (
    <div>
      <ThemeProvider theme={theme}>
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
      </ThemeProvider>
    </div>
  );
}

export default App;
