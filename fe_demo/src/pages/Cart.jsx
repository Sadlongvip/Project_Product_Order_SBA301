import { useEffect, useState } from "react";
import {
    Container, Table, Button, Spinner, Alert, Image, Badge
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useUser } from "../hooks/useUser";
import { getCartById, updateCart, removeFromCart, clearCart } from "../service/CartService";

export default function Cart() {
    const user = useUser();
    const navigate = useNavigate();
    const [cartItems, setCartItems] = useState([]);
    const [loading, setLoading] = useState(false);
    const [alert, setAlert] = useState({ show: false, msg: "", variant: "success" });

    // Hiển thị alert rồi tự ẩn sau 3s
    function showAlert(msg, variant = "success") {
        setAlert({ show: true, msg, variant });
        setTimeout(() => setAlert(a => ({ ...a, show: false })), 3000);
    }

    // Load giỏ hàng
    async function loadCart() {
        if (!user) {
            navigate("/login");
            return;
        }
        setLoading(true);
        try {
            const data = await getCartById(user.id);
            // Backend trả về trực tiếp List<CartItem>
            setCartItems(Array.isArray(data) ? data : []);
        } catch (error) {
            console.error(error);
            setCartItems([]);
        }
        setLoading(false);
    }

    useEffect(() => {
        loadCart();
    }, []);

    // Xóa 1 sản phẩm khỏi giỏ
    async function handleRemove(itemId) {
        const status = await removeFromCart(user.id, itemId);
        if (status === 200) {
            showAlert("Đã xóa sản phẩm khỏi giỏ hàng!");
            loadCart();
        } else {
            showAlert("Xóa thất bại!", "danger");
        }
    }

    // Cập nhật số lượng
    async function handleQuantityChange(itemId, newQty) {
        if (newQty < 1) return;
        await updateCart(user.id, itemId, newQty);
        loadCart();
    }

    // Xóa toàn bộ giỏ
    async function handleClearCart() {
        const status = await clearCart(user.id);
        if (status === 200) {
            showAlert("Đã xóa toàn bộ giỏ hàng!");
            setCartItems([]);
        } else {
            showAlert("Xóa thất bại!", "danger");
        }
    }

    // Tính tổng tiền
    const total = cartItems.reduce((sum, ci) => {
        const price = Number(ci.item?.price ?? 0);
        return sum + price * ci.quantity;
    }, 0);

    return (
        <Container className="mt-4">
            <div className="d-flex justify-content-between align-items-center mb-3">
                <h2>
                    Giỏ hàng của bạn{" "}
                    <Badge bg="secondary">{cartItems.length} sản phẩm</Badge>
                </h2>
                <div className="d-flex gap-2">
                    <Button variant="outline-secondary" onClick={() => navigate("/store")}>
                        ← Tiếp tục mua sắm
                    </Button>
                    {cartItems.length > 0 && (
                        <Button variant="outline-danger" onClick={handleClearCart}>
                            Xóa toàn bộ
                        </Button>
                    )}
                </div>
            </div>

            {alert.show && (
                <Alert variant={alert.variant} dismissible onClose={() => setAlert(a => ({ ...a, show: false }))}>
                    {alert.msg}
                </Alert>
            )}

            {loading ? (
                <div className="d-flex justify-content-center align-items-center" style={{ minHeight: "300px" }}>
                    <Spinner animation="border" variant="primary" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </Spinner>
                </div>
            ) : cartItems.length === 0 ? (
                <div className="text-center py-5 text-muted">
                    <p style={{ fontSize: "3rem" }}>🛒</p>
                    <h5>Giỏ hàng của bạn đang trống</h5>
                    <Button variant="primary" className="mt-2" onClick={() => navigate("/store")}>
                        Đi mua sắm ngay
                    </Button>
                </div>
            ) : (
                <>
                    <Table responsive bordered hover className="align-middle">
                        <thead className="table-dark">
                            <tr>
                                <th>#</th>
                                <th>Hình ảnh</th>
                                <th>Sản phẩm</th>
                                <th>Đơn giá</th>
                                <th>Số lượng</th>
                                <th>Thành tiền</th>
                                <th>Xóa</th>
                            </tr>
                        </thead>
                        <tbody>
                            {cartItems.map((ci, index) => (
                                <tr key={ci.id}>
                                    <td>{index + 1}</td>
                                    <td>
                                        <Image
                                            src={ci.item?.image}
                                            alt={ci.item?.name}
                                            style={{ width: "70px", height: "70px", objectFit: "cover" }}
                                            rounded
                                        />
                                    </td>
                                    <td>
                                        <strong>{ci.item?.name}</strong>
                                        <br />
                                        <small className="text-muted">{ci.item?.description}</small>
                                    </td>
                                    <td className="text-success fw-bold">
                                        {Number(ci.item?.price ?? 0).toLocaleString("vi-VN")} đ
                                    </td>
                                    <td>
                                        <div className="d-flex align-items-center gap-2">
                                            <Button
                                                size="sm"
                                                variant="outline-secondary"
                                                onClick={() => handleQuantityChange(ci.item?.id, ci.quantity - 1)}
                                            >
                                                −
                                            </Button>
                                            <span className="fw-bold">{ci.quantity}</span>
                                            <Button
                                                size="sm"
                                                variant="outline-secondary"
                                                onClick={() => handleQuantityChange(ci.item?.id, ci.quantity + 1)}
                                            >
                                                +
                                            </Button>
                                        </div>
                                    </td>
                                    <td className="text-danger fw-bold">
                                        {(Number(ci.item?.price ?? 0) * ci.quantity).toLocaleString("vi-VN")} đ
                                    </td>
                                    <td>
                                        <Button
                                            size="sm"
                                            variant="danger"
                                            onClick={() => handleRemove(ci.item?.id)}
                                        >
                                            🗑
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>

                    <div className="d-flex justify-content-end">
                        <div className="border rounded p-3 bg-light" style={{ minWidth: "280px" }}>
                            <h5>Tổng thanh toán</h5>
                            <h4 className="text-danger fw-bold">
                                {total.toLocaleString("vi-VN")} đ
                            </h4>
                            <Button variant="success" className="w-100 mt-2">
                                Đặt hàng
                            </Button>
                        </div>
                    </div>
                </>
            )}
        </Container>
    );
}
