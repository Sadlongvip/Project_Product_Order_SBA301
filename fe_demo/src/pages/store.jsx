import { Container, Row, Col, Card, Modal, Button, Image, Alert, Spinner } from "react-bootstrap";
import { useEffect, useState } from "react";
import { getItem } from "../service/ItemService";
import { addToCart } from "../service/CartService";
import { useUser } from "../hooks/useUser";

const ListItem = [
    {
        id: 1,
        name: "T-shirt",
        description: "A comfortable cotton t-shirt",
        price: "100000",
        image: "https://images.unsplash.com/photo-1523359346567-b625d7997f46?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
    },
    {
        id: 2,
        name: "Jeans",
        description: "A pair of stylish jeans",
        price: "200000",
        image: "https://images.unsplash.com/photo-1523359346567-b625d7997f46?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
    },
    {
        id: 3,
        name: "Shoes",
        description: "A pair of comfortable shoes",
        price: "300000",
        image: "https://images.unsplash.com/photo-1523359346567-b625d7997f46?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
    },
    {
        id: 4,
        name: "Hat",
        description: "A stylish hat",
        price: "400000",
        image: "https://images.unsplash.com/photo-1523359346567-b625d7997f46?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
    },
    {
        id: 5,
        name: "T-shirt",
        description: "A comfortable cotton t-shirt",
        price: "100000",
        image: "https://images.unsplash.com/photo-1523359346567-b625d7997f46?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
    },
    {
        id: 6,
        name: "Jeans",
        description: "A pair of stylish jeans",
        price: "200000",
        image: "https://images.unsplash.com/photo-1523359346567-b625d7997f46?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
    },
    {
        id: 7,
        name: "Shoes",
        description: "A pair of comfortable shoes",
        price: "300000",
        image: "https://images.unsplash.com/photo-1523359346567-b625d7997f46?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
    },
    {
        id: 8,
        name: "Hat",
        description: "A stylish hat",
        price: "400000",
        image: "https://images.unsplash.com/photo-1523359346567-b625d7997f46?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
    },
    {
        id: 9,
        name: "Hat",
        description: "A stylish hat",
        price: "400000",
        image: "https://images.unsplash.com/photo-1523359346567-b625d7997f46?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
    },
    {
        id: 10,
        name: "Hat",
        description: "A stylish hat",
        price: "400000",
        image: "https://images.unsplash.com/photo-1523359346567-b625d7997f46?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
    }
];
export default function Store() {
    const user = useUser();
    const [loading, setLoading] = useState(false);
    const [loadingButton, setLoadingButton] = useState(false);
    const [itemData, setItemData] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);
    const [showAlert, setShowAlert] = useState(false);
    const [msgAlert, setMsgAlert] = useState("");
    const [search, setSearch] = useState("");


    const handleShow = () => setShowModal(true);
    const handleClose = () => { setShowModal(false); setSelectedItem(null); }
    const handleItemClick = (item) => {
        setSelectedItem(item);
        handleShow();
    };
    // Tính filteredItems từ search mà KHÔNG ghi đè itemData gốc
    const filteredItems = itemData.filter((item) =>
        item.name.toLowerCase().includes(search.toLowerCase())
    );
    async function handleAddToCart() {
        setLoadingButton(true);
        const responeStatus = await addToCart(selectedItem.id, user?.id);
        if (responeStatus == 200) {
            setShowAlert(true);
            setMsgAlert("Đã thêm vào giỏ hàng thành công!");
            setTimeout(() => setShowAlert(false), 5000);
        } else {
            setShowAlert(true);
            setMsgAlert("Thêm vào giỏ hàng thất bại!");
            setTimeout(() => setShowAlert(false), 5000);
        }
        setLoadingButton(false);
        handleClose();
    }
    //load data
    useEffect(() => {
        loadData();
    }, []);
    async function loadData() {
        setLoading(true);
        try {
            const response = await getItem();
            console.log("API response:", response);
            // setItemData(Array.isArray(response) ? response : []);
            setItemData(response);
        } catch (error) {
            console.log(error);
        }
        setLoading(false);
    }
    //============================


    // return (
    //     <Container>
    //         <h1 className="mt-5">Store</h1>
    //         <GalleryItem ListItem={itemData} />
    //     </Container>
    // );
    return (
        <Container>
            <div className="my-3 d-flex gap-2">
                <input
                    type="text"
                    className="form-control"
                    placeholder="🔍 Tìm sản phẩm..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
                {search && (
                    <Button variant="outline-secondary" onClick={() => setSearch("")}>
                        Xóa
                    </Button>
                )}
            </div>
            <>
                {showAlert && (
                    <Alert
                        variant={msgAlert.includes("thất bại") ? "danger" : "success"}
                        dismissible
                        onClose={() => setShowAlert(false)}
                        className="mt-3"
                    >
                        {msgAlert}
                    </Alert>
                )}
                {loading ? (
                    <div className="d-flex justify-content-center align-items-center" style={{ minHeight: "300px" }}>
                        <Spinner animation="border" variant="primary" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </Spinner>
                    </div>
                ) : (
                    <Row>
                        {filteredItems.map((item) => (
                            <Col className="p-2" xs={6} md={4} lg={3} key={item.id}>
                                <Card className="h-100" onClick={() => handleItemClick(item)}>
                                    <Card.Img variant="top" src={item.image} ce />
                                    <Card.Body>
                                        <Card.Title>Name: {item.name}</Card.Title>
                                        <Card.Text className="text-success fw-bold">
                                            Price: {item.price} VNĐ
                                        </Card.Text>
                                    </Card.Body>
                                </Card>
                            </Col>
                        ))}
                    </Row>
                )}

                <Modal show={showModal} onHide={handleClose} centered>
                    <Modal.Header closeButton>
                        <Modal.Title>Item Detail</Modal.Title>
                    </Modal.Header>
                    <Modal.Body className="d-flex justify-content-around">
                        <div>
                            <Image src={selectedItem?.image} rounded fluid />
                        </div>
                        <div>
                            <Modal.Title>Name: {selectedItem?.name}</Modal.Title>
                            <Modal.Title>Description: {selectedItem?.description}</Modal.Title>
                            <Modal.Title>Price: {selectedItem?.price} VNĐ</Modal.Title>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="success" onClick={handleAddToCart} disabled={loadingButton}>
                            {loadingButton ? 'Đang thêm vào giỏ hàng...' : 'Thêm vào giỏ hàng'}
                        </Button>
                    </Modal.Footer>
                </Modal>
            </>
        </Container>



    );
}