import "./styles.css";
import { Switch, Route, Link } from "react-router-dom";
import { HookBasedPage } from "./Pages/HookBasedPage";
import ReduxBasedPage from "./Pages/ReduxBasedPage";
export default function App() {
  return (
    <div className="App">
      <Switch>
        <Route path="/HookBasedPage">
          <HookBasedPage />
        </Route>
        <Route path="/ReduxBasedPage">
          <ReduxBasedPage />
        </Route>

        <Route path="/">
          <div>
            <h1>Welcome! </h1>
            <p>this is landing page</p>
            <Link to="/HookBasedPage">Hook-Page</Link>&nbsp;| &nbsp;
            <Link to="/ReduxBasedPage">Redux-Page</Link>
          </div>
        </Route>
      </Switch>
    </div>
  );
}
