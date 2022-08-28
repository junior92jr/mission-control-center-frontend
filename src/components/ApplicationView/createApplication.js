import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Grid, TextField, withStyles } from "@material-ui/core";

import { styles } from "../../css-common";
import ApplicationDataService from "../../services/applicationService";

class CreateApplication extends Component {
  constructor(props) {
    super(props);

    this.onChangeAppName = this.onChangeAppName.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.onChangeDepartment = this.onChangeDepartment.bind(this);
    this.saveApplication = this.saveApplication.bind(this);

    this.newApplication = this.newApplication.bind(this);

    this.state = {
      id: null,
      name: null,
      department: null,
      submitted: false,
      description: null,
      errors: {}
    };
  };

  onChangeAppName(e) {
    this.setState({
      name: e.target.value
    });
  };

  onChangeDepartment(e) {
    this.setState({
      department: e.target.value
    });
  };

  onChangeDescription(e) {
    this.setState({
      description: e.target.value
    });
  };

  saveApplication() {
    var data = {
      name: this.state.name,
      department: this.state.department,
      description: this.state.description
    };

    console.log(data)

    ApplicationDataService.create(data)
      .then(response => {
        this.setState({
          id: response.data.id,
          name: response.data.name,
          department: response.data.department,
          description: response.data.description,
          submitted: true
        });
      })
      .catch(error => {
        this.setState({
          errors: error.response.data
        })
      }
    );
  };

  newApplication() {
    this.setState({
      id: null,
      name: null,
      department: null,
      submitted: false,
      description: null,
      errors: {}
    })
  };

  render() {
    const { classes } = this.props
    const { errors } = this.state;

    return (
      <React.Fragment>
        {
          this.state.submitted ? (
            <div className={classes.form}>
              <h4>You submitted successfully!</h4>
              <Link
                className={classes.edit}
              >
                Add
              </Link>
              <Link
                className={classes.edit}
              >
                Applications
              </Link>

            </div>

          ): (
            <div className={classes.form}>
              <h4>Create Application</h4>
              <div className={classes.textField}>
                <TextField
                  label="App Name"
                  name="name"
                  value={this.state.name}
                  onChange={this.onChangeAppName}
                  error= {errors.name}
                  helperText={errors.name}
                  inputProps={{ maxLength: 20}}
                  required
                />
              </div>
              <div className={classes.textField}>
                <TextField
                  label="Department"
                  name="department"
                  value={this.state.department}
                  onChange={this.onChangeDepartment}
                  error= {errors.department}
                  helperText={errors.department}
                  inputProps={{ maxLength: 20}}
                  required
                />
              </div>

              <div className={classes.textField}>
                <TextField
                  label="Description"
                  name="description"
                  value={this.state.description}
                  onChange={this.onChangeDescription}
                  error= {errors.description}
                  helperText={errors.description}
                  inputProps={{ maxLength: 1000}}
                  required
                  style = {{width: 500}}
                />
              </div>

              <Link
                onClick={this.saveApplication}
                className={classes.edit}
              >
                Submit
              </Link>
            </div>
          )

        }

      </React.Fragment>
    );
  };

}

export default withStyles(styles)(CreateApplication)