import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';

export default function NavBar() {
    return (
        <Navbar bg="dark" variant="dark" expand="lg" sticky="top">
            <Container>
                <Navbar.Brand as={NavLink} to="/home">
                    BOOK STORE
                </Navbar.Brand>

                <Navbar.Toggle aria-controls="main-navbar" />
                <Navbar.Collapse id="main-navbar">
                    <Nav className="me-auto">
                        <Nav.Link as={NavLink} to="/">Home</Nav.Link>
                        <Nav.Link as={NavLink} to="/home_test">HomeTest</Nav.Link>
                        <Nav.Link as={NavLink} to="/store">Store</Nav.Link>
                        <Nav.Link as={NavLink} to="/cart">Cart</Nav.Link>
                        <Nav.Link as={NavLink} to="/orders">Orders</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>

    );
}