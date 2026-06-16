import { useState } from "react";
import { Container, Row, Col, Table, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import "../css/homepage.css";

// ==================== Mock Data ====================
const categories = [
    { id: 1, name: "Fiction", icon: "📖", count: 124 },
    { id: 2, name: "Science", icon: "🔬", count: 89 },
    { id: 3, name: "History", icon: "🏛️", count: 67 },
    { id: 4, name: "Technology", icon: "💻", count: 156 },
    { id: 5, name: "Art & Design", icon: "🎨", count: 43 },
    { id: 6, name: "Business", icon: "📊", count: 98 },
];

const featuredProducts = [
    {
        id: 1,
        name: "The Art of Programming",
        category: "Technology",
        price: 450000,
        originalPrice: 550000,
        image: "https://images.unsplash.com/photo-1532012197267-da84d127e765?w=500&q=80",
        badge: "Best Seller",
        stock: 15,
    },
    {
        id: 2,
        name: "Design Thinking Handbook",
        category: "Art & Design",
        price: 320000,
        originalPrice: null,
        image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=500&q=80",
        badge: null,
        stock: 8,
    },
    {
        id: 3,
        name: "World History Encyclopedia",
        category: "History",
        price: 580000,
        originalPrice: 720000,
        image: "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=500&q=80",
        badge: "20% OFF",
        stock: 22,
    },
    {
        id: 4,
        name: "Business Strategy 101",
        category: "Business",
        price: 290000,
        originalPrice: null,
        image: "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=500&q=80",
        badge: "New",
        stock: 30,
    },
];

const recentOrders = [
    { id: "ORD-2024001", customer: "Nguyen Van A", items: 3, total: 1250000, status: "completed", date: "13/06/2026" },
    { id: "ORD-2024002", customer: "Tran Thi B", items: 1, total: 450000, status: "processing", date: "13/06/2026" },
    { id: "ORD-2024003", customer: "Le Van C", items: 5, total: 2100000, status: "pending", date: "12/06/2026" },
    { id: "ORD-2024004", customer: "Pham Thi D", items: 2, total: 870000, status: "completed", date: "12/06/2026" },
    { id: "ORD-2024005", customer: "Hoang Van E", items: 1, total: 320000, status: "cancelled", date: "11/06/2026" },
];

const stats = [
    { icon: "📦", label: "Total Orders", value: "1,284", colorClass: "orders" },
    { icon: "📚", label: "Items In Stock", value: "5,672", colorClass: "items" },
    { icon: "💰", label: "Revenue", value: "₫48.5M", colorClass: "revenue" },
    { icon: "👥", label: "Customers", value: "892", colorClass: "customers" },
];

// ==================== Helper ====================
function formatPrice(price) {
    return price.toLocaleString("vi-VN") + "₫";
}

function getStatusLabel(status) {
    const labels = {
        completed: "Completed",
        processing: "Processing",
        pending: "Pending",
        cancelled: "Cancelled",
    };
    return labels[status] || status;
}

// ==================== Component ====================
export default function HomePage() {
    const [cartMessage, setCartMessage] = useState("");

    function handleAddToCart(product) {
        setCartMessage(`✅ Added "${product.name}" to cart!`);
        setTimeout(() => setCartMessage(""), 2500);
    }

    return (
        <Container className="pb-4">
            {/* ===== Hero Banner ===== */}
            <div className="hero-banner">
                <h1>Welcome to Book Store 📚</h1>
                <p>
                    Discover thousands of books, manage your orders, and track deliveries — all in one place.
                </p>
                <Link to="/library" className="btn-hero">
                    Browse Collection →
                </Link>
            </div>

            {/* ===== Stats Dashboard ===== */}
            <Row className="stats-section g-3">
                {stats.map((stat, index) => (
                    <Col xs={6} md={3} key={index}>
                        <div className="stat-card">
                            <div className={`stat-icon ${stat.colorClass}`}>
                                {stat.icon}
                            </div>
                            <div className="stat-number">{stat.value}</div>
                            <div className="stat-label">{stat.label}</div>
                        </div>
                    </Col>
                ))}
            </Row>

            {/* ===== Categories ===== */}
            <div className="section-header">
                <h2>Shop by Category</h2>
                <Link to="/library" className="view-all">View All →</Link>
            </div>
            <Row className="g-3">
                {categories.map((cat) => (
                    <Col xs={6} sm={4} md={2} key={cat.id}>
                        <div className="category-card">
                            <div className="cat-icon">{cat.icon}</div>
                            <div className="cat-name">{cat.name}</div>
                            <div className="cat-count">{cat.count} items</div>
                        </div>
                    </Col>
                ))}
            </Row>

            {/* ===== Featured Products ===== */}
            <div className="section-header">
                <h2>Featured Products</h2>
                <Link to="/library" className="view-all">View All →</Link>
            </div>

            {/* Cart notification */}
            {cartMessage && (
                <div className="alert alert-success py-2 px-3 d-flex align-items-center" role="alert"
                     style={{ fontSize: "0.9rem", borderRadius: "10px" }}>
                    {cartMessage}
                </div>
            )}

            <Row className="g-3">
                {featuredProducts.map((product) => (
                    <Col xs={12} sm={6} md={3} key={product.id}>
                        <div className="product-card">
                            <div className="product-img-wrapper">
                                <img src={product.image} alt={product.name} />
                                {product.badge && (
                                    <span className="product-badge">{product.badge}</span>
                                )}
                            </div>
                            <div className="product-body">
                                <div className="product-category">{product.category}</div>
                                <div className="product-name">{product.name}</div>
                                <div className="product-price">
                                    {formatPrice(product.price)}
                                    {product.originalPrice && (
                                        <span className="original-price">
                                            {formatPrice(product.originalPrice)}
                                        </span>
                                    )}
                                </div>
                                <Button
                                    className="btn-add-cart"
                                    onClick={() => handleAddToCart(product)}
                                >
                                    🛒 Add to Cart
                                </Button>
                            </div>
                        </div>
                    </Col>
                ))}
            </Row>

            {/* ===== Recent Orders ===== */}
            <div className="section-header">
                <h2>Recent Orders</h2>
                <Link to="/library" className="view-all">View All Orders →</Link>
            </div>
            <div className="orders-table-wrapper">
                <Table hover responsive>
                    <thead>
                        <tr>
                            <th>Order ID</th>
                            <th>Customer</th>
                            <th>Items</th>
                            <th>Total</th>
                            <th>Status</th>
                            <th>Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {recentOrders.map((order) => (
                            <tr key={order.id}>
                                <td><strong>{order.id}</strong></td>
                                <td>{order.customer}</td>
                                <td>{order.items}</td>
                                <td>{formatPrice(order.total)}</td>
                                <td>
                                    <span className={`order-status ${order.status}`}>
                                        {getStatusLabel(order.status)}
                                    </span>
                                </td>
                                <td>{order.date}</td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </div>

            <div className="homepage-footer-space"></div>
        </Container>
    );
}