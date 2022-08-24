import React, { Component } from "react";
import { TextField, Button, withStyles } from "@material-ui/core"

import { styles } from "../../css-common"
import ConfigurationDataService from "../../services/configurationService"


class EditConfiguration extends Component {
  constructor(props) {
    super(props);

    this.saveConfiguration = this.saveConfiguration.bind(this);
    this.newConfiguration = this.newConfiguration.bind(this);


    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleRemoveClick = this.handleRemoveClick.bind(this);
    this.handleAddClick = this.handleAddClick.bind(this);


    this.getConfiguration = this.getConfiguration.bind(this);


    this.state = {
        id: null,
        type_choice: "",
        submitted: false,
        application: null,
        inputList: [{ codeInput: "", valueInput: "" }],
        inputDict: {}
    };
  }

  componentDidMount() {
    this.getConfiguration(this.props.match.params.id);
  }

  getConfiguration(id) {
    ConfigurationDataService.get(id)
      .then(response => {
        let myList = []
        Object.entries(response.data.roles_set).forEach(([key, value]) => {
          myList.push({codeInput: key, valueInput: value})
        });

        this.setState({
          id: response.data.id,
          type_choice: response.data.type_choice,
          application: response.data.application,
          inputDict: response.data.roles_set,
          inputList: myList
        });
          
      })
      .catch(e => {
          console.log(e);
      });
  }

  handleInputChange(e, index) {
    const { name, value } = e.target;
    const list = [...this.state.inputList];
    list[index][name] = value;
    this.setState({inputList: list});
    let inputValues = {};
      for (var i = 0; i < list.length; i++) {
        inputValues[list[i]["codeInput"]] = list[i]["valueInput"]
      }
    this.setState({inputDict: inputValues});
  };


  handleRemoveClick(index) {
    const list = [...this.state.inputList];
    list.splice(index, 1);
    this.setState({inputList: list});
    let inputValues = {};
      for (var i = 0; i < list.length; i++) {
        inputValues[list[i]["codeInput"]] = list[i]["valueInput"]
      }
    this.setState({inputDict: inputValues});
  };

  handleAddClick() {
    this.setState({inputList: [...this.state.inputList, { codeInput: "", valueInput: "" }]});
  };

  saveConfiguration() {

    var data = {
      type_choice: this.state.type_choice,
      application: this.state.application,
      roles_set: this.state.inputDict
    };

    console.log(data)

    ConfigurationDataService.update(this.state.id, data)
      .then(response => {
        let myList = []
        Object.entries(response.data.roles_set).forEach(([key, value]) => {
          myList.push({codeInput: key, valueInput: value})
        });

        this.setState({
          type_choice: response.data.type_choice,
          application: response.data.application,
          inputDict: response.data.roles_set,
          inputList: myList,
          submitted: true
        });
      })
      .catch(e => {
          console.log(e);
      });
  }

  newConfiguration() {
    this.setState({
      id: null,
      type_choice: "",
      description: "",
      submitted: false,
      application: this.props.match.params.id,
      inputList: [{ codeInput: "", valueInput: "" }],
      inputDict: {}
    });
  }

  render() {
    const { classes } = this.props
    const { inputList } = this.state;

              
    return (
      <React.Fragment>
        {this.state.submitted ? (
          <div className={classes.form}>
            <h4>You submitted successfully!</h4>
            <Button
                size="small"
                color="primary"
                variant="contained"
                onClick={this.newConfiguration}>
                Add
            </Button>
            <Button
                size="small"
                color="primary"
                variant="contained">
                Go to Applications
            </Button>
          </div>) : (
          <div className={classes.form}>
            {inputList.map((x, i) => {
              return (
                <div className={classes.textField}>
                  <TextField
                    label="Role Code"
                    name="codeInput"
                    value={x.codeInput}
                    onChange={e => this.handleInputChange(e, i)}
                    required
                  />
                  <TextField
                    label="Role Value"
                    name="valueInput"
                    value={x.valueInput}
                    onChange={e => this.handleInputChange(e, i)}
                    required
                  />
                  {inputList.length !== 1 && 
                    <Button 
                      size="small"
                      color="primary"
                      variant="contained"
                      onClick={() => this.handleRemoveClick(i)}>
                        Remove
                    </Button>
                  }
                  {inputList.length - 1 === i && 
                    <Button 
                      size="small"
                      color="primary"
                      variant="contained"
                      onClick={this.handleAddClick}>
                        Add
                    </Button>
                  }
                </div>
              );})
            }
            <Button
              size="small"
              color="primary"
              variant="contained"
              onClick={this.saveConfiguration}>
              Submit
            </Button>
          </div>)}
        </React.Fragment>
      );
  }
}

export default withStyles(styles)(EditConfiguration)