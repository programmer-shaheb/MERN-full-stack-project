import React, { useEffect, useState, useCallback } from "react";
import {
  AppBar,
  Typography,
  Toolbar,
  Avatar,
  Button,
  Box,
} from "@material-ui/core";
import { Link, useHistory, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import useStyles from "./Style";
import decode from "jwt-decode";
import { notify } from "../../util/notify";

const Navbar = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));

  const logOut = useCallback(() => {
    notify("Logging Out", "success");
    dispatch({ type: "LOGOUT" });
    history.push("/");
    setUser(null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [history]);

  useEffect(() => {
    const token = user?.token;

    if (token) {
      const decodedToken = decode(token);
      if (decodedToken.exp * 1000 < new Date().getTime()) logOut();
    }

    setUser(JSON.parse(localStorage.getItem("profile")));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location, logOut]);

  return (
    <AppBar className={classes.appBar} position="static" color="inherit">
      <Box component={Link} to="/" className={classes.brandContainer}>
        <img
          src="https://photography.modeltheme.com/wp-content/themes/mtphotography/images/mtphotography_logo.png"
          alt="photography"
          className={classes.image}
        />
      </Box>

      <Toolbar className={classes.toolbar}>
        {user ? (
          <div className={classes.profile}>
            <Avatar
              className={classes.purple}
              alt={user?.result.name}
              src={user?.result.imageUrl}
            >
              {user?.result.name.charAt(0)}
            </Avatar>
            <Typography className={classes.userName} variant="h6">
              {user?.result.name}
            </Typography>
            <Button
              onClick={logOut}
              variant="contained"
              className={classes.logout}
              color="secondary"
            >
              Logout
            </Button>
          </div>
        ) : (
          <Button
            component={Link}
            to="/auth"
            variant="contained"
            color="primary"
          >
            Sign In
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
