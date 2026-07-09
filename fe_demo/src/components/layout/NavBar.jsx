import React from 'react';
import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export default function NavBar() {
    const { isAuthenticated, dispatch } = useAuth();
    const navigate = useNavigate();

    const isLoggedIn = isAuthenticated || !!localStorage.getItem('authToken');

    const handleLogout = () => {
        localStorage.removeItem('authToken');
        localStorage.removeItem('account');
        dispatch({ type: 'SET_AUTHENTICATED', payload: false });
        navigate('/login');
    };

    return (
        <Navbar bg="dark" variant="dark" expand="lg" sticky="top">
            <Container>
                <Navbar.Brand as={NavLink} to="/">
                    BOOK STORE
                </Navbar.Brand>

                <Navbar.Toggle aria-controls="main-navbar" />
                <Navbar.Collapse id="main-navbar">
                    <Nav className="me-auto">
                        <Nav.Link as={NavLink} to="/">Home</Nav.Link>
                        <Nav.Link as={NavLink} to="/home-v2">HomeV2</Nav.Link>
                        <Nav.Link as={NavLink} to="/store">Store</Nav.Link>
                        <Nav.Link as={NavLink} to="/cart">Cart</Nav.Link>
                        <Nav.Link as={NavLink} to="/orders">Orders</Nav.Link>
                        <Nav.Link as={NavLink} to="/shop">Shop</Nav.Link>
                        <Nav.Link as={NavLink} to="/setting">Setting</Nav.Link>
                    </Nav>
                    <Nav className="ms-auto">
                        {isLoggedIn ? (
                            <Button
                                variant="outline-danger"
                                size="sm"
                                onClick={handleLogout}
                            >
                                Logout
                            </Button>
                        ) : (
                            <Button
                                variant="outline-light"
                                size="sm"
                                onClick={() => navigate('/login')}
                            >
                                Login
                            </Button>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}
