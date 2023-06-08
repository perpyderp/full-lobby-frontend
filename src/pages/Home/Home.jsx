
import React from "react";
import { Container, Row, Col } from "react-bootstrap";

import { Post } from "../../components/index";

import "./Home.css";

const Home = () => {

    return (
        <Container fluid className="p-0">
            <Row className="posts-feed-container">
                <Col lg={3}>

                </Col>
                <Col lg={6} className="post-container">
                    <Post />
                    <Post />
                    <Post />
                </Col>
            </Row>
        </Container>
    )
}

export default Home;