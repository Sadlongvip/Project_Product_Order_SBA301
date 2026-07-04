import React, { useState } from "react";
import { Button, Container, Form, Row, Alert, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { validateUserInput } from "../validation/Validation";
const api = axios.create({
    baseURL: import.meta.env.VITE_API_BASE || 'http://localhost:8080/api'
});

export default function Register() {
    const { state, dispatch } = useAuth();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    const [registerError, setRegisterError] = useState("");

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

    const handleRegister = async (e) => {
        e.preventDefault();
        setRegisterError("");
        setLoading(true);

        try {
            // Validate form before sending
            dispatch({ type: 'VALIDATE_FORM' });

            const validationResult = validateUserInput(state.values);
            if (!validationResult.isValid) {
                setLoading(false);
                return;
            }

            const response = await api.post("/auth/register", {
                username: state.values.username,
                email: state.values.email,
                password: state.values.password,
                phoneNumber: state.values.phoneNumber,
                address: state.values.address
            });

            console.log("Register success:", response.data);

            // Auto-login after successful registration
            const loginResponse = await api.post("/auth/login", {
                email: state.values.email,
                password: state.values.password
            });
            
            const loginData = loginResponse.data;
            console.log("Auto-login success:", loginData);

            setShowSuccess(true);

            // Update auth state in context
            dispatch({ type: 'SET_AUTHENTICATED', payload: true });

            // Store a dummy token and the account data for redirection to /home
            localStorage.setItem('authToken', 'authenticated');
            localStorage.setItem('account', JSON.stringify(loginData));

            // Redirect to home after successful registration and login
            setTimeout(() => {
                window.location.href = "/";
            }, 1500);

        } catch (error) {
            console.error("Register error:", error);
            const errorMessage = error.response?.data?.message || (typeof error.response?.data === 'string' ? error.response.data : "Registration failed. Please try again.");
            setRegisterError(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Container>
            
            <h2>Register</h2>
            {showSuccess && (
                <Alert variant="success" className="mt-3">
                    Register successful! Redirecting...
                </Alert>
            )}
            {registerError && (
                <Alert variant="danger" className="mt-3">
                    {registerError}
                </Alert>
            )}
            <Row className="justify-content-center mt-5">
                <Col lg={6} md={8} xs={12}>
                    <Form onSubmit={handleRegister}>
                        <Form.Group className="mb-3" controlId="formUsername">
                            <Form.Label>Username</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter your username"
                                value={state.values.username}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                name="username"
                                isInvalid={state.touched.username && !!state.errors.username}
                            />
                            <Form.Control.Feedback type="invalid">
                                {state.errors.username}
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control
                                type="email"
                                placeholder="Enter email"
                                value={state.values.email}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                name="email"
                                isInvalid={state.touched.email && !!state.errors.email}
                            />
                            <Form.Control.Feedback type="invalid">
                                {state.errors.email}
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Enter password"
                                value={state.values.password}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                name="password"
                                isInvalid={state.touched.password && !!state.errors.password}
                            />
                            <Form.Control.Feedback type="invalid">
                                {state.errors.password}
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formConfirmPassword">
                            <Form.Label>Confirm Password</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Confirm password"
                                value={state.values.confirmPassword}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                name="confirmPassword"
                                isInvalid={state.touched.confirmPassword && !!state.errors.confirmPassword}
                            />
                            <Form.Control.Feedback type="invalid">
                                {state.errors.confirmPassword}
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formPhoneNumber">
                            <Form.Label>Phone Number</Form.Label>
                            <Form.Control
                                type="tel"
                                placeholder="Enter phone number"
                                value={state.values.phoneNumber}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                name="phoneNumber"
                                isInvalid={state.touched.phoneNumber && !!state.errors.phoneNumber}
                            />
                            <Form.Control.Feedback type="invalid">
                                {state.errors.phoneNumber}
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formAddress">
                            <Form.Label>Address</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter address"
                                value={state.values.address}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                name="address"
                                isInvalid={state.touched.address && !!state.errors.address}
                            />
                            <Form.Control.Feedback type="invalid">
                                {state.errors.address}
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group className="d-flex justify-content-between">
                            <Button 
                                variant="primary" 
                                type="submit" 
                                disabled={loading} 
                                className="w-40"
                            >
                                {loading ? "Processing..." : "Register"}
                            </Button>
                            <Button 
                                variant="secondary" 
                                type="button" 
                                className="ms-2 w-40"
                                onClick={() => navigate(-1)}
                            >
                                Cancel
                            </Button>
                        </Form.Group>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
}