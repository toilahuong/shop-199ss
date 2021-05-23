import { GrClose } from "react-icons/gr";
import { useDispatch, useSelector } from "react-redux";
import { format_price } from "../../../func";
import { decrementNumberProduct, removeProduct } from "../../../features/cart/cartSlice";
import { useEffect, useState } from "react";
export default function ShowCart(props) {
    const {isActive,handler} = props;
    const dispatch = useDispatch();
    const cart = useSelector(state => state.cart);
    const listProduct = cart.listProduct;
    const [sumPrice, setSumPrice] = useState(0);
    const precentSale = (item) => (Math.round(item.sale_price*100/item.regular_price));
    const  price = (item) => {
        if (precentSale(item) === 100) return format_price(item.regular_price);
        else return <><span className="item__regular-price">{format_price(item.regular_price)}</span><span className="item__price">{format_price(item.sale_price)}</span></>
    }
    const handleClickRemoveProduct = (amount,index) => {
        const deProduct = decrementNumberProduct(amount);
        dispatch(deProduct);
        const rmProduct = removeProduct(index); 
        dispatch(rmProduct);
    }
    useEffect(() => {
        let sum = 0;
        listProduct.forEach((item) => sum+=(item.sale_price*item.amount));
        setSumPrice(sum);
    },[listProduct])
    return (
        <div className={"show-cart" + (isActive ? " active": "")}>
            <div className="show-cart__bg" onClick={handler}></div>
            <div className="show-cart__main">
                <button className="btn btn-close" onClick={handler}> <GrClose /> </button>
                <ul>
                    {listProduct.map((item,index) => 
                        <li key={index} className="item"> 
                            <button className="btn btn-item-close" onClick={() => handleClickRemoveProduct(item.amount,index)}> <GrClose /> </button>
                            <div className="item__thumbnail">
                                <img src={item.images[0]} alt={item.title}/>
                            </div> 
                            <div className="item__information">
                                <h6><a href={item.url}>{item.title}</a></h6>
                                <div>{item.color}/ {item.size}</div>
                                <div><span className="item__amount">{item.amount}</span> {price(item)}</div>
                            </div>
                        </li>
                    )}
                    {listProduct.length === 0 ? <div className="item__none"> Chưa có sản phầm nào được thêm </div>: ""}
                </ul>
                <div className="line"></div>
                <div className="show-cart__price">
                    <div>Tổng tiền:</div>
                    <div><b>{format_price(sumPrice)}</b></div>
                </div>
                <div className="show-cart__btn">
                    <a href="/cart">Xem giỏ hàng</a>
                    <a href="/thanh-toan">Thanh toán</a>
                </div>
            </div>
            
        </div>
    )
}