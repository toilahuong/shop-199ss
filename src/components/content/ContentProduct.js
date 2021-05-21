import {AiOutlineShoppingCart, AiOutlineSearch} from "react-icons/ai";
import { format_price } from "../../func";
export default function ContentProduct(props) {
    const { item, handler } = props;
    const precentSale = (Math.round(item.sale_price*100/item.regular_price));
    const  price = () => {
        if (precentSale === 100) return format_price(item.regular_price);
        else return <><span className="item__body-regular-price">{format_price(item.regular_price)}</span>{format_price(item.sale_price)}</>
    }
    const handlerClickShowItem = (e) => {
        e.preventDefault();
        handler(item);
    }
    return (
        <div className="item">
            <a href={item.url}>
                <div className="item__thumbnail">
                    <img loading="lazy" src={item.thumbnail} alt="" className="img-fluid" />
                    <div className="item__thumbnail-bg"></div>
                    <button className="btn btn__show-item" onClick={handlerClickShowItem}>
                        <AiOutlineSearch />
                        <span> Xem nhanh </span>
                    </button>
                    {precentSale !== 100 ? <div className="item__sale">{precentSale}%</div> : ""}
                    
                </div>
                <div className="item__body">
                    <h6 className="item__body-title">{item.title}</h6>
                    <p className="item__body-price">{price()}</p>
                    <div className="item__body-cart">
                        <button className="btn btn__add-to-cart"> <AiOutlineShoppingCart /> Giỏ hàng </button>
                    </div>
                </div>
            </a>
        </div>
    )
}
