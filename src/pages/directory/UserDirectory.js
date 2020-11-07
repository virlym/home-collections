import React, { Component } from "react";
import "./style.css";
import API from "../../utils/API";
import Table from "../../components/table/Table";
import $ from "jquery";

class Form extends Component {
  // Setting the component's initial state
  state = {
    searchTerm: "",
    userList: [],
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
          for(let i = 0; i < data.length; i++){
            newArray.push({ id: i, firstName: data[i].name.first, lastName: data[i].name.last, pic: data[i].picture.medium, age: data[i].dob.age, phone: data[i].cell, email: data[i].email});
          }
          this.setState({ userList: newArray });
          this.setTableList("");
        }.bind(this))
        .catch(err => console.log(err));
  }

  setTableList(search){
    const data = this.state.userList;
    const newArray2 = [];
    const newKey = [];
      for(let i = 0; i < data.length; i++){
        const name = `${data[i].firstName.toLocaleLowerCase()} ${data[i].lastName.toLocaleLowerCase()}`;
        if((search === "") || (name.indexOf(search.toLocaleLowerCase()) > -1)){
        newArray2.push(
          <tr>
            <td> <img src={data[i].pic} alt="pic{i}" /> </td>
            <td>{data[i].firstName}</td>
            <td>{data[i].lastName}</td>
            <td>{data[i].age}</td>
            <td>{data[i].phone}</td>
            <td>{data[i].email}</td>
          </tr> 
        );
        newKey.push(i.toString());
      }
    }
    this.setState({ tableList: {data: newArray2, key: newKey } });
  }

  handleInputChange (event){
    // Getting the value and name of the input which triggered the change
    event.preventDefault();
    const value = event.target.value;
    const name = event.target.name;

    // Updating the input's state
    this.setState({
      [name]: value
    });
    this.setTableList(event.target.value);   
  };

  sortTable(column) {
    let change = false;
    // sort by id
    if(column === "id"){
      this.state.userList.sort(function(b, a){
        if(a.id < b.id) { 
          change = true;
          return -1; 
        }
        if(a.id > b.id) { 
          return 1; 
        }
        return 0;
      });
      if(change === false){
        this.state.userList.sort(function(a, b){
          if(a.id < b.id) { return -1; }
          if(a.id > b.id) { return 1; }
          return 0;
        });
      }
    }
    // sort by first name
    if(column === "firstName"){
      this.state.userList.sort(function(b, a){
        if(a.firstName < b.firstName) { 
          change = true;
          return -1; 
        }
        if(a.firstName > b.firstName) { 
          return 1; 
        }
        return 0;
      });
      if(change === false){
        this.state.userList.sort(function(a, b){
          if(a.firstName < b.firstName) { return -1; }
          if(a.firstName > b.firstName) { return 1; }
          return 0;
        });
      }
    }
    // sort by last name
    if(column === "lastName"){
      this.state.userList.sort(function(b, a){
        if(a.lastName < b.lastName) { 
          change = true;
          return -1; 
        }
        if(a.lastName > b.lastName) { 
          return 1; 
        }
        return 0;
      });
      if(change === false){
        this.state.userList.sort(function(a, b){
          if(a.lastName < b.lastName) { return -1; }
          if(a.lastName > b.lastName) { return 1; }
          return 0;
        });
      }
    }
    // sort by age
    if(column === "age"){
      this.state.userList.sort(function(b, a){
        if(a.age < b.age) { 
          change = true;
          return -1; 
        }
        if(a.age > b.age) { 
          return 1; 
        }
        return 0;
      });
      if(change === false){
        this.state.userList.sort(function(a, b){
          if(a.age < b.age) { return -1; }
          if(a.age > b.age) { return 1; }
          return 0;
        });
      }
    }
    this.setTableList($("#userSearch").val());
      
  }

  render() {
    // Notice how each input has a `value`, `name`, and `onChange` prop
    return (
      <div>
          <input
            id="userSearch"
            value={this.state.searchTerm}
            name="searchTerm"
            onChange={this.handleInputChange.bind(this)}
            type="text"
            placeholder="Name"
          />
        <table id="myTable" className="searchable sortable">
        <Table table={this.state.tableList.data} sort={this.sortTable.bind(this)}/>
        </table>
      </div>
    );
  }
}

export default Form;
