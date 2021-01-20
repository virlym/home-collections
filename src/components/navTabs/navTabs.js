import React, {useState} from "react";
import { Nav, Navbar, NavDropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./navTabs.css";

function NavTabs(props) {
  const [expanded, setExpanded] = useState(false);

  return (
    <Navbar expanded={expanded} expand="lg" bg="info" variant="dark">
      <Navbar.Brand as={Link} to="/landing" onClick={function(){ props.setPageState({currentPage: "landing"})}}>
        Home Collections
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" onClick={function(){ setExpanded(expanded ? false : "expanded") }} />
      <Navbar.Collapse id="responsive-navbar-nav">
      <Nav className="mr-auto">
        <Nav.Link as={Link} to="/landing" onClick={function(){ props.setPageState({currentPage: "landing"}); setExpanded(false) }} className={props.currentPage === "landing" ? "nav-link active bg-dark text-light" : "nav-link text-light"}>
                Home
        </Nav.Link>
        <Nav.Link as={Link} to="/books"  onClick={function(){ props.setPageState({currentPage: "books"}); setExpanded(false) }} className={props.currentPage === "books" ? "nav-link active bg-dark text-light" : "nav-link text-light"}>
          Books
        </Nav.Link>
        <Nav.Link as={Link} to="/movies" onClick={function(){ props.setPageState({currentPage: "movies"}); setExpanded(false) }} className={props.currentPage === "movies" ? "nav-link active bg-dark text-light" : "nav-link text-light"}>
          Movies
        </Nav.Link>
        <Nav.Link as={Link} to="/music" onClick={function(){ props.setPageState({currentPage: "music"}); setExpanded(false) }} className={props.currentPage === "music" ? "nav-link active bg-dark text-light" : "nav-link text-light"}>
          Music
        </Nav.Link>
        {props.loggedIn === false
        ?
          <NavDropdown className={props.currentPage === "mybooks" || props.currentPage === "mymusic" || props.currentPage === "mymovies" ? "active bg-dark text-light" : "bg-info text-light"} title={<span className="text-light"> My Collections </span> } id="collapsible-nav-dropdown" >
            <NavDropdown.Item as={Link} to="/mybooks" onClick={function(){ props.setPageState({currentPage: "mybooks"}); setExpanded(false) }} >My Books</NavDropdown.Item>
            <NavDropdown.Item as={Link} to="/mymovies" onClick={function(){ props.setPageState({currentPage: "mymovies"}); setExpanded(false) }}>My Movies</NavDropdown.Item>
            <NavDropdown.Item as={Link} to="/mymusic" onClick={function(){ props.setPageState({currentPage: "mymusic"}); setExpanded(false) }}>My Music</NavDropdown.Item>
            <NavDropdown.Divider style={{borderStyle: "solid", borderWidth: "1px", borderColor: "rgba(0,0,0,.15)"}} />
            <NavDropdown.Item as={Link} to="/profile" onClick={function(){ props.setPageState({currentPage: "movies"}); setExpanded(false) }}>Profile</NavDropdown.Item>
          </NavDropdown>
        : 
          null
        }
      </Nav>

      <Nav onClick={function(){setExpanded(false)}}>
        {props.loggedIn === false
        ?
          <Nav.Link as={Link} to="/login" onClick={function(){ props.setPageState({currentPage: "login"})}} className={props.currentPage === "login" ? "nav-link active bg-dark text-light" : "nav-link text-light"}>Login</Nav.Link>
        :
          <Nav.Link as={Link} to="/logout" onClick={function(){ props.setPageState({currentPage: "logout"})}} className={props.currentPage === "logout" ? "nav-link active bg-dark text-light" : "nav-link text-light"}>Logout</Nav.Link>
        }
      </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default NavTabs;