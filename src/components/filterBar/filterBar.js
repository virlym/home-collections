import React from "react";
import "./filterBar.css";

function FilterBar(props) {
    return (

        <div className="row">
            <div className="col-12">
                <form onSubmit={props.searchAPI} className="input-group input-group-lg search-style">
                <select className="input-group-prepend" name="searchType" onChange={props.handleSearchInputChange} value={props.searchState.searchType}> 
                    { props.searchType === "movie"
                    ?       <>
                            <option value="all"> All </option>
                            <option value="movies"> Movies </option>
                            <option value ="series"> Series </option>
                            </>
                    : props.searchType === "book"
                    ?
                            <>
                            <option value="all"> All </option>
                            <option value="title"> Title </option>
                            <option value ="author"> Author </option>
                            <option value="publisher"> Publisher </option>
                            <option value ="subject"> Subject </option>
                            <option value="isbn"> ISBN </option>
                            </>
                    :
                            <>
                            <option value="all"> All </option>
                            <option value="album"> Album </option>
                            <option value="artist"> Artist </option>
                            </>
                    }
                    </select>
                    <input
                        className="form-control"
                        value={props.searchState.searchTerm || ""}
                        name="searchTerm"
                        onChange={props.handleSearchInputChange}
                        type="text"
                        placeholder="Search Term"
                    />
                    <input type="submit" className="input-group-append input-group-text" value="Search" />
                </form>
            </div>
        </div>
    );
}

export default FilterBar;