import React, { useState, useEffect } from 'react';
import { Modal, Table, Badge, Button, Accordion, Image, Spinner } from 'react-bootstrap';
import { getOrdersByShop } from '../service/OrderService';
import { useOrder } from '../context/OrderContext';

export default function ShopOrdersModal({ show, onHide, shopId }) {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(false);
    const { handleAcceptOrder, handleCancelOrder } = useOrder();

    const loadOrders = async () => {
        if (!shopId) return;
        setLoading(true);
        try {
            const data = await getOrdersByShop(shopId);
            setOrders(Array.isArray(data) ? data : []);
        } catch (error) {
            console.error("Error loading shop orders:", error);
            setOrders([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (show) {
            loadOrders();
        }
    }, [show, shopId]);

    const onAcceptClick = (orderId) => {
        handleAcceptOrder(orderId, () => {
            loadOrders(); // refresh shop orders
        });
    };

    const onCancelClick = (orderId) => {
        const reason = window.prompt("Nhập lý do từ chối đơn hàng này:");
        if (reason !== null) {
            if (reason.trim() === "") {
                alert("Bạn phải nhập lý do để từ chối.");
                return;
            }
            handleCancelOrder(orderId, reason, () => {
                loadOrders(); // refresh shop orders
            });
        }
    };

    return (
        <Modal show={show} onHide={onHide} size="xl">
            <Modal.Header closeButton>
                <Modal.Title>Quản lý Đơn hàng của Cửa hàng</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {loading ? (
                    <div className="d-flex justify-content-center p-5">
                        <Spinner animation="border" variant="primary" />
                    </div>
                ) : orders.length === 0 ? (
                    <div className="text-center py-5 text-muted">
                        <p style={{ fontSize: "3rem" }}>📦</p>
                        <h5>Shop chưa có đơn hàng nào</h5>
                    </div>
                ) : (
                    <Accordion>
                        {orders.map((order) => (
                            <Accordion.Item eventKey={String(order.id)} key={order.id}>
                                <Accordion.Header>
                                    <div className="d-flex justify-content-between align-items-center w-100 pe-3">
                                        <span>
                                            <strong>Đơn hàng #{order.id}</strong>
                                            {" — "} Khách hàng: <strong>{order.account?.username}</strong> {" — "}
                                            {order.status === "PENDING" && <Badge bg="warning">Chờ duyệt</Badge>}
                                            {order.status === "COMPLETED" && <Badge bg="success">Đã duyệt</Badge>}
                                            {order.status === "CANCELLED" && (
                                                <>
                                                    <Badge bg="danger" className="me-2">Đã hủy</Badge>
                                                    {order.cancelReason?.reasonText && (
                                                        <small className="text-danger">Lý do: {order.cancelReason.reasonText}</small>
                                                    )}
                                                </>
                                            )}
                                        </span>
                                        <span className="text-danger fw-bold">
                                            {Number(order.totalPrice ?? 0).toLocaleString("vi-VN")} đ
                                        </span>
                                    </div>
                                </Accordion.Header>
                                <Accordion.Body className="p-0">
                                    <Table responsive bordered hover className="align-middle mb-0">
                                        <thead className="table-secondary">
                                            <tr>
                                                <th>Hình ảnh</th>
                                                <th>Sản phẩm</th>
                                                <th>Đơn giá</th>
                                                <th>Số lượng</th>
                                                <th>Thành tiền</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {order.orderItems?.map((oi, i) => (
                                                <tr key={oi.id}>
                                                    <td>
                                                        <Image
                                                            src={oi.item?.image}
                                                            style={{ width: "50px", height: "50px", objectFit: "cover" }}
                                                            rounded
                                                        />
                                                    </td>
                                                    <td>{oi.item?.name}</td>
                                                    <td className="text-success">{Number(oi.price).toLocaleString("vi-VN")} đ</td>
                                                    <td>{oi.quantity}</td>
                                                    <td className="text-danger">{(Number(oi.price) * oi.quantity).toLocaleString("vi-VN")} đ</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                        {order.status === "PENDING" && (
                                            <tfoot className="table-light">
                                                <tr>
                                                    <td colSpan={5} className="text-end">
                                                        <Button variant="danger" className="me-2" onClick={() => onCancelClick(order.id)}>
                                                            Từ chối đơn
                                                        </Button>
                                                        <Button variant="success" onClick={() => onAcceptClick(order.id)}>
                                                            Duyệt đơn hàng
                                                        </Button>
                                                    </td>
                                                </tr>
                                            </tfoot>
                                        )}
                                    </Table>
                                </Accordion.Body>
                            </Accordion.Item>
                        ))}
                    </Accordion>
                )}
            </Modal.Body>
        </Modal>
    );
}
