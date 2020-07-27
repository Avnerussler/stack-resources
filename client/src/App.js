import React from "react";
import { MainGrid } from "./component/MainGrid";
import { Grid } from "./component/Grid";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { UploadXlsx } from "./component/UploadXlsx";

import "./App.css";

const App = () => {
  return (
    <Router>
      <Switch>
        <Route path="/upload">
          <UploadXlsx />
        </Route>
        <Route path="/">
          <Grid />
        </Route>
      </Switch>
    </Router>
  );
};

{
  /* <MainGrid></MainGrid> */
}
export default App;
