import React from "react";
import "./movieSearch.css";

function MovieSearch() {
  return (
    <div className="container">

        <div className="row">
          <div className="col-12">
            <h1>
              Movie Search
            </h1>
          </div>
        </div>

        <div className="row">
          <div className="col-12">
            <div className="input-group input-group-lg" style={{marginTop:"20px", textAlign:"center"}}>
              <div className="input-group-prepend">
                <span className="input-group-text" id="inputGroup-sizing-lg">Search</span>
              </div>
              <input
                className="form-control"
                id="movieSearch"
                // value={this.state.searchTerm}
                name="searchTerm"
                // onChange={this.handleInputChange.bind(this)}
                type="text"
                placeholder="Movie Title"
              />
            </div>
          </div>
        </div>

        <br />

        <div className="row">
          <div className="col-12">
            {/* <table id="myTable">
              <Table table={this.state.tableList.data} sort={this.sortTable.bind(this)}/>
            </table> */}
          </div>
        </div>
      </div>
  );
}

export default MovieSearch;