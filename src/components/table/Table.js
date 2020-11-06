import React from "react";
import "./style.css";

function Table(props) {
    console.log("test : ", props.table[0]);
    //console.log("name: ", props.user[0].firstName);
  return (
      <tbody>
          <tr className="header">
            <th> Profile </th>
            <th> First Name </th>
            <th> Last Name </th>
            <th> Age </th>
            <th> Phone </th>
            <th> Email </th>
          </tr>
          {props.table}
      </tbody>
  );
}

export default Table;