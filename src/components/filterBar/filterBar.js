import React from "react";
import "./filterBar.css";

function FilterBar(props) {
    return (

        <div className="row">
            <div className="col-12">
                <div className="input-group input-group-lg filter-style">
                    <input
                        className="form-control"
                        value={props.filterState.filterTerm || ""}
                        name="filterTerm"
                        onChange={props.handleFilterInputChange}
                        type="text"
                        placeholder="Filter Term"
                    />
                    <button className="input-group-append input-group-text"> Clear </button>
                </div>
            </div>
        </div>
    );
}

export default FilterBar;