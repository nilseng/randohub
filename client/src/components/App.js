import React, { useEffect, useState } from "react";
import { Router, Switch, Route } from "react-router-dom";

import history from "../utils/history";

import PrivateRoute from "../containers/PrivateRoute";

import NavBar from "./NavBar";
import Profile from "./Profile";
import Feed from "./Feed";
import Summits from "./Summits";
import BucketList from "./BucketList";
import { useAuth0 } from "../containers/react-auth0-spa";

const defaultTrip = {
  _id: null,
  name: "Topptur",
  description: "",
  summitIds: null,
  imageIds: [],
};

const App = () => {
  const { getTokenSilently, loading } = useAuth0();
  const [token, setToken] = useState();

  const [trip, setTrip] = useState(defaultTrip);

  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (!loading) {
      const getTokenAsync = async () => {
        const token = await getTokenSilently();
        if (token)
          try {
            localStorage.setItem("token", token);
          } catch (e) {
            console.log(`Could not set item in localStorage: ${e}`);
          }
      };
      getTokenAsync();
    }
  }, [loading, getTokenSilently, token, setToken]);

  return (
    <>
      <Router history={history}>
        <header>
          <NavBar setShowModal={setShowModal} />
        </header>
        <Switch>
          <Route
            path="/"
            exact
            render={(props) => (
              <Feed
                trip={trip}
                setTrip={setTrip}
                defaultTrip={defaultTrip}
                setShowModal={setShowModal}
                showModal={showModal}
              />
            )}
          />
          <Route path="/summits" component={Summits} />
          <PrivateRoute path="/profile" component={Profile} />
          <PrivateRoute path="/bucketlist" component={BucketList} />
        </Switch>
      </Router>
    </>
  );
};

export default App;
