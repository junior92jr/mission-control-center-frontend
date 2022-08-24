import React, { Component } from "react";
import { TextField, withStyles } from "@material-ui/core"

import { Link } from "react-router-dom";

import { styles } from "../../css-common"
import ConfigurationDataService from "../../services/configurationService"


class EditConfiguration extends Component {
  constructor(props) {
    super(props);

    this.onChangeTypeChoice = this.onChangeTypeChoice.bind(this);
    this.saveConfiguration = this.saveConfiguration.bind(this);
    this.newConfiguration = this.newConfiguration.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleRemoveClick = this.handleRemoveClick.bind(this);
    this.handleAddClick = this.handleAddClick.bind(this);
    this.getConfiguration = this.getConfiguration.bind(this);
    this.convertDictResponse = this.convertDictResponse.bind(this);
    this.convertListResponse = this.convertListResponse.bind(this);

    this.state = {
        id: null,
        type_choice: null,
        submitted: false,
        application: null,
        inputList: [{ codeInput: "", valueInput: "" }],
        inputDict: {},
        errors: {},
        isCreate: false,
        isEdit: false
    };
  }

  componentDidMount() {
    let applicationId = this.props.match.params.app_id;
    applicationId = Object.is(applicationId, undefined) ? null : applicationId;

    let configurationId = this.props.match.params.conf_id;
    configurationId = Object.is(configurationId, undefined) ? null : configurationId;

    if (configurationId) {
      this.setState({
        isEdit: true
      })
      this.getConfiguration(this.props.match.params.conf_id);
    } else {
      this.setState({
        isCreate: true, 
        application: applicationId
      })
    }
  }

  onChangeTypeChoice(e) {
    this.setState({
      type_choice: e.target.value
    });
  }

  convertDictResponse(dictSet) {
    let responseList = []
    Object.entries(dictSet).forEach(([key, value]) => {
      responseList.push({codeInput: key, valueInput: value})
    });
    return responseList;
  }

  convertListResponse(listSet) {
    let inputValues = {};
    for (var i = 0; i < listSet.length; i++) {
      inputValues[listSet[i]["codeInput"]] = listSet[i]["valueInput"]
    }
    return inputValues
  }

  getConfiguration(id) {
    ConfigurationDataService.get(id)
      .then(response => {
        this.setState({
          id: response.data.id,
          type_choice: response.data.type_choice,
          application: response.data.application,
          inputDict: response.data.roles_set,
          inputList: this.convertDictResponse(response.data.roles_set)
        });
      })
      .catch(e => {
        console.log(e);
      });
  }

  handleInputChange(e, index) {
    const { name, value } = e.target;
    const currentlist = [...this.state.inputList];
    currentlist[index][name] = value;
    this.setState({
      inputList: currentlist,
      inputDict: this.convertListResponse(currentlist)
    });

  };

  handleRemoveClick(index) {
    const currentlist = [...this.state.inputList];
    currentlist.splice(index, 1);
    this.setState({
      inputList: currentlist, 
      inputDict: this.convertListResponse(currentlist)
    });
  };

  handleAddClick() {
    this.setState({
      inputList: [...this.state.inputList, { codeInput: "", valueInput: "" }]
    });
  };

  saveConfiguration() {
    var data = {
      type_choice: this.state.type_choice,
      application: this.state.application,
      roles_set: this.state.inputDict
    };

    if (this.state.isCreate) {
      ConfigurationDataService.create(data)
        .then(response => {
          this.setState({
            id: response.data.id,
            type_choice: response.data.type_choice,
            application: response.data.application,
            inputDict: response.data.roles_set,
            inputList: this.convertDictResponse(response.data.roles_set),
            submitted: true
          });
        })
        .catch(error => {
          this.setState({
            errors:error.response.data
          })
        });
    } else {
      ConfigurationDataService.update(this.state.id, data)
      .then(response => {
        this.setState({
          type_choice: response.data.type_choice,
          application: response.data.application,
          inputDict: response.data.roles_set,
          inputList: this.convertDictResponse(response.data.roles_set),
          submitted: true
        });
      })
      .catch(error => {
        this.setState({
          errors:error.response.data
        })
      });
    }
  }

  newConfiguration() {

    if (this.state.isEdit) {
      this.setState({
        submitted: false
      });

    } else {
      this.setState({
        id: null,
        type_choice: null,
        submitted: false,
        application: this.state.application,
        inputList: [{ codeInput: "", valueInput: "" }],
        inputDict: {}
      });
    }
  }

  render() {
    const { classes } = this.props
    const { inputList, isCreate, errors } = this.state;

    const renderTypeChoiceInput = () => {
      if (isCreate) {
        return (
          <div className={classes.textField}>
            <TextField
              label="Type Choice"
              name="type_choice"
              value={this.state.type_choice}
              onChange={this.onChangeTypeChoice}
              error= {errors.type_choice}
              helperText={errors.type_choice}
              inputProps={{ maxLength: 4 }}
              required
            />
          </div>
        )
      }
    }

    const renderDynamicInputs = (x, i) => {
      return (
        <div className={classes.textField}>
          <TextField
            label="Role Code"
            name="codeInput"
            value={x.codeInput}
            onChange={e => this.handleInputChange(e, i)}
            required
            inputProps={{ maxLength: 20 }}
          />
          <TextField
            label="Role Value"
            name="valueInput"
            value={x.valueInput}
            onChange={e => this.handleInputChange(e, i)}
            required
            inputProps={{ maxLength: 20 }}
          />
          {inputList.length !== 1 && 
            <Link
              onClick={() => this.handleRemoveClick(i)}
              className={classes.delete}
            >
              Remove
            </Link>
          }
          {inputList.length - 1 === i && 
            <Link
              onClick={this.handleAddClick}
              className={classes.create}
            >
              Add
            </Link>

          }
        </div>
      )
    }

    return (
      <React.Fragment>
        {this.state.submitted ? (
          <div className={classes.form}>
            <h4>You submitted successfully!</h4>
            <Link
              onClick={this.newConfiguration}
              className={classes.edit}
            >
              {isCreate?"Add":"Edit"}
            </Link>
            <Link
              to={isCreate?"/applications/":"/applications/" + this.state.application + "/configurations"}
              className={classes.edit}
            >
              {isCreate?"Applications":"Configuration"}
            </Link>
          </div>) : (
          <div className={classes.form}>
            <h4>{isCreate?"Create Configuration":"Edit Configuration"}</h4>
            {renderTypeChoiceInput()}
            {inputList.map((x, i) => {
              return (
                renderDynamicInputs(x,i)
              );})
            }
            <Link
              onClick={this.saveConfiguration}
              className={classes.edit}
            >
              Submit
            </Link>

          </div>)}
        </React.Fragment>
      );
  }
}

export default withStyles(styles)(EditConfiguration)