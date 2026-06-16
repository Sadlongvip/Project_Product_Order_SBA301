import React, { useState } from "react";
import { Card, Container, Form, Button, Row, Col, FloatingLabel, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import api from "../api/axiosInstance";

export default function Login() {
    const { state, dispatch } = useAuth();
    const navigate = useNavigate();
    const [loginError, setLoginError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        dispatch({
            type: 'OnChange',
            payload: { field: name, value }
        });
    };

    const handleBlur = (e) => {
        const { name } = e.target;
        dispatch({
            type: 'TOUCH_FIELD',
            payload: { field: name }
        });
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoginError("");
        setLoading(true);

        try {
            
            dispatch({ type: 'VALIDATE_FORM' });

            const response = await api.post("/auth/login", {
                email: state.values.email,
                password: state.values.password
            });

            const loginData = response.data; // { id, email }
            console.log("Login success:", loginData);

            dispatch({ type: 'SET_AUTHENTICATED', payload: true });

            // Lưu toàn bộ LoginRespone vào localStorage
            localStorage.setItem('authToken', 'authenticated');
            localStorage.setItem('user', JSON.stringify(loginData));

            navigate("/");
            } catch (error) {
            console.error("Login error:", error);

            let errorMessage;
            if (!error.response) {
                errorMessage = "Network error. Please check your connection.";
            } else if (error.response.status === 404) {
                // 404 - endpoint not found
                errorMessage = "Network error. Server endpoint not found.";
            } else {
                // Other errors
                errorMessage = error.response?.data?.message 
                    || (typeof error.response?.data === 'string' ? error.response.data : "Login failed. Please try again.");
            }
            setLoginError(errorMessage); // Nơi trả về lỗi cho dòng 80
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
                                            required
                                            type="text"
                                            name="email"
                                            className="input-style"
                                            value={state.values.email}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            placeholder="Enter your email"
                                            isInvalid={state.touched.email && !!state.errors.email}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            {state.errors.email}
                                        </Form.Control.Feedback>
                                    </FloatingLabel>
                                </Form.Group>

                                <Form.Group className="mb-3">
                                    <FloatingLabel controlId="password" label="Password">
                                        <Form.Control
                                            required
                                            type="password"
                                            name="password"
                                            className="input-style"
                                            value={state.values.password}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            placeholder="Enter your password"
                                            isInvalid={state.touched.password && !!state.errors.password}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            {state.errors.password}
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