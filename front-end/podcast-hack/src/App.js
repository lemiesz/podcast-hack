import React from "react";
import { useSelector } from "react-redux";
import { Redirect, Route, Switch, useHistory } from "react-router-dom";
import Login from "./components/login/component";
import { auth } from "./firebase";
import { Routes } from "./routes";

function App() {
  const user = useSelector((state) => state.user);
  const history = useHistory();

  if (!auth.currentUser) {
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
