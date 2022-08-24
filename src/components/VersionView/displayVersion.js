import React, { Component } from "react";
import { Grid, ListItem, withStyles } from "@material-ui/core";

import { styles } from "../../css-common"
import VersionDataService from "../../services/versionService"


class DisplayVersion extends Component {
  constructor(props) {
    super(props);
    this.setActiveVersion = this.setActiveVersion.bind(this);

    this.state = {
      versions: [],
      currentIndex: -1,
      roles: [],
    };
  }
  
  componentDidMount() {
    const idParam = this.props.match.params.id;
    this.retrieveVersionByConf(idParam);
  }

  retrieveVersionByConf(configuration) {
      VersionDataService.getAll(configuration)
      .then(response => {
        this.setState({
          versions: response.data
        });
      })
      .catch(e => {
        console.log(e);
      });
  }

  setActiveRoles(version) {
    var selectedRoles = [];
    for (const [key, value] of Object.entries(version.roles_set)) {
      selectedRoles.push({"value":value, "key":key})
      this.setState({
        roles: selectedRoles
      })
    }
  }

  setActiveVersion(version, index) {
    this.setState({
      currentVersion: version,
      currentIndex: index,
      roles: version.roles_set
    });
    this.setActiveRoles(version);
  }
  
  render() {
    const { classes } = this.props
    const { versions, roles, currentIndex, currentVersion} = this.state;

  const renderVersions = () => {
    return (
      <Grid item md={4}>
        <h2>Versions</h2>
        <div className="list-group">
          {versions &&
            versions.map((version, index) => (
              <ListItem
                selected={index === currentIndex}
                onClick={() => this.setActiveVersion(version, index)}
                divider
                button	
                key={index}>
                Version_{version.version}_{version.type_choice}
              </ListItem>
            ))}
        </div>
      </Grid>
    )
  }

  const renderItem = () => {
    return (
      <div className={classes.tutorial}>
        <h4>Version Detail</h4>
        <div className={classes.detail}>
          <label>
            <strong>Type:</strong>
          </label>{" "}
          {currentVersion.type_choice}
        </div>
        <div className={classes.detail}>
          <label>
            <strong>Createtion Date:</strong>
          </label>{" "}
          {currentVersion.created_at}
        </div>
        <div className={classes.detail}>
          <label>
            <strong>Last Update Date:</strong>
          </label>{" "}
          {currentVersion.updated_at}
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
      </div>
    )
  }

  const selectItem = () => {
    return (
      <div>
        <br />
        <p className={classes.tutorial}>Please Select a Version...</p>
      </div>
    )
  }

  return (
    <div className={classes.form}>
      <Grid container>
        {renderVersions()}
        <Grid item md={6}>
          {currentVersion ? (
            renderItem()
          ) : (
            selectItem()
          )}
        </Grid>
      </Grid>
    </div>
  );}
  }
  
  export default withStyles(styles)(DisplayVersion)