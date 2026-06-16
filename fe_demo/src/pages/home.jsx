import { Container } from "react-bootstrap"
import GalleryItem from "../components/GalleryItem";
import { getItem } from "../service/ItemService"
import { useEffect, useState } from "react";
import CarouselItem from "../components/CarouselItem";
import "../css/global.css";
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
    const [itemData, setItemData] = useState([]);
    useEffect(() => {
        loadData();
    }, []);

    async function loadData() {
        try {
            const response = await getItem();
            console.log("API response:", response);
            setItemData(Array.isArray(response) ? response : []);
        } catch (error) {
            console.log(error);
        }
        setItemData(ListItem);
    }


    return (
        <div>
            <h1 className="mt-3 text-center" style={{ color: "#1a1a2e" }}>
                Welcome To Our Store
            </h1>
            <Container className="mt-5 ">
                <div className="mt-5 d-flex justify-content-between align-items-center banner-home">
                    <div className="banner-text">
                        <h2>Discover Our Collection</h2>
                        <p>Find the best products at the best prices</p>
                    </div>
                    <CarouselItem ListItem={itemData} className="border CarouselItem-home" />
                </div>
                <div className="mt-5">
                    <h2 style={{ color: "#1a1a2e" }}>
                        Danh sách sản phẩm
                    </h2>
                    <GalleryItem ListItem={itemData} className={"GalleryItem-home"} />
                </div>
            </Container>

        </div>
    );
}