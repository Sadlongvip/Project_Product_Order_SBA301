import { Container, Form, Button, Alert } from "react-bootstrap";
import { validateField, validateSettingUserInput } from "../validation/Validation";
import { useUser } from "../hooks/useUser";
import { getUser, updateUser } from "../service/UserService";
import { useState, useEffect } from "react";

export default function SettingUser() {
    const [userData, setUserData] = useState({
        username: "",
        email: "",
        phoneNumber: "",
        address: ""
    });
    const [errors, setErrors] = useState({});
    const [statusMsg, setStatusMsg] = useState(null);
    const user = useUser();

    async function loadData() {
        if (user && user.id) {
            const response = await getUser(user.id);
            if (response) {
                setUserData({
                    ...response,
                    username: response.username || "",
                    email: response.email || "",
                    phoneNumber: response.phoneNumber || "",
                    address: response.address || ""
                });
            }
        }
    }
    useEffect(() => {
        loadData();
    }, []);

    const handleChange = (e) => {
        setUserData({ ...userData, [e.target.name]: e.target.value });
    }

    const handleBlur = (e) => {
        const { name, value } = e.target;
        const error = validateField(name, value, userData);
        setErrors({ ...errors, [name]: error });
    }

    const handleUpdate = async (e) => {
        e.preventDefault();
        setStatusMsg(null);
        const { isValid, errors } = validateSettingUserInput(userData);
        if (isValid) {
            // Call API to update user data
            const updateRes = await updateUser(userData);
            if (updateRes && updateRes.id) {
                // Show success message
                setStatusMsg({ type: "success", message: "Cập nhật thành công!" });
            } else {
                // Show error message
                setStatusMsg({ type: "danger", message: "Cập nhật thất bại. Vui lòng thử lại!" });
            }
        } else {
            // Show validation errors
            setErrors(errors);
        }
    }

    return (
        <Container>
            <h1 className="mt-5">Setting User</h1>
            {statusMsg && (
                <Alert variant={statusMsg.type} onClose={() => setStatusMsg(null)} dismissible>
                    {statusMsg.message}
                </Alert>
            )}
            <Form onSubmit={handleUpdate}>
                <Form.Group className="mb-3" controlId="formUsername">
                    <Form.Label>Username</Form.Label>
                    <Form.Control
                        type="text"
                        name="username"
                        placeholder="Enter your username"
                        value={userData.username}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        isInvalid={!!errors.username}
                    />
                    <Form.Control.Feedback type="invalid">
                        {errors.username}
                    </Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control
                        type="text"
                        name="email"
                        placeholder="Enter email"
                        value={userData.email}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        isInvalid={!!errors.email}
                    />
                    <Form.Control.Feedback type="invalid">
                        {errors.email}
                    </Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formPhoneNumber">
                    <Form.Label>Phone Number</Form.Label>
                    <Form.Control
                        type="text"
                        name="phoneNumber"
                        placeholder="Enter phone number"
                        value={userData.phoneNumber}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        isInvalid={!!errors.phoneNumber}
                    />
                    <Form.Control.Feedback type="invalid">
                        {errors.phoneNumber}
                    </Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formAddress">
                    <Form.Label>Address</Form.Label>
                    <Form.Control
                        type="text"
                        name="address"
                        placeholder="Enter address"
                        value={userData.address}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        isInvalid={!!errors.address}
                    />
                    <Form.Control.Feedback type="invalid">
                        {errors.address}
                    </Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="d-flex justify-content-between">
                    <Button variant="outline-success" type="submit">
                        Update
                    </Button>
                    <Button variant="outline-danger" type="reset">
                        Reset
                    </Button>
                </Form.Group>
            </Form>
        </Container>
    );
}

