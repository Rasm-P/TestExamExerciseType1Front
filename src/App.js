import React, { useEffect, useState } from "react";
import { HashRouter as Router, Switch, Route } from "react-router-dom";
import { catchHttpErrors } from "./utils";
import "./App.css";
import StartPage from "./components/Home";
import LogIn from "./components/LogIn";
import Header from "./components/Header";
import Logout from "./components/Logout";
import SearchForPersons from "./components/SearchForPersons";
import Adminpage from "./components/Adminpage";

const NoMatch = () => {
  return <h3>The page was not found.</h3>;
};

function App({ loginFacade, EndpointFacade }) {
  const [loggedIn, setLoggedIn] = useState(false);
  const [allPersons, setAllPersons] = useState([]);
  const [update, setUpdate] = useState(false);

  // check token regularly
  useEffect(() => {
    const interval = setInterval(() => {
      setLoggedIn(loginFacade.loggedIn());
    }, 10000);
    setLoggedIn(loginFacade.loggedIn());
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    EndpointFacade.fetchAllPersons()
      .then(data => setAllPersons(data))
      .catch(catchHttpErrors);
    setUpdate(false);
  }, [update]);

  return (
    <Router>
      <Header loginFacade={loginFacade} loggedIn={loggedIn} />
      <Switch>
        <Route exact path="/">
          <StartPage />
        </Route>
        <Route path="/login">
          <LogIn
            apiFacade={loginFacade}
            loggedIn={loggedIn}
            setLoggedIn={setLoggedIn}
          />
        </Route>
        <Route path="/logout">
          <Logout
            apiFacade={loginFacade}
            loggedIn={loggedIn}
            setLoggedIn={setLoggedIn}
          />
        </Route>
        <Route path="/searchforpersons">
          <SearchForPersons
            loggedIn={loggedIn}
            allPersons={allPersons}
            EndpointFacade={EndpointFacade}
          />
        </Route>
        <Route path="/adminpage">
          <Adminpage
            loggedIn={loggedIn}
            allPersons={allPersons}
            EndpointFacade={EndpointFacade}
            setUpdate={setUpdate}
          />
        </Route>
        <Route>
          <NoMatch />
        </Route>
      </Switch>
    </Router>
  );
}
export default App;
