import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {
  Avatar,
  Button,
  Paper,
  Grid,
  Typography,
  Container,
  Grow,
} from "@material-ui/core";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import useStyles from "./Style";
import Input from "./Input";
import { GoogleLogin } from "react-google-login";
import Icon from "./icon";
import { useHistory } from "react-router-dom";

const Auth = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();

  const [showPassword, setShowPassword] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);

  const handleSubmit = () => {};
  const handleChange = () => {};
  const googleSuccess = async (res) => {
    const result = res?.profileObj;
    const token = res?.tokenId;

    try {
      dispatch({ type: "AUTH", data: { result, token } });
      history.push("/");
    } catch (error) {
      console.log(error);
    }
  };
  const googleFailure = () => {
    console.log("Log In Failed");
  };

  const handleShowPassword = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const switchMode = () => {
    setIsSignUp((prevLogin) => !prevLogin);
    handleShowPassword(false);
  };

  return (
    <Container component="main" maxWidth="xs">
      <Grow in>
        <Paper elevation={3} className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            {isSignUp ? "Sign Up" : "Sign In"}
          </Typography>
          <form className={classes.form} onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              {isSignUp && (
                <>
                  <Input
                    name="firstName"
                    label="First Name"
                    autoFocus
                    half
                    handleChange={handleChange}
                  />
                  <Input
                    name="lastName"
                    label="Last Name"
                    half
                    handleChange={handleChange}
                  />
                </>
              )}
              <Input
                name="email"
                label="Email Address"
                type="email"
                handleChange={handleChange}
              />
              <Input
                name="password"
                label="Password"
                type={showPassword ? "text" : "password"}
                handleShowPassword={handleShowPassword}
                handleChange={handleChange}
              />
              {isSignUp && (
                <>
                  <Input
                    name="confirmPassword"
                    label="Repeat Password"
                    handleChange={handleChange}
                    type="password"
                  />
                </>
              )}
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              {isSignUp ? "Sign Up" : "Sign In"}
            </Button>
            <GoogleLogin
              clientId="245675464152-8u81n5iqnpt105hljs8f1ve0tebul01o.apps.googleusercontent.com"
              render={(renderProps) => (
                <Button
                  onClick={renderProps.onClick}
                  variant="contained"
                  color="primary"
                  fullWidth
                  disabled={renderProps.disabled}
                  className={classes.googleButton}
                  startIcon={<Icon />}
                >
                  Google Sign In
                </Button>
              )}
              onSuccess={googleSuccess}
              onFailure={googleFailure}
              cookiePolicy={"single_host_origin"}
            />
            <Grid container justify="flex-end">
              <Grid item>
                <Button onClick={switchMode}>
                  {isSignUp
                    ? "Already Have An Account? Sign In"
                    : "Don't Have An Account? Sign Up"}
                </Button>
              </Grid>
            </Grid>
          </form>
        </Paper>
      </Grow>
    </Container>
  );
};

export default Auth;
