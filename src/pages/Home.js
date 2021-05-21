import Modal from "../components/modal/Modal"
import { useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import Slider from "react-slick";
import Banner from "../components/banner/Banner";
import ContentProduct from "../components/content/ContentProduct";
import Title from "../components/title/Title";
import { dataProduct } from "./dataProduct";
import { useEffect } from "react";
import {SITE_NAME} from "../config"
import { dataPost } from "./dataPost";
import ContentPost from "../components/content/ContentPost";
export default function Home() {
    const [activeModal, setActiveModal] = useState(false);
    const [dataModal, setDataModal] = useState(null);
    const settings = {
        infinite: true,
        speed: 500,
        slidesToShow: 5,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 5000,
        responsive: [
            {
              breakpoint: 1024,
              settings: {
                slidesToShow: 3,
              }
            },
            {
              breakpoint: 600,
              settings: {
                slidesToShow: 2,
              }
            },
            {
              breakpoint: 480,
              settings: {
                slidesToShow: 1,
              }
            }
          ]
    };
    const showModal = (item) => {
        setActiveModal(true);
        setDataModal(item);
    }
    const closeModal = () => {
        setActiveModal(false);
        setDataModal(null);
    }
    useEffect(() => {
        document.title = `Trang chủ - ${SITE_NAME}`;
    },[])
    return (
        <div className="main hide-loading">
            <Banner />
            {activeModal && dataModal !== null ? <Modal item={dataModal} handler={closeModal}/> : ""}
            <section className="sec sec-product">
                <Container>
                    <Title url="/danh-muc-/ao" title="Áo"/>  
                    <Slider {...settings}>
                        {
                            dataProduct.map((item,index) => <ContentProduct key={index} item={item} handler={showModal}/>)
                        }
                    </Slider>
                </Container>
            </section>
            <section className="sec sec-product">
                <Container>
                    <Title url="/danh-muc-/quan" title="Quần"/>  
                    <Slider {...settings}>
                        {
                            dataProduct.map((item,index) => <ContentProduct key={index} item={item} handler={showModal}/>)
                        }
                    </Slider>
                </Container>
            </section>
            <section className="sec sec-product">
                <Container>
                    <Title url="/danh-muc-/giay-dep" title="Giày dép"/>  
                    <Slider {...settings}>
                        {
                            dataProduct.map((item,index) => <ContentProduct key={index} item={item} handler={showModal}/>)
                        }
                    </Slider>
                </Container>
            </section>
            <section className="sec sec-product">
                <Container>
                    <Title url="/danh-muc-/phu-kien" title="Phụ kiện"/>  
                    <Slider {...settings}>
                        {
                            dataProduct.map((item,index) => <ContentProduct key={index} item={item} handler={showModal}/>)
                        }
                    </Slider>
                </Container>
            </section>
            <section className="sec sec-post">
                <Container>
                    <Title url="/tin-tuc" title="Tin tức mới"/> 
                    <Row>
                        {dataPost.map((item,index) => <Col key={index} lg={3} md={6}><ContentPost  item={item}/></Col>)}
                    </Row> 
                    
                </Container>
            </section>
        </div>
    )
}