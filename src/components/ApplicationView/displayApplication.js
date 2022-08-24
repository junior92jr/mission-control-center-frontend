import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Grid, ListItem, withStyles } from "@material-ui/core";

import { styles } from "../../css-common";
import ApplicationDataService from "../../services/applicationService";


class DisplayApplication extends Component {
  constructor(props) {
    super(props);
    this.retrieveApplications = this.retrieveApplications.bind(this);
    this.setActiveApplication = this.setActiveApplication.bind(this);

    this.state = {
      applications: [],
      currentApplication: null,
      currentIndex: -1,
      serviceError: false
    };
  }
  
  componentDidMount() {
    this.retrieveApplications();
  }
  
  retrieveApplications() {
    ApplicationDataService.getAll()
      .then(response => {
        this.setState({
          applications: response.data
        });
      })
      .catch(e => {
        this.setState({
          serviceError: true
        })
      });
  }
  
  setActiveApplication(application, index) {
    this.setState({
      currentApplication: application,
      currentIndex: index
    });
  }
  
  render() {
    const { classes } = this.props
    const { applications, currentIndex, currentApplication} = this.state;
      
    return (
      <div className={classes.form}>
        <Grid container>
          <Grid item md={4}>
            <h2>Applications</h2>
            <div className="list-group">
              {applications &&
                applications.map((application, index) => (
                  <ListItem
                    selected={index === currentIndex}
                    onClick={() => this.setActiveApplication(application, index)}
                    divider
                    button	
                    key={index}>
                    {application.name} - {application.department}
                  </ListItem>
                ))}
            </div>
          </Grid>

          <Grid item md={6}>
            {currentApplication ? (
              <div className={classes.tutorial}>
                <h4>Detail</h4>
                <div className={classes.detail}>
                  <label>
                    <strong>Application Name:</strong>
                  </label>{" "}
                  {currentApplication.name}
                </div>
                <div className={classes.detail}>
                  <label>
                    <strong>Department:</strong>
                  </label>{" "}
                  {currentApplication.department}
                </div>
                <div className={classes.detail}>
                  <label>
                    <strong>Description:</strong>
                  </label>{" "}
                  Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
                </div>
                <div className={classes.detail}>
                  <label>
                    <strong>Status:</strong>
                  </label>{" "}
                  Active
                </div>

                <Link to={"/applications/" + currentApplication.id + "/configurations/add"} className={classes.create}>
                  Add Configuration
                </Link>

                <Link to={"/applications/" + currentApplication.id + "/configurations"} className={classes.edit}>
                  Configurations
                </Link>
              </div>
            ) : (
                <div>
                  <br />
                  <p className={classes.tutorial}>Please Select an Application...</p>
                </div>
              )}
          </Grid>
        </Grid>
      </div>);
    }
  }
  
  export default withStyles(styles)(DisplayApplication)