import {BrowserRouter as Router,Switch, Route} from "react-router-dom";
import Login from "./components/Login.js";
import Home from "./components/Home.js";
import Success from "./components/Success.js";
import Deleted from "./components/Deleted.js";
import Register from "./components/Register.js";
function App(){
  return <div>
    <Router>
      <Switch>
        <Route exact path="/">
            <Login/>
        </Route>
        <Route path="/home">
          <Home/>
        </Route>
        <Route path="/success">
          <Success/>
        </Route>
        <Route path="/deleted">
          <Deleted/>
        </Route>
        <Route path="/register">
          <Register/>
        </Route>
      </Switch>
    </Router>
  </div>
}
export default App;