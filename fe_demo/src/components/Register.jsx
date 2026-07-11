import React, { useState } from "react";
import { Button, Container, Form, Row, Alert, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Register() {
    const { signup } = useAuth();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    const [registerError, setRegisterError] = useState("");
    const [fieldErrors, setFieldErrors] = useState({});

    const [values, setValues] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
        phoneNumber: '',
        address: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setValues(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        setRegisterError("");
        setFieldErrors({});

        // Just basic frontend check for confirmPassword before calling API
        if (values.password !== values.confirmPassword) {
            setRegisterError("Mật khẩu xác nhận không khớp.");
            return;
        }

        setLoading(true);

        try {
            await signup(
                values.username,
                values.email,
                values.password,
                values.phoneNumber,
                values.address
            );
            
            console.log("Register and auto-login success");
            setShowSuccess(true);
        } catch (error) {
            console.error("Register error:", error);
            let errorMessage = "";
            let parsedFieldErrors = {};

            if (error.response?.data?.message) {
                const msg = error.response.data.message;
                const allowedFields = ["username", "email", "password", "confirmPassword", "phoneNumber", "address"];
                let isFieldError = false;

                if (msg.includes(":")) {
                    msg.split(", ").forEach(part => {
                        const [field, ...rest] = part.split(": ");
                        if (allowedFields.includes(field) && rest.length > 0) {
                            parsedFieldErrors[field] = rest.join(": ");
                            isFieldError = true;
                        }
                    });
                }
                
                // Đặc biệt xử lý lỗi trùng email từ Backend (RuntimeException)
                if (msg.toLowerCase().includes("email đã được sử dụng") || msg.toLowerCase().includes("email đã tồn tại")) {
                    parsedFieldErrors.email = msg;
                    isFieldError = true;
                }

                if (!isFieldError) {
                    errorMessage = msg;
                }
            } else if (typeof error.response?.data === 'string') {
                errorMessage = error.response.data;
            } else {
                errorMessage = "Registration failed. Please try again.";
            }

            if (errorMessage) {
                // For generic error, we can either set it to a general error state or just show it in the alert.
                // In Register, we kept the registerError state for general errors.
            }

            setFieldErrors(parsedFieldErrors);
            if(errorMessage) setRegisterError(errorMessage);
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
                                value={values.username}
                                onChange={handleChange}
                                name="username"
                                isInvalid={!!fieldErrors.username}
                            />
                            <Form.Control.Feedback type="invalid">
                                {fieldErrors.username}
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control
                                type="email"
                                placeholder="Enter email"
                                value={values.email}
                                onChange={handleChange}
                                name="email"
                                isInvalid={!!fieldErrors.email}
                            />
                            <Form.Control.Feedback type="invalid">
                                {fieldErrors.email}
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Enter password"
                                value={values.password}
                                onChange={handleChange}
                                name="password"
                                isInvalid={!!fieldErrors.password}
                            />
                            <Form.Control.Feedback type="invalid">
                                {fieldErrors.password}
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formConfirmPassword">
                            <Form.Label>Confirm Password</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Confirm password"
                                value={values.confirmPassword}
                                onChange={handleChange}
                                name="confirmPassword"
                                isInvalid={!!fieldErrors.confirmPassword}
                            />
                            <Form.Control.Feedback type="invalid">
                                {fieldErrors.confirmPassword}
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formPhoneNumber">
                            <Form.Label>Phone Number</Form.Label>
                            <Form.Control
                                type="tel"
                                placeholder="Enter phone number"
                                value={values.phoneNumber}
                                onChange={handleChange}
                                name="phoneNumber"
                                isInvalid={!!fieldErrors.phoneNumber}
                            />
                            <Form.Control.Feedback type="invalid">
                                {fieldErrors.phoneNumber}
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formAddress">
                            <Form.Label>Address</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter address"
                                value={values.address}
                                onChange={handleChange}
                                name="address"
                                isInvalid={!!fieldErrors.address}
                            />
                            <Form.Control.Feedback type="invalid">
                                {fieldErrors.address}
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