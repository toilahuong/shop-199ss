import { Col, Container, Row } from "react-bootstrap";
import { ToastContainer } from "react-toastify";

export default function Footer() {
    return (
        <div className="footer">
            <Container>
                <Row>
                    <Col lg={3} sm={6}>
                        <h4>Thông tin</h4>
                        <ul>
                            <li><a href="/">Trang chủ</a></li>
                            <li><a href="/">Sản phẩm</a></li>
                            <li><a href="/">Tin tức</a></li>
                            <li><a href="/">Liên hệ</a></li>
                        </ul>
                    </Col>
                    <Col lg={3} sm={6}>
                        <h4>Chính sách</h4>
                        <ul>
                            <li><a href="/">Hướng dẫn mua hàng</a></li>
                            <li><a href="/">Chính sách đổi trả</a></li>
                            <li><a href="/">Chính sách thanh toán</a></li>
                            <li><a href="/">Chính sách giao hàng</a></li>
                            <li><a href="/">Chính sách bảo mật</a></li>
                        </ul>
                    </Col>
                    <Col lg={3} sm={6}>
                        <h4>Liên hệ</h4>
                        <ul>
                            <li><a href="/">Hướng dẫn mua hàng</a></li>
                            <li><a href="/">Chính sách đổi trả</a></li>
                            <li><a href="/">Chính sách thanh toán</a></li>
                            <li><a href="/">Chính sách giao hàng</a></li>
                            <li><a href="/">Chính sách bảo mật</a></li>
                        </ul>

                    </Col>
                    <Col lg={3} sm={6}>
                        <h4>Theo dõi chúng tôi</h4>
                    </Col>
                </Row>
            </Container>
            <ToastContainer />
        </div>
    )
}