import React from "react";

import { Button, Container, Row } from "react-bootstrap";

import "./Post.css";

const Post = () => {

    return(
        <Container className="post">
            <Row>
                <h4>username</h4>
            </Row>
            <Row>
                <p>post body</p>
            </Row>
            <Row>
                <Button>Comment</Button>
                <Button>Like</Button>
                <Button>Downvote</Button>
                <Button>Share</Button>
            </Row>
        </Container>
    )
}

export default Post;