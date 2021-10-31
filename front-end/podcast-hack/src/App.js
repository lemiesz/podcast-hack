import React from "react";
import { useSelector } from "react-redux";
import { Route, Switch, useHistory } from "react-router-dom";
import Login from "./components/login/component";

import { Routes } from "./routes";

function App() {
  const user = useSelector((state) => state.user);
  const history = useHistory();

  if (user.id === "") {
    // console.log("Redirect");
    return <Login />;
  }
  return (
    <div className="App">
      <Switch>
        {Routes.map((item) => (
          <Route path={item.path} component={item.component} exact={true} />
        ))}
      </Switch>
    </div>
  );
}

export default App;
