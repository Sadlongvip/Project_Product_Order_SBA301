import { Container, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import GalleryItem from "../components/GalleryItem";
import { getItem } from "../service/ItemService"
import { useEffect, useState } from "react";
import CarouselItem from "../components/CarouselItem";
import { getCategory } from "../service/CategoryService";
import "../css/global.css";
import "../css/home.css";
import img1 from "../assets/image.png";
import img2 from "../assets/image_2.png";
import img3 from "../assets/image_3.png";
import img4 from "../assets/image_4.png";
const ListItem = [
    {
        id: 1,
        name: "Nồi cơm",
        description: "Nồi cơm điện",
        price: "100000",
        image: img1
    },
    {
        id: 2,
        name: "Bình nước",
        description: "Bình nước thủy tinh",
        price: "200000",
        image: img2
    },
    {
        id: 3,
        name: "Đun nước",
        description: "Ấm đun nước siêu tốc",
        price: "300000",
        image: img3
    },
    {
        id: 4,
        name: "Nồi, chảo",
        description: "Nồi rất bền và chảo chống dính",
        price: "400000",
        image: img4
    }
];

export default function Home() {
    const [categories, setCategories] = useState([]);
    const [itemData, setItemData] = useState([]);
    const [itemFilter, setItemFilter] = useState([]);
    useEffect(() => {
        loadData();
    }, []);

    async function loadData() {
        let items = ListItem;
        try {
            const response = await getItem();
            console.log("API response:", response);
            if (Array.isArray(response) && response.length > 0) {
                items = response;
            }
        } catch (error) {
            console.log(error);
        }
        setItemData(items);
        setItemFilter(items);

        try {
            const responseCate = await getCategory();
            console.log("API response:", responseCate);
            setCategories(Array.isArray(responseCate) ? responseCate : []);
        } catch (error) {
            console.log(error);
        }
    }
    const handleChangeCategory = (e) => {
        const category = e.target.value;
        setItemFilter(category ? itemData.filter((item) => item.categoryId == category) : itemData);
    }

    return (
        <div>
            <h1 className="mt-3 text-center" style={{ color: "#1a1a2e" }}>
                Chào mừng đến với cửa hàng của chúng tôi
            </h1>
            <Container className="mt-5 ">
                <div className="mt-5 d-flex justify-content-between align-items-center banner-home">
                    <div className="banner-text">
                        <h2>Khám phá sản phẩm của chúng tôi</h2>
                        <p>Tìm những sản phẩm tốt nhất với giá tốt nhất</p>
                        <div className="mt-4">
                            <Link to="/store" className="hv2-btn-primary" style={{ display: 'inline-block', padding: '12px 28px', background: 'linear-gradient(135deg, #e94560, #c23152)', color: '#fff', borderRadius: '50px', textDecoration: 'none', fontWeight: '600', boxShadow: '0 4px 15px rgba(233, 69, 96, 0.4)' }}>
                                🛍️ Đi đến cửa hàng
                            </Link>
                        </div>
                    </div>
                    <CarouselItem ListItem={itemData} className="border CarouselItem-home" />
                </div>
                <div className="mt-5">
                    <h2 style={{ color: "#1a1a2e" }}>
                        Danh sách sản phẩm
                    </h2>
                    <Form.Label htmlFor="category">Danh mục sản phẩm</Form.Label>
                    <Form.Select aria-label="Default select example" onChange={handleChangeCategory}>
                        <option value="">Tất cả</option>
                        {categories?.map((category) => (
                            <option key={category.id} value={category.id}>
                                {category.name}
                            </option>
                        ))}
                    </Form.Select>
                    <GalleryItem ListItem={itemFilter} className={"GalleryItem-home"} />
                </div>
            </Container>

        </div>
    );
}