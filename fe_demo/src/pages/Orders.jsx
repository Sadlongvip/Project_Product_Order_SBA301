import { Container, Table, Spinner, Badge, Image, Accordion, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useOrder } from "../context/OrderContext";

export default function Orders() {
    const navigate = useNavigate();
    const { orders, loading, handleCancelOrder } = useOrder();

    const onCancelClick = (orderId) => {
        const reason = window.prompt("Vui lòng nhập lý do hủy đơn hàng:");
        if (reason !== null) {
            if (reason.trim() === "") {
                alert("Bạn phải nhập lý do để hủy đơn hàng.");
                return;
            }
            handleCancelOrder(orderId, reason);
        }
    };

    return (
        <Container className="mt-4">
            {/* Header */}
            <div className="d-flex justify-content-between align-items-center mb-3">
                <h2>
                    Lịch sử đơn hàng{" "}
                    <Badge bg="secondary">{orders.length} đơn</Badge>
                </h2>
                <Button variant="outline-secondary" onClick={() => navigate("/store")}>
                    ← Tiếp tục mua sắm
                </Button>
            </div>

            {/* Loading */}
            {loading ? (
                <div className="d-flex justify-content-center align-items-center" style={{ minHeight: "300px" }}>
                    <Spinner animation="border" variant="primary" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </Spinner>
                </div>

            ) : orders.length === 0 ? (
                /* Empty state */
                <div className="text-center py-5 text-muted">
                    <p style={{ fontSize: "3rem" }}>📦</p>
                    <h5>Bạn chưa có đơn hàng nào</h5>
                    <Button variant="primary" className="mt-2" onClick={() => navigate("/store")}>
                        Mua hàng ngay
                    </Button>
                </div>

            ) : (
                /* Order list */
                <Accordion>
                    {orders.map((order, index) => (
                        <Accordion.Item eventKey={String(order.id)} key={order.id}>
                            <Accordion.Header>
                                <div className="d-flex justify-content-between align-items-center w-100 pe-3">
                                    <span>
                                        <strong>Đơn hàng #{order.id}</strong>
                                        {" — "}
                                        <Badge bg="info" text="dark" className="me-2">
                                            {order.orderItems?.length ?? 0} sản phẩm
                                        </Badge>
                                        {order.shop && (
                                            <Badge bg="secondary" className="me-2">Shop: {order.shop.name}</Badge>
                                        )}
                                        {order.status === "PENDING" && <Badge bg="warning">Chờ xử lý</Badge>}
                                        {order.status === "COMPLETED" && <Badge bg="success">Thành công</Badge>}
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
                                            <th>#</th>
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
                                                <td>{i + 1}</td>
                                                <td>
                                                    <Image
                                                        src={oi.item?.image}
                                                        alt={oi.item?.name}
                                                        style={{ width: "60px", height: "60px", objectFit: "cover" }}
                                                        rounded
                                                    />
                                                </td>
                                                <td><strong>{oi.item?.name}</strong></td>
                                                <td className="text-success fw-bold">
                                                    {Number(oi.price).toLocaleString("vi-VN")} đ
                                                </td>
                                                <td>{oi.quantity}</td>
                                                <td className="text-danger fw-bold">
                                                    {(Number(oi.price) * oi.quantity).toLocaleString("vi-VN")} đ
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                    <tfoot className="table-light">
                                        <tr>
                                            <td colSpan={5} className="text-end fw-bold">
                                                {order.status === 'PENDING' && (
                                                    <Button variant="danger" size="sm" className="float-start ms-2" onClick={() => onCancelClick(order.id)}>
                                                        Hủy đơn hàng
                                                    </Button>
                                                )}
                                                Tổng cộng:
                                            </td>
                                            <td className="text-danger fw-bold">
                                                {Number(order.totalPrice ?? 0).toLocaleString("vi-VN")} đ
                                            </td>
                                        </tr>
                                    </tfoot>
                                </Table>
                            </Accordion.Body>
                        </Accordion.Item>
                    ))}
                </Accordion>
            )}
        </Container>
    );
}
