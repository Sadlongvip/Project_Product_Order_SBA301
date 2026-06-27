import { Col, Row, Card, Modal, Button, Image } from "react-bootstrap";
import { useState } from "react";



export default function GalleryItem({ ListItem = [], className }) {
    const [showModal, setShowModal] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);
    const handleClose = () => setShowModal(false);
    const handleShow = () => setShowModal(true);
    const handleItemClick = (item) => {
        setSelectedItem(item);
        handleShow();
    };



    if (ListItem.length === 0) {
        return <div>No items found</div>;
    } 
    return (
        <>
            <Row className={className}>
            {ListItem.map((item) => (
                <Col className="p-2" xs={6} md={4} lg={3} key={item.id}>
                <Card className="h-100" onClick={() => handleItemClick(item)}>
                    <Card.Img variant="top" src={item.image} />
                    <Card.Body>
                        <Card.Title>{item.name}</Card.Title>
                        <Card.Text className="text-success fw-bold">
                            {item.price} Vnd
                        </Card.Text>
                    </Card.Body>
                </Card>
            </Col>
            ))}
        </Row>

        <Modal show={showModal} onHide={handleClose} centered>
            <Modal.Header closeButton>
                <Modal.Title>Item Detail</Modal.Title>
            </Modal.Header>
            <Modal.Body className="d-flex justify-content-around">
                <div>
                    <Image src={selectedItem?.image} rounded fluid />
                </div>
                <div>
                    <Modal.Title>{selectedItem?.name}</Modal.Title>
                <Modal.Title>{selectedItem?.description}</Modal.Title>
                <Modal.Title>{selectedItem?.price}</Modal.Title>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
            </Modal.Footer>
        </Modal>
        </>
        
    );
}