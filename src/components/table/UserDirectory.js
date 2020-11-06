import React, { Component } from "react";
import "./style.css";
import API from "../../utils/API";
import Table from "./Table"

class Form extends Component {
  // Setting the component's initial state
  state = {
    userList: {},
    tableList: [],
    sortedTable: [],
    filteredTable: []
  };

  // When this component mounts, search the Giphy API for pictures of kittens
  componentDidMount() {
    this.searchEmployees();
  }

  searchEmployees () {
      API.search()
        .then(function (res){
          const data = res.data.results;
          const newArray = [];
          console.log(data[0].name.first);
          for(let i = 0; i < data.length; i++){
            newArray.push({ firstName: data[i].name.first, lastName: data[i].name.last, pic: data[i].picture.medium, age: data[i].dob.age, phone: data[i].cell, email: data[i].email});
          }
          this.setState({ userList: newArray });
          const newArray2 = [];
          for(let i = 0; i < this.state.userList.length; i++){
            const data = this.state.userList[i];
            newArray2.push(<tr>
              <td> <img src={data.pic} alt="pic{i}" /> </td>
              <td>{data.firstName}</td>
              <td>{data.lastName}</td>
              <td>{data.age}</td>
              <td>{data.phone}</td>
              <td>{data.email}</td>
              </tr> );
          }
          this.setState({ tableList: newArray2 });
          this.setState({ sortedTable: newArray2 });
          this.setState({ filteredTable: newArray2 });
        }.bind(this))
        .catch(err => console.log(err));
  }

  handleInputChange (event){
    // Getting the value and name of the input which triggered the change
    const value = event.target.value;
    const name = event.target.name;

    // Updating the input's state
    this.setState({
      [name]: value
    });
  };

  handleFormSubmit (event) {
    // Preventing the default behavior of the form submit (which is to refresh the page)
    event.preventDefault();

    if((this.state.firstName !== "") && (this.state.lastName !== "")){
      if(this.state.password.length > 5){
    // Alert the user their first and last name, clear `this.state.firstName` and `this.state.lastName`, clearing the inputs
        alert(`Hello ${this.state.firstName} ${this.state.lastName}`);
        this.setState({
          firstName: "",
          lastName: "",
          password: ""
        });
      }
      else{
        alert(`Choose a more secure password, ${this.state.firstName} ${this.state.lastName}`);
        this.setState({
          firstName: "",
          lastName: "",
          password: ""
        });
      }
    }
    else{
      alert(`Fill out your first and last name please!`);
        this.setState({
          firstName: "",
          lastName: "",
          password: ""
        });
    }
  };

  displayTable() {
    // const table = [];
    // for(let i = 0; i < this.state.userList.length; i++){
    //   table.push(<tr><td> {this.state.userList.firstName} </td></tr>);
    // }
    // const test = <tr> <td> hi </td> </tr>
    // return (test);
  }


  render() {
    // Notice how each input has a `value`, `name`, and `onChange` prop
    return (
      <div>
        <table id="myTable" >
        <Table table={this.state.tableList} user={this.state.userList}/>
        </table>
      </div>
    );
  }
}

export default Form;
