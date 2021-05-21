import { useEffect,useState } from "react";
import Modal from "../../components/modal/Modal"
import {SITE_NAME,PRODUCT_PER_PAGE} from "../../config"
import { Col, Container, Row } from "react-bootstrap";
import ContentProduct from "../../components/content/ContentProduct";
import { dataProduct } from "../dataProduct";
import { useQuery } from "../../func";

export default function AllProduct() {
    let page = parseInt(useQuery().get("page"));
    let data = {};
    if (isNaN(page)) {
        data = dataProduct.slice(0,PRODUCT_PER_PAGE);
    } else {
        data = dataProduct.slice(PRODUCT_PER_PAGE*(page-1),PRODUCT_PER_PAGE*(page-1)+12);
    }
    const [activeModal, setActiveModal] = useState(false);
    const [dataModal, setDataModal] = useState(null);
    const showModal = (item) => {
        setActiveModal(true);
        setDataModal(item);
    }
    const closeModal = () => {
        setActiveModal(false);
        setDataModal(null);
    }
    useEffect(() => {
        document.title = ` - ${SITE_NAME}`;
    },[])
    return (
        <div className="sec sec-product sec-product-archive hide-loading">
            <Container>
                {activeModal && dataModal !== null ? <Modal item={dataModal} handler={closeModal}/> : ""}
                <Row>
                    {data.map((item,index) => <Col lg={3} md={6} key={index}><ContentProduct item={item} handler={showModal}/></Col>)}
                </Row>
            </Container>
        </div>
    )
}