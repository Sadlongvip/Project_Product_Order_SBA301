import { useEffect, useState } from "react";
import {
    Container, Table, Spinner, Badge, Image, Accordion
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useUser } from "../hooks/useUser";
import { getOrdersByAccount } from "../service/OrderService";

export default function Orders() {
    const user = useUser();
    const navigate = useNavigate();
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(false);

    async function loadOrders() {
        if (!user) {
            navigate("/login");
            return;
        }
        setLoading(true);
        const data = await getOrdersByAccount(user.id);
        setOrders(Array.isArray(data) ? data : []);
        setLoading(false);
    }

    useEffect(() => {
        loadOrders();
    }, []);

    return (
        <Container className="mt-4">
            {/* Header */}
            <div className="d-flex justify-content-between align-items-center mb-3">
                <h2>
                    Lich su don hang{" "}
                    <Badge bg="secondary">{orders.length} don</Badge>
                </h2>
                <button
                    className="btn btn-outline-secondary"
                    onClick={() => navigate("/store")}
                >
                    ← Tiep tuc mua sam
                </button>
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
                    <h5>Ban chua co don hang nao</h5>
                    <button
                        className="btn btn-primary mt-2"
                        onClick={() => navigate("/store")}
                    >
                        Mua hang ngay
                    </button>
                </div>

            ) : (
                /* Order list — mỗi Order là 1 Accordion item */
                <Accordion>
                    {orders.map((order, index) => (
                        <Accordion.Item eventKey={String(order.id)} key={order.id}>
                            <Accordion.Header>
                                <div className="d-flex justify-content-between w-100 pe-3">
                                    <span>
                                        <strong>Don hang #{order.id}</strong>
                                        {" — "}
                                        <Badge bg="info" text="dark">
                                            {order.orderItems?.length ?? 0} san pham
                                        </Badge>
                                    </span>
                                    <span className="text-danger fw-bold">
                                        {Number(order.totalPrice ?? 0).toLocaleString("vi-VN")} d
                                    </span>
                                </div>
                            </Accordion.Header>

                            <Accordion.Body className="p-0">
                                <Table responsive bordered hover className="align-middle mb-0">
                                    <thead className="table-secondary">
                                        <tr>
                                            <th>#</th>
                                            <th>Hinh anh</th>
                                            <th>San pham</th>
                                            <th>Don gia</th>
                                            <th>So luong</th>
                                            <th>Thanh tien</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {order.orderItems?.map((oi, i) => (
                                            <tr key={oi.id}>
                                                <td>{i + 1}</td>
                                                <td>
                                                    <Image
                                                        src={oi.itemImage}
                                                        alt={oi.itemName}
                                                        style={{ width: "60px", height: "60px", objectFit: "cover" }}
                                                        rounded
                                                    />
                                                </td>
                                                <td><strong>{oi.itemName}</strong></td>
                                                <td className="text-success fw-bold">
                                                    {Number(oi.price).toLocaleString("vi-VN")} d
                                                </td>
                                                <td>{oi.quantity}</td>
                                                <td className="text-danger fw-bold">
                                                    {Number(oi.subtotal).toLocaleString("vi-VN")} d
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                    <tfoot className="table-light">
                                        <tr>
                                            <td colSpan={5} className="text-end fw-bold">Tong cong:</td>
                                            <td className="text-danger fw-bold">
                                                {Number(order.totalPrice ?? 0).toLocaleString("vi-VN")} d
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
