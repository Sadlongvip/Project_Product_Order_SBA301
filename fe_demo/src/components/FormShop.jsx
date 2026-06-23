import { Form, Row, Col, Button, Image } from "react-bootstrap";
import { useShopContext } from "../context/ShopContext";
import { ValidateShopInput } from "../validation/Validation";
import { createShop } from "../service/ShopService";

export default function FormShop({ onCancel, onSuccess }) {
    const { state, dispatch } = useShopContext();
    const { data, errors, touched } = state;

    function handleChange(e) {
        const { name, value } = e.target;
        dispatch({ type: "CHANGE_FIELD", payload: { field: name, value } });
    }

    function handleBlur(e) {
        const { name, value } = e.target;
        dispatch({ type: "TOUCHED_FIELD", payload: { field: name, value } });
    }

    async function handleSubmit(e) {
        e.preventDefault();

        // Validate toàn bộ form
        dispatch({ type: "SUBMIT_ADD" });

        const validationErrors = ValidateShopInput(data);
        const hasError = Object.values(validationErrors).some((err) => err !== "");
        if (hasError) return;

        // Gọi API
        try {
            await createShop(data);
            dispatch({ type: "SUBMIT_SUCCESS" });
            if (onSuccess) onSuccess();
        } catch (error) {
            dispatch({ type: "SUBMIT_ERROR", payload: error.message });
        }
    }

    return (
        <Form onSubmit={handleSubmit}>
            {/* Lỗi server */}
            {errors.server && (
                <div className="alert alert-danger">{errors.server}</div>
            )}

            {/* Tên shop */}
            <Form.Group className="mb-3" controlId="shopName">
                <Form.Label>Tên shop</Form.Label>
                <Form.Control
                    type="text"
                    name="name"
                    value={data.name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="Nhập tên shop"
                    isInvalid={touched.name && !!errors.name}
                />
                <Form.Control.Feedback type="invalid">
                    {errors.name}
                </Form.Control.Feedback>
            </Form.Group>

            {/* Địa chỉ */}
            <Form.Group className="mb-3" controlId="shopAddress">
                <Form.Label>Địa chỉ</Form.Label>
                <Form.Control
                    type="text"
                    name="address"
                    value={data.address}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="Nhập địa chỉ"
                    isInvalid={touched.address && !!errors.address}
                />
                <Form.Control.Feedback type="invalid">
                    {errors.address}
                </Form.Control.Feedback>
            </Form.Group>

            {/* Số điện thoại & Email */}
            <Row className="mb-3">
                <Form.Group as={Col} controlId="shopPhone">
                    <Form.Label>Số điện thoại</Form.Label>
                    <Form.Control
                        type="text"
                        name="phone"
                        value={data.phone}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        placeholder="Nhập số điện thoại"
                        isInvalid={touched.phone && !!errors.phone}
                    />
                    <Form.Control.Feedback type="invalid">
                        {errors.phone}
                    </Form.Control.Feedback>
                </Form.Group>

                <Form.Group as={Col} controlId="shopEmail">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                        type="email"
                        name="email"
                        value={data.email}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        placeholder="Nhập email"
                        isInvalid={touched.email && !!errors.email}
                    />
                    <Form.Control.Feedback type="invalid">
                        {errors.email}
                    </Form.Control.Feedback>
                </Form.Group>
            </Row>

            {/* Mô tả */}
            <Form.Group className="mb-3" controlId="shopDescription">
                <Form.Label>Mô tả</Form.Label>
                <Form.Control
                    as="textarea"
                    name="description"
                    value={data.description}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="Nhập mô tả shop"
                    rows={3}
                    isInvalid={touched.description && !!errors.description}
                />
                <Form.Control.Feedback type="invalid">
                    {errors.description}
                </Form.Control.Feedback>
            </Form.Group>

            {/* Trạng thái */}
            <Form.Group className="mb-3" controlId="shopStatus">
                <Form.Label>Trạng thái</Form.Label>
                <Form.Select
                    name="status"
                    value={data.status}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    isInvalid={touched.status && !!errors.status}
                >
                    <option value="">-- Chọn trạng thái --</option>
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                    <option value="pending">Pending</option>
                </Form.Select>
                <Form.Control.Feedback type="invalid">
                    {errors.status}
                </Form.Control.Feedback>
            </Form.Group>

            {/* Logo URL (không validate, chỉ preview) */}
            <Form.Group className="mb-3" controlId="shopLogo">
                <Form.Label>Logo URL</Form.Label>
                <Form.Control
                    type="text"
                    name="logo"
                    value={data.logo}
                    onChange={handleChange}
                    placeholder="Nhập đường dẫn logo"
                />
                {data.logo && (
                    <Image
                        src={data.logo}
                        alt="Logo Preview"
                        thumbnail
                        className="mt-2"
                        style={{ maxHeight: "100px", objectFit: "contain" }}
                        onError={(e) => (e.target.style.display = "none")}
                    />
                )}
            </Form.Group>

            {/* Banner URL (không validate, chỉ preview) */}
            <Form.Group className="mb-3" controlId="shopBanner">
                <Form.Label>Banner URL</Form.Label>
                <Form.Control
                    type="text"
                    name="banner"
                    value={data.banner}
                    onChange={handleChange}
                    placeholder="Nhập đường dẫn banner"
                />
                {data.banner && (
                    <Image
                        src={data.banner}
                        alt="Banner Preview"
                        thumbnail
                        className="mt-2"
                        style={{ maxHeight: "150px", objectFit: "cover", width: "100%" }}
                        onError={(e) => (e.target.style.display = "none")}
                    />
                )}
            </Form.Group>

            {/* Buttons */}
            <div className="d-flex gap-2 justify-content-end">
                <Button variant="secondary" type="button" onClick={onCancel}>
                    Hủy
                </Button>
                <Button variant="primary" type="submit">
                    Thêm mới
                </Button>
            </div>
        </Form>
    );
}
