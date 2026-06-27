import { useEffect, useState } from "react";
import { Carousel, Spinner } from "react-bootstrap";
import { Link } from "react-router-dom";
import { getItem } from "../service/ItemService";
import "../css/homeV2.css";

// Fallback images
import img1 from "../assets/image.png";
import img2 from "../assets/image_2.png";
import img3 from "../assets/image_3.png";
import img4 from "../assets/image_4.png";

const DEMO_ITEMS = [
    { id: 1, name: "Nồi cơm điện cao cấp siêu tiết kiệm điện năng dung tích lớn 1.8L", price: 100000, image: img1, sold: 1200 },
    { id: 2, name: "Bình nước thủy tinh chịu nhiệt 1L có bọc giữ nhiệt kèm ống hút",  price: 200000, image: img2, sold: 340 },
    { id: 3, name: "Ấm đun siêu tốc 1.7L tự động ngắt an toàn, công suất 1500W", price: 300000, image: img3, sold: 850 },
    { id: 4, name: "Chảo chống dính sâu lòng 28cm đun từ, thiết kế tay cầm chống nóng", price: 400000, image: img4, sold: 5120 },
    { id: 5, name: "Bộ 3 hộp thủy tinh đựng thực phẩm nắp hít chân không", price: 150000, image: img1, sold: 2200 },
    { id: 6, name: "Bếp hồng ngoại cảm ứng đa chức năng nấu an toàn", price: 850000, image: img2, sold: 150 },
    { id: 7, name: "Máy xay sinh tố cầm tay mini sạc USB siêu tiện lợi", price: 290000, image: img3, sold: 4800 },
    { id: 8, name: "Cây lau nhà thông minh tự vắt 360 độ kèm chổi quét", price: 180000, image: img4, sold: 9000 },
];

const CATEGORIES = [
    { icon: "👗", name: "Thời Trang Nữ" },
    { icon: "👔", name: "Thời Trang Nam" },
    { icon: "💄", name: "Sắc Đẹp" },
    { icon: "📱", name: "Điện Thoại & Phụ Kiện" },
    { icon: "💻", name: "Máy Tính & Laptop" },
    { icon: "👟", name: "Giày Dép Nam" },
    { icon: "👠", name: "Giày Dép Nữ" },
    { icon: "👜", name: "Túi Ví Nữ" },
    { icon: "💍", name: "Đồng Hồ & Trang Sức" },
    { icon: "🧸", name: "Mẹ & Bé" },
    { icon: "🍳", name: "Nhà Cửa & Đời Sống" },
    { icon: "📚", name: "Nhà Sách Online" },
    { icon: "🎮", name: "Thiết Bị Điện Tử" },
    { icon: "🚗", name: "Ô Tô & Xe Máy" },
    { icon: "🍎", name: "Bách Hóa Online" },
    { icon: "🏋️", name: "Thể Thao & Du Lịch" },
    { icon: "🎫", name: "Voucher & Dịch Vụ" },
    { icon: "🐶", name: "Chăm Sóc Thú Cưng" },
    { icon: "📸", name: "Máy Ảnh & Quay Phim" },
    { icon: "🧺", name: "Giặt Giũ & Chăm Sóc" },
];

function formatPrice(price) {
    return Number(price).toLocaleString("vi-VN");
}

function formatSold(sold) {
    if(!sold) return 0;
    if(sold >= 1000) return (sold / 1000).toFixed(1).replace('.0', '') + "k";
    return sold;
}

export default function HomeV2() {
    const [itemData, setItemData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => { loadData(); }, []);

    async function loadData() {
        setLoading(true);
        try {
            const res = await getItem();
            // Mock sold data for items that don't have it
            const items = (Array.isArray(res) && res.length > 0 ? res : DEMO_ITEMS).map((i, index) => ({
                ...i,
                sold: i.sold || Math.floor(Math.random() * 5000) + 10,
                // Assign a fallback image based on index if the real image is missing
                image: i.image || (index % 4 === 0 ? img1 : index % 4 === 1 ? img2 : index % 4 === 2 ? img3 : img4)
            }));
            
            // Duplicate to fill grid if too few items (just for visual effect of Shopee grid)
            let displayItems = [...items];
            while(displayItems.length < 18 && displayItems.length > 0) {
                displayItems = [...displayItems, ...items];
            }
            setItemData(displayItems);
        } catch {
            setItemData(DEMO_ITEMS);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="hv2-page">
            <div className="hv2-container">
                
                {/* ══ HERO BANNER ══ */}
                <div className="hv2-hero-section">
                    <div className="hv2-hero-main">
                        <Carousel indicators={true} controls={true} interval={3000}>
                            <Carousel.Item>
                                <img src="https://cf.shopee.vn/file/vn-50009109-1a4a40ed47385a4ed98218991dff0311_xxhdpi" alt="Banner 1" />
                            </Carousel.Item>
                            <Carousel.Item>
                                <img src="https://cf.shopee.vn/file/vn-50009109-b4e8c56cc65860ccb9d7eeb55bbd1f85_xxhdpi" alt="Banner 2" />
                            </Carousel.Item>
                            <Carousel.Item>
                                <img src="https://cf.shopee.vn/file/vn-50009109-00ab575b642ec342cd28cd37667ff46d_xxhdpi" alt="Banner 3" />
                            </Carousel.Item>
                        </Carousel>
                    </div>
                    <div className="hv2-hero-side">
                        <img src="https://cf.shopee.vn/file/vn-50009109-906f36cdcc96f7ffc82aebc91642145d_xhdpi" alt="Promo 1" />
                        <img src="https://cf.shopee.vn/file/vn-50009109-d7ee6d418dd55169998eaee91398bb12_xhdpi" alt="Promo 2" />
                    </div>
                </div>

                {/* ══ CATEGORIES ══ */}
                <div className="hv2-section">
                    <div className="hv2-section-header">Danh Mục</div>
                    <div className="hv2-categories-grid">
                        {CATEGORIES.map((c, i) => (
                            <Link to="/store" className="hv2-cat-item" key={i}>
                                <div className="hv2-cat-icon">{c.icon}</div>
                                <div className="hv2-cat-name">{c.name}</div>
                            </Link>
                        ))}
                    </div>
                </div>

                {/* ══ PRODUCTS ══ */}
                <div className="hv2-sticky-header">
                    Gợi Ý Hôm Nay
                </div>

                {loading ? (
                    <div className="text-center py-5">
                        <Spinner animation="border" style={{ color: "var(--shopee-orange)" }} />
                    </div>
                ) : (
                    <>
                        <div className="hv2-product-grid">
                            {itemData.map((item, idx) => (
                                <Link to={`/item/${item.id}`} className="hv2-product-card" key={`${item.id}-${idx}`}>
                                    <div className="hv2-product-img">
                                        <img src={item.image} alt={item.name} />
                                        {idx % 3 === 0 && (
                                            <div className="hv2-badge-favorite">
                                                <span>Yêu thích</span>
                                            </div>
                                        )}
                                    </div>
                                    <div className="hv2-product-info">
                                        <div className="hv2-product-name">{item.name}</div>
                                        <div className="hv2-product-footer">
                                            <div className="hv2-product-price">
                                                <span>₫</span>{formatPrice(item.price)}
                                            </div>
                                            <div className="hv2-product-sold">
                                                Đã bán {formatSold(item.sold)}
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                        
                        <div className="text-center mt-4 mb-5">
                            <Link to="/store" className="btn" style={{ width: '390px', maxWidth: '100%', height: '40px', borderRadius: '2px', border: '1px solid rgba(0,0,0,.09)', color: '#555', background: '#fff', fontSize: '0.9rem', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', textDecoration: 'none' }}>
                                Xem Thêm
                            </Link>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}
