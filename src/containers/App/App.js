import React, { Component } from "react";
import { Switch, Route, Link } from "react-router-dom";
import { AppBar, Toolbar, Typography, withStyles } from '@material-ui/core';

import "./App.css";

import {styles} from "../../css-common"
import {
  DisplayConfiguration, 
  CreateConfiguration, 
  EditConfiguration} from "../../components/ConfigurationView";
import {DisplayApplication} from "../../components/ApplicationView";


class App extends Component {
  render() {
    const { classes } = this.props

    return (
      <div>
        <AppBar className={classes.appBar} position="static">
          <Toolbar>
            <Typography className={classes.name} variant="h6">
              N26
            </Typography>
            <Link to={"/applications"} className={classes.link}>
              <Typography variant="body2">
                Applications
            </Typography>
            </Link>
          </Toolbar>
        </AppBar>

          <Switch>
            <Route exact path={["/", "/applications"]} component={DisplayApplication} />
            <Route exact path={["/applications/:id/configurations/"]} component={DisplayConfiguration} />
            <Route exact path={["/applications/:id/configurations/add/"]} component={CreateConfiguration} />
            <Route exact path={["/configurations/:id/edit/"]} component={EditConfiguration} />
          </Switch>
      </div>
    );
  }
}

export default withStyles(styles)(App);