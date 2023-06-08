import React from "react";
import { Container, Navbar, Nav, Form } from "react-bootstrap";

const MainNavbar = (props) => {

    return(
        <Navbar collapseOnSelect expand="lg" className="my-navbar">
        <Container>
            <Navbar.Brand href="/">Full Lobby</Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="me-auto">
                    <Nav.Link href="/games">Games</Nav.Link>
                    <Nav.Link href="/posts">Posts</Nav.Link>
                    <Form className="d-flex search-bar">
                    <Form.Control
                    type="search"
                    placeholder="Search"
                    className="me-2"
                    aria-label="Search"
                    />
                    </Form>
                </Nav>
                <Nav>
                    <Nav.Link href="/friends">Friends</Nav.Link>
                    { props.user.username ? <Nav.Link href={ "/user/" + props.user.id} >{props.user.username}</Nav.Link> : <Nav.Link href="/register">Register</Nav.Link>}
                    
                    
                </Nav>
            </Navbar.Collapse>
        </Container>
        </Navbar>
    )
};

export default MainNavbar;