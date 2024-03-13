import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Editor from "./Editor";
import "./App.css";

export default function App() {
  return (
    <div className="App">
      <h1 className="m-10">Decentralised Collaborative Editor</h1>
      <Router>
        <Switch>
          <Route exact path="/" children={<Editor />} />
          <Route path="/:id" children={<Editor />} />
        </Switch>
      </Router>
    </div>
  );
}
