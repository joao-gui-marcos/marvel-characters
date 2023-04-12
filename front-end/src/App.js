import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import './App.css'

import Characters from "./pages/Characters";
import CharacterDetails from "./pages/CharacterDetails";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Characters />
        </Route>
        <Route exact path="/characters/:id">
          <CharacterDetails />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
