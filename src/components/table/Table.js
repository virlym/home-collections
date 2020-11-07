import React from "react";
import "./style.css";

function Table(props) {
    //console.log("name: ", props.user[0].firstName);
  return (
      <tbody>
          <tr className="header">
            <th onClick={props.sort.bind(this, "id")}> Profile </th>
            <th onClick={props.sort.bind(this, "firstName")}> First Name </th>
            <th onClick={props.sort.bind(this, "lastName")}> Last Name </th>
            <th onClick={props.sort.bind(this, "age")}> Age </th>
            <th> Phone </th>
            <th> Email </th>
          </tr>
          {props.table}
      </tbody>
  );
}

export default Table;