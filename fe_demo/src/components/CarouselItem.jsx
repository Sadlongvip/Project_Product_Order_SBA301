import { Carousel } from "react-bootstrap";
import "../css/global.css";


export default function CarouselItem({ ListItem = [], className }) {
    return (
        <Carousel className={className}>
            {
                ListItem.map((item) => (
                    <Carousel.Item className="h-100" key={item.id}>
                        <img
                            className="d-block w-100 "
                            src={item.image}
                            alt={"error loading"}
                        />
                    </Carousel.Item>
                ))
            }
        </Carousel>
    );
}