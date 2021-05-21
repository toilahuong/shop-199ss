import { useEffect } from "react";
import {SITE_NAME,PRODUCT_PER_PAGE} from "../../config"
import { Col, Container, Row } from "react-bootstrap";
import ContentPost from "../../components/content/ContentPost";
import { dataPost } from "../dataPost";
import { useParams } from "react-router";
import { useQuery } from "../../func";

export default function CategoryPost() {
    const {category_post} = useParams();
    let page = parseInt(useQuery().get("page"));
    let data = {};
    if (isNaN(page)) {
        data = dataPost.slice(0,PRODUCT_PER_PAGE);
    } else {
        data = dataPost.slice(PRODUCT_PER_PAGE*(page-1),PRODUCT_PER_PAGE*(page-1)+12);
    }
    useEffect(() => {
        document.title = ` - ${SITE_NAME}`;
    },[])
    return (
        <div className="sec sec-post sec-post-archive hide-loading">
            <Container>
                {category_post}
                <Row>
                    {data.map((item,index) => <Col lg={3} md={6} key={index}><ContentPost item={item}/></Col>)}
                </Row>
            </Container>
        </div>
    )
}