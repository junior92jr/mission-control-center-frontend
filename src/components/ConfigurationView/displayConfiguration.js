import React, { Component } from "react";
import { Grid, ListItem, withStyles } from "@material-ui/core";
import { Link } from "react-router-dom";

import { styles } from "../../css-common"
import ConfigurationDataService from "../../services/configurationService";


class DisplayConfiguration extends Component {
  constructor(props) {
    super(props);
    this.setActiveConfiguration = this.setActiveConfiguration.bind(this);

    this.state = {
      configurations: [],
      currentIndex: -1,
      roles: [],
    };
  }
  
  componentDidMount() {
    const idParam = this.props.match.params.id;
    this.retrieveConfigurationByApp(idParam);
  }

  retrieveConfigurationByApp(application) {
    ConfigurationDataService.getAll(application)
      .then(response => {
        this.setState({
          configurations: response.data
        });
      })
      .catch(e => {
        console.log(e);
      });
  }

  setActiveRoles(configuration) {
    var selectedRoles = [];
    for (const [key, value] of Object.entries(configuration.roles_set)) {
      selectedRoles.push({"value":value, "key":key})
      this.setState({
        roles: selectedRoles
      })
    }
  }

  setActiveConfiguration(configuration, index) {
    this.setState({
      currentConfiguration: configuration,
      currentIndex: index,
      roles: configuration.roles_set
    });
    this.setActiveRoles(configuration);
  }
  
  render() {
    const { classes } = this.props
    const { configurations, roles, currentIndex, currentConfiguration} = this.state;
      
    return (
      <div className={classes.form}>
        <Grid container>
          <Grid item md={4}>
            <h2>Configuration List</h2>
            <div className="list-group">
              {configurations &&
                configurations.map((configuration, index) => (
                  <ListItem
                    selected={index === currentIndex}
                    onClick={() => this.setActiveConfiguration(configuration, index)}
                    divider
                    button	
                    key={index}>
                    Configuration_{configuration.id}_{configuration.type_choice}
                  </ListItem>
                ))}
            </div>
          </Grid>

          <Grid item md={6}>
            {currentConfiguration ? (
              <div className={classes.tutorial}>
                <h4>Configuration Detail</h4>
                <div className={classes.detail}>
                  <label>
                    <strong>Type:</strong>
                  </label>{" "}
                  {currentConfiguration.type_choice}
                </div>
                <div className={classes.detail}>
                  <label>
                    <strong>Createtion Date:</strong>
                  </label>{" "}
                  {currentConfiguration.created_at}
                </div>
                <div className={classes.detail}>
                  <label>
                    <strong>Last Update Date:</strong>
                  </label>{" "}
                  {currentConfiguration.updated_at}
                </div>
                <div className={classes.detail}>
                  <label>
                    <strong>Status:</strong>
                  </label>{" "}
                  Pending
                </div>
                <div className={classes.detail}>
                  <label>
                    <strong>Roles:</strong>
                  </label>{" "}
                  <div className="list-group">
                    {roles &&
                      roles.map((item, index) => (
                        <>
                          <div className={classes.detail}>
                            <strong>{item.key}</strong>: {item.value}
                          </div>
                        </>
                      ))}
                  </div>
                </div>
                <Link
                  to={"/configurations/" + currentConfiguration.id + "/versions"}
                  className={classes.edit}
                >
                  Versions
              </Link>
              </div>
            ) : (
                <div>
                  <br />
                  <p className={classes.tutorial}>Please click on a Configuration...</p>
                </div>
              )}
          </Grid>
        </Grid>
      </div>
    );}
  }
  
  export default withStyles(styles)(DisplayConfiguration)