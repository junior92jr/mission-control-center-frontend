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
      serviceError: false
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
        this.setState({
          serviceError: true
        })
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
    const { 
      configurations, 
      roles, 
      currentIndex, 
      currentConfiguration, 
      serviceError} = this.state;

    const renderServiceError = () => {
      return (
        <div className={classes.form}>
          <h2>Service Not available</h2>
        </div>
      )
    }

    const renderConfigurations = () => {
      return (
        <Grid item md={4}>
          <h2>Configurations</h2>
          <div className="list-group">
            {configurations &&
              configurations.map((configuration, index) => (
                <ListItem
                  selected={index === currentIndex}
                  onClick={() => this.setActiveConfiguration(configuration, index)}
                  divider
                  button	
                  key={index}
                >
                  Configuration_{configuration.id}_{configuration.type_choice}
                </ListItem>
              ))}
          </div>
        </Grid>
      )
    }

    const renderButtons = () => {
      return (
        <>
          <Link
            to={"/configurations/" + currentConfiguration.id + "/versions"}
            className={classes.edit}
          >
            Versions
          </Link>
        </>
      )
    }

    const displayItem = () => {
      return (
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
          {renderButtons()}
        </div>
      )
    }

    const selectItem = () => {
      return (
        <div>
          <br />
          <p className={classes.tutorial}>Please Select a Configuration...</p>
        </div>
      )
    }

    if (serviceError) {
      return renderServiceError()
    } else {
      return (
        <div className={classes.form}>
          <Grid container>
            {renderConfigurations()}

            <Grid item md={6}>
              {currentConfiguration ? (
                displayItem()
              ) : (
                selectItem()
              )}
            </Grid>
          </Grid>
        </div>
      )}
    }
  }
  
  export default withStyles(styles)(DisplayConfiguration)