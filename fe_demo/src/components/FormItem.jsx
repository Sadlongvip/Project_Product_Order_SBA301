import { useState, useEffect } from "react";
import { Form, Row, Col, Button, Image } from "react-bootstrap";
import { getCategory } from "../service/CategoryService";

const InitFormItem = {
    id: 0,
    name: "",
    description: "",
    price: 0,
    image: "",
    stock: 0,
    categoryId: 0,
};

export default function FormItem({ itemData, onSubmit, onCancel }) {
    const [formData, setFormData] = useState(InitFormItem);
    const [categoryList, setCategoryList] = useState([]);
    const [errors, setErrors] = useState({});

    useEffect(() => {
        loadData();
    }, [itemData]);

    async function loadData() {
        const categories = await getCategory();
        setCategoryList(Array.isArray(categories) ? categories : []);
        if (itemData) {
            setFormData({ ...itemData });
        } else {
            setFormData(InitFormItem);
        }
    }

    function handleChange(e) {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]:
                name === "price" || name === "stock" || name === "categoryId"
                    ? Number(value)
                    : value,
        }));
        setErrors((prev) => ({ ...prev, [name]: "" }));
    }

    function validate() {
        const newErrors = {};
        if (!formData.name.trim()) newErrors.name = "Tên sản phẩm không được để trống.";
        if (formData.price <= 0) newErrors.price = "Giá phải lớn hơn 0.";
        if (formData.stock < 0) newErrors.stock = "Tồn kho không được âm.";
        if (!formData.categoryId) newErrors.categoryId = "Vui lòng chọn danh mục.";
        return newErrors;
    }

    function handleSubmit(e) {
        e.preventDefault();
        const validationErrors = validate();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }
        onSubmit(formData);
    }

    return (
        <Form onSubmit={handleSubmit}>
            {/* Tên sản phẩm */}
            <Form.Group className="mb-3" controlId="itemName">
                <Form.Label>Tên sản phẩm</Form.Label>
                <Form.Control
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Nhập tên sản phẩm"
                    isInvalid={!!errors.name}
                />
                <Form.Control.Feedback type="invalid">
                    {errors.name}
                </Form.Control.Feedback>
            </Form.Group>

            {/* Mô tả */}
            <Form.Group className="mb-3" controlId="itemDescription">
                <Form.Label>Mô tả</Form.Label>
                <Form.Control
                    as="textarea"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="Nhập mô tả sản phẩm"
                    rows={3}
                />
            </Form.Group>

            {/* Giá & Tồn kho */}
            <Row className="mb-3">
                <Form.Group as={Col} controlId="itemPrice">
                    <Form.Label>Giá (VNĐ)</Form.Label>
                    <Form.Control
                        type="number"
                        name="price"
                        min={0}
                        value={formData.price}
                        onChange={handleChange}
                        isInvalid={!!errors.price}
                    />
                    <Form.Control.Feedback type="invalid">
                        {errors.price}
                    </Form.Control.Feedback>
                </Form.Group>

                <Form.Group as={Col} controlId="itemStock">
                    <Form.Label>Tồn kho</Form.Label>
                    <Form.Control
                        type="number"
                        name="stock"
                        min={0}
                        value={formData.stock}
                        onChange={handleChange}
                        isInvalid={!!errors.stock}
                    />
                    <Form.Control.Feedback type="invalid">
                        {errors.stock}
                    </Form.Control.Feedback>
                </Form.Group>
            </Row>

            {/* Danh mục */}
            <Form.Group className="mb-3" controlId="itemCategory">
                <Form.Label>Danh mục</Form.Label>
                <Form.Select
                    name="categoryId"
                    value={formData.categoryId}
                    onChange={handleChange}
                    isInvalid={!!errors.categoryId}
                >
                    <option value={0}>-- Chọn danh mục --</option>
                    {categoryList.map((cat) => (
                        <option key={cat.id} value={cat.id}>
                            {cat.name}
                        </option>
                    ))}
                </Form.Select>
                <Form.Control.Feedback type="invalid">
                    {errors.categoryId}
                </Form.Control.Feedback>
            </Form.Group>

            {/* URL Hình ảnh */}
            <Form.Group className="mb-3" controlId="itemImage">
                <Form.Label>URL Hình ảnh</Form.Label>
                <Form.Control
                    type="text"
                    name="image"
                    value={formData.image}
                    onChange={handleChange}
                    placeholder="Nhập đường dẫn hình ảnh"
                />
                {formData.image && (
                    <Image
                        src={formData.image}
                        alt="Preview"
                        thumbnail
                        className="mt-2"
                        style={{ maxHeight: "150px", objectFit: "contain" }}
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
                    {itemData ? "Cập nhật" : "Thêm mới"}
                </Button>
            </div>
        </Form>
    );
}