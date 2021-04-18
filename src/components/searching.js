import React from "react";
import {Spinner} from "react-bootstrap";

function Searching() {
    // returns a bootstrap spinner with the "info" coloring
    return (
        <div className="row">
            <div className="col-12">
                <br />
                <Spinner animation="border" variant="info" role="status">
                    <span className="sr-only">Loading...</span>
                </Spinner>
                <br />
            </div>
        </div>
    );
}

export default Searching;