import { Container, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";



export default function ErrorLink() {
    const navigate = useNavigate();
    return (
        <Container className="text-center">
            <h1>
                Xin lỗi, đường dẫn bạn truy cập không tồn tại!
            </h1>
            <Button variant="primary" onClick={() => navigate('/')}>
                Quay lại trang chủ
            </Button>
        </Container>
    );
}