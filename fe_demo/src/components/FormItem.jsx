
import React, { useState, useEffect } from "react";
import { Button, Container, Form } from "react-bootstrap";
import { ValidateItemInput } from "../validation/Validation";
import { getCategory } from "../service/CategoryService";

export default function FormItem({ itemData, onSubmit, onCancel }) {
    const [formData, setFormData] = useState({
        name: "",
        price: "",
        stock: "",
        description: "",
        categoryId: "",
        image: ""
    });
    const [errors, setErrors] = useState({});
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        async function fetchCategories() {
            const data = await getCategory();
            setCategories(data);
        }
        fetchCategories();
    }, []);

    useEffect(() => {
        if (itemData) {
            setFormData({
                name: itemData.name || "",
                price: itemData.price || "",
                stock: itemData.stock || "",
                description: itemData.description || "",
                categoryId: itemData.categoryId || "",
                image: itemData.image || ""
            });
        } else {
            setFormData({
                name: "",
                price: "",
                stock: "",
                description: "",
                categoryId: "",
                image: ""
            });
        }
    }, [itemData]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const validationErrors = ValidateItemInput(formData, categories);
        const hasError = Object.values(validationErrors).some((err) => err !== "");
        
        if (hasError) {
            setErrors(validationErrors);
            return;
        }
        
        setErrors({});
        // Pass the updated form data back to parent, merging with ID if it's an edit
        onSubmit({ ...itemData, ...formData });
    };

    return (
        <Container>
            <Form onSubmit={handleSubmit} className="mt-3">
                <Form.Group className="mb-3" controlId="formBasicName">
                    <Form.Label>Tên sản phẩm <span className="text-danger">*</span></Form.Label>
                    <Form.Control 
                        type="text" 
                        placeholder="Nhập tên sản phẩm" 
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        isInvalid={!!errors.name}
                    />
                    <Form.Control.Feedback type="invalid">
                        {errors.name}
                    </Form.Control.Feedback>
                </Form.Group>
                
                <Form.Group className="mb-3" controlId="formBasicPrice">
                    <Form.Label>Giá sản phẩm <span className="text-danger">*</span></Form.Label>
                    <Form.Control 
                        type="number" 
                        placeholder="Nhập giá sản phẩm" 
                        name="price"
                        value={formData.price}
                        onChange={handleChange}
                        isInvalid={!!errors.price}
                    />
                    <Form.Control.Feedback type="invalid">
                        {errors.price}
                    </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicStock">
                    <Form.Label>Số lượng tồn kho <span className="text-danger">*</span></Form.Label>
                    <Form.Control 
                        type="number" 
                        placeholder="Nhập số lượng tồn kho" 
                        name="stock"
                        value={formData.stock}
                        onChange={handleChange}
                        isInvalid={!!errors.stock}
                    />
                    <Form.Control.Feedback type="invalid">
                        {errors.stock}
                    </Form.Control.Feedback>
                </Form.Group>
                
                <Form.Group className="mb-3" controlId="formBasicDescription">
                    <Form.Label>Mô tả sản phẩm <span className="text-danger">*</span></Form.Label>
                    <Form.Control 
                        as="textarea" 
                        rows={3} 
                        placeholder="Nhập mô tả sản phẩm" 
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        isInvalid={!!errors.description}
                    />
                    <Form.Control.Feedback type="invalid">
                        {errors.description}
                    </Form.Control.Feedback>
                </Form.Group>
                
                <Form.Group className="mb-3" controlId="formBasicImage">
                    <Form.Label>URL Ảnh sản phẩm <span className="text-danger">*</span></Form.Label>
                    <Form.Control 
                        type="text" 
                        placeholder="Nhập đường dẫn ảnh sản phẩm"
                        name="image"
                        value={formData.image}
                        onChange={handleChange}
                        isInvalid={!!errors.image}
                    />
                    <Form.Control.Feedback type="invalid">
                        {errors.image}
                    </Form.Control.Feedback>
                    {formData.image && (
                        <div className="mt-2 text-center">
                            <img src={formData.image} alt="Preview" style={{ maxHeight: '150px', objectFit: 'contain' }} onError={(e) => e.target.style.display = 'none'} />
                        </div>
                    )}
                </Form.Group>
                
                <Form.Group className="mb-3" controlId="formBasicCategory">
                    <Form.Label>Danh mục sản phẩm <span className="text-danger">*</span></Form.Label>
                    <Form.Control 
                        as="select"
                        name="categoryId"
                        value={formData.categoryId}
                        onChange={handleChange}
                        isInvalid={!!errors.categoryId}
                    >
                        <option value="">Chọn danh mục</option>
                        {categories.map((c) => (
                            <option key={c.id} value={c.id}>
                                {c.name}
                            </option>
                        ))}
                    </Form.Control>
                    <Form.Control.Feedback type="invalid">
                        {errors.categoryId}
                    </Form.Control.Feedback>
                </Form.Group>
                
                <div className="d-flex gap-2 mt-4">
                    <Button variant="primary" type="submit">
                        Lưu
                    </Button>
                    <Button variant="secondary" onClick={onCancel}>
                        Hủy
                    </Button>
                </div>
            </Form>
        </Container>
    );
}
