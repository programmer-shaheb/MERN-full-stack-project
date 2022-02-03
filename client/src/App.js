import React, { lazy, Suspense } from "react";
import { Container, LinearProgress } from "@material-ui/core";
import Navbar from "./components/Navbar/Navbar";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

const Home = lazy(() => import("./components/Home/Home"));
const PostDetails = lazy(() => import("./components/PostDetails/PostDetails"));
const Auth = lazy(() => import("./components/Auth/Auth"));

const App = () => {
  const user = JSON.parse(localStorage.getItem("profile"));

  return (
    <Router>
      <Container maxWidth="xl">
        <Navbar />
        <Suspense fallback={<LinearProgress />}>
          <Switch>
            <Route path="/" exact component={() => <Redirect to="/posts" />} />
            <Route path="/posts" exact component={Home} />
            <Route path="/posts/search" exact component={Home} />
            <Route path="/posts/:id" exact component={PostDetails} />
            <Route
              path="/auth"
              exact
              component={() => (!user ? <Auth /> : <Redirect to="/posts" />)}
            />
          </Switch>
        </Suspense>
      </Container>
    </Router>
  );
};

export default App;
