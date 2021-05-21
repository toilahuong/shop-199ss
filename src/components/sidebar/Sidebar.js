import Title from "../title/Title";
import {dataProduct} from "../../pages/dataProduct";
import { format_price } from "../../func";
export default function Sidebar() {
    const data = dataProduct.slice(0,5);
    const precentSale = (item) => (Math.round(item.sale_price*100/item.regular_price));
    const  price = (item) => {
        if (precentSale(item) === 100) return format_price(item.regular_price);
        else return <><span className="item__regular-price">{format_price(item.regular_price)}</span>{format_price(item.sale_price)}</>
    }
    return (
        <>
            <section className="sec-sidebar">
                <Title url="/san-pham" title="Sản phẩm mới" color="title-white"/>
                {data.map((item,index) => 
                    <div key={index} className="item">
                        <div className="item__thumbnail">
                            <img src={item.thumbnail} alt={item.title}/>
                        </div>
                        <div className="item__information">
                            <h6><a href={item.url}>{item.title}</a></h6>
                            <div className="price">{price(item)}</div>
                        </div>
                    </div>
                )}
            </section>
            <section className="sec-sidebar">
                <Title url="/tin-tuc" title="Tin tức mới" color="title-white"/>
                {data.map((item,index) => 
                    <div key={index} className="item">
                        <div className="item__thumbnail">
                            <img src={item.thumbnail} alt={item.title}/>
                        </div>
                        <div className="item__information">
                            <h6><a href={item.url}>{item.title}</a></h6>
                            <div className="price">{price(item)}</div>
                        </div>
                    </div>
                )}
            </section>
        </>
    )
}