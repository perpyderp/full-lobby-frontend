
import React from "react";
import { Container, Row, Col, Navbar, Nav } from "react-bootstrap";

import { Post } from "../../components/index";

import "./Home.css";

const Home = () => {

    const [username] = ["User"];

    return (
        <Container fluid className="p-0">
            <Navbar collapseOnSelect expand="lg" className="my-navbar">
            <Container>
                <Navbar.Brand href="/">Full Lobby</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link href="/games">Games</Nav.Link>
                        <Nav.Link href="/posts">Posts</Nav.Link>
                    </Nav>
                    <Nav>
                        <Nav.Link href="/friends">Friends</Nav.Link>
                        <Nav.Link href="/user">{username}</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
            </Navbar>
            <Row>
                <Col>
                    <Post />
                </Col>
            </Row>
        </Container>
    )
}

export default Home;