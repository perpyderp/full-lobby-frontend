import React, {useState} from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Register = () => {

    let navigate = useNavigate();

    const [registerForm, setRegisterForm] = useState({
        username: "",
        email: "",
        firstName: "",
        lastName: "",
        password: ""
    });

    const { username, email, firstName, lastName, password } = registerForm;

    const inputChange = (e) => {
        const {name, value} = e.target;
        
        setRegisterForm(prevFormData => ({
            ...prevFormData,
            [name]: value,
        }));
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        await axios.post("http://localhost:8080/user", registerForm);
        navigate("/");
    };

    return(
        <Container>
            <Row>
                <Col className="offset-md-3 border rounded p-4 mt-2 shadow" md={6}>
                <h1 className="text-center">Registration Form</h1>
                <Form onSubmit={onSubmit}>
                    <Form.Group controlId="formFirstName">
                    <Form.Label>First Name</Form.Label>
                    <Form.Control name="firstName" type="text" placeholder="First Name" value={firstName} onChange={inputChange} />
                    </Form.Group>

                    <Form.Group controlId="formLastName">
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control name="lastName" type="text" placeholder="Last Name" value={lastName} onChange={inputChange} />
                    </Form.Group>

                    <Form.Group controlId="formUsername">
                    <Form.Label>Username</Form.Label>
                    <Form.Control name="username" type="text" placeholder="Username" value={username} onChange={inputChange} />
                    </Form.Group>

                    <Form.Group controlId="formEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control name="email" type="email" placeholder="Enter email" value={email} onChange={inputChange} />
                    </Form.Group>

                    <Form.Group controlId="formPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control name="password" type="password" placeholder="Password" value={password} onChange={inputChange} />
                    </Form.Group>

                    <Button variant="primary" type="submit">
                    Register
                    </Button>
                </Form>
                </Col>
            </Row>
        </Container>
    )
}

export default Register;