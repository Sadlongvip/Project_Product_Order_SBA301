import React, { useState } from "react";
import { Card, Container, Form, Button, Row, Col, FloatingLabel, Alert } from "react-bootstrap";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Login() {
    const { login } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loginError, setLoginError] = useState("");
    const [fieldErrors, setFieldErrors] = useState({});
    const [loading, setLoading] = useState(false);

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoginError("");
        setFieldErrors({});
        setLoading(true);

        try {
            await login(email, password);
            // login function in AuthContext already sets token and navigates
        } catch (error) {
            console.error("Login error:", error);

            let errorMessage = "";
            let parsedFieldErrors = {};
            
            if (error.response?.data?.message) {
                const msg = error.response.data.message;
                if (msg.includes(":")) {
                    msg.split(", ").forEach(part => {
                        const [field, ...rest] = part.split(": ");
                        if (rest.length > 0) {
                            parsedFieldErrors[field] = rest.join(": ");
                        }
                    });
                } else {
                    errorMessage = msg;
                }
            } else if (!error.response) {
                errorMessage = "Network error. Please check your connection.";
            } else {
                errorMessage = "Login failed. Please try again.";
            }
            
            setFieldErrors(parsedFieldErrors);
            if(errorMessage) setLoginError(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Container>
            <Row className="justify-content-center mt-5">
                <Col lg={4} md={6} xs={12}>
                    <Card className="mt-5 p-4 shadow-sm border-0" style={{ backgroundColor: "#a0a0a0" }}>
                        <Card.Title>Welcome Back!</Card.Title>
                        <Card.Body>
                            {loginError && <Alert variant="danger">{loginError}</Alert>}
                            <Form onSubmit={handleLogin}>
                                <Form.Group className="mb-3">
                                    <FloatingLabel controlId="email" label="Email">
                                        <Form.Control
                                            type="text"
                                            name="email"
                                            className="input-style"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            placeholder="Enter your email"
                                            isInvalid={!!fieldErrors.email}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            {fieldErrors.email}
                                        </Form.Control.Feedback>
                                    </FloatingLabel>
                                </Form.Group>

                                <Form.Group className="mb-3">
                                    <FloatingLabel controlId="password" label="Password">
                                        <Form.Control
                                            type="password"
                                            name="password"
                                            className="input-style"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            placeholder="Enter your password"
                                            isInvalid={!!fieldErrors.password}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            {fieldErrors.password}
                                        </Form.Control.Feedback>
                                    </FloatingLabel>
                                </Form.Group>

                                <Button 
                                    variant="primary" 
                                    type="submit" 
                                    className="w-100"
                                    disabled={loading}
                                >
                                    {loading ? "Logging in..." : "Login"}
                                </Button>

                                <Button 
                                    variant="secondary" 
                                    className="w-100 mt-2"
                                    onClick={() => navigate("/register")}
                                >
                                    Sign Up
                                </Button>
                            </Form>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
}