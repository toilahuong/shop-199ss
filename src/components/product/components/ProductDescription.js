import { useState } from "react"
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { incrementNumberProduct, incrementProduct } from "../../../features/cart/cartSlide";
import {format_price} from "../../../func";
export default function ProductDescription() {
    const [amount,setAmount] = useState(1);
    const [colorOption,setColorOption] = useState(null);
    const [sizeOption,setSizeOption] = useState(null);
    const dispatch = useDispatch();
    let item = {
        id: 5,
        title: "Áo phông basic 17",
        url: "/san-pham/ao/ao-phong-consequense",
        images: [
            "/assets/images/thumbnail-1.jpg",
            "/assets/images/thumbnail-2.jpg",
            "/assets/images/thumbnail-3.jpg",
            "/assets/images/thumbnail-4.jpg",
            "/assets/images/thumbnail-5.jpg",
            "/assets/images/thumbnail-6.jpg",
        ],
        sizes: [
            {
                id: 1,
                size: "S"
            },
            {
                id: 2,
                size: "M"
            },
            {
                id: 3,
                size: "L"
            }
        ],
        colors: [
            {
                id: 1,
                color: "#000",
                name: "Đen",
            },
            {
                id: 2,
                color: "#ff0000",
                name: "Đỏ",
            }
        ],
        regular_price: 99000,
        sale_price: 90000,
        status: 1
    }
    const precentSale = (Math.round(item.sale_price*100/item.regular_price));
    const  price = () => {
        if (precentSale === 100) return format_price(item.regular_price);
        else return <><span className="product-description__head-regular-price">{format_price(item.regular_price)}</span>{format_price(item.sale_price)}</>
    }
    const handlerClickAddToCart = (e) => {
        e.preventDefault();
        if(colorOption === null) {
            toast.warn("⚠ Vui lòng chọn màu sản phẩm!",{
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                });
            return;
        } else if(sizeOption === null) {
            toast.warn("⚠ Vui lòng chọn size sản phẩm!",{
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                });
            return;
        }
        const data = {
            id: item.id,
            title: item.title,
            url: item.url,
            images: item.images,
            color: colorOption,
            size: sizeOption,
            regular_price: item.regular_price,
            sale_price: item.sale_price,
            amount: amount
        }
        const actionNumber = incrementNumberProduct(amount);
        dispatch(actionNumber);
        const actionList = incrementProduct(data);
        dispatch(actionList);
        toast.success(`✔ Đã thêm ${data.amount} ${data.title}, size ${data.size}, màu ${data.color} vào giỏ hàng`,{
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            });
    }
    return (
        <div className="product-description">
            <h1>{item.title}</h1>
            <ul className="product-description__head">
                <li>Giá: <span className="product-description__head-price"> {price()}</span></li>
                <li>Tình trạng: <span className="product-description__head-status"> Còn hàng</span></li>
                <li>Mã sản phẩm: <span className="product-description__head-code"> DCCN341</span></li>
                <li>Đánh giá: <span className="product-description__head-rate"> <img src="/assets/images/star.png" alt=""/> <img src="/assets/images/star.png" alt=""/> <img src="/assets/images/star.png" alt=""/> <img src="/assets/images/star.png" alt=""/> <img src="/assets/images/star.png" alt=""/></span></li>
            </ul>
            <p className="product-description__content">
            Trang phục giúp tô điểm thêm sự tự tin, vẻ đẹp và khí chất cho mỗi người. Nhiều người rất thích áo sơ mi hoa, song bạn luôn cảm thấy mình không phù hợp với loại áo này. Tin COCCACH đi, không phải bạn không diện được kiểu áo này mà là bạn chưa chọn được chiếc áo hợp với mình thôi. Trong bài viết hôm nay, chúng mình sẽ giúp bạn giải quyết vấn đề này.
            </p>
            <div className="line"></div>
            <div className="product-description__body">
                <div className="product-description__body-label">Màu sắc:</div>
                {item.colors.map((it,index) => 
                    <div key={index} className="product-description__body-color">
                        <input 
                            type="radio" 
                            id={"color-"+index} 
                            name="color" 
                            value={it.name}
                            checked={it.name === colorOption}
                            onChange={(e) => setColorOption(e.target.value)}
                        />
                        <label htmlFor={"color-"+index} style={{background: it.color}}></label>
                        <span>{it.name}</span>
                    </div>
                )}
            </div>
            <div className="product-description__body">
                <div className="product-description__body-label">Size:</div>
                {item.sizes.map((it,index) => 
                    <div key={index} className="product-description__body-size">
                        <input 
                            type="radio" 
                            id={"size-"+index} 
                            name="size" 
                            value={it.size}
                            checked={it.size === sizeOption}
                            onChange={(e) => setSizeOption(e.target.value)}
                        />
                        <label htmlFor={"size-"+index}> {it.size}</label>
                    </div>
                )}
            </div>
            <div className="product-description__add-to-cart">
                <div className="d-flex">
                    <button className="btn btn-updown" onClick={() => (amount <= 1 ? setAmount(1) : setAmount(amount-1))}>-</button>
                    <input type="number" value={amount} onChange={(e) => setAmount(parseInt(e.target.value))}  min={1} max={99}/>
                    <button className="btn btn-updown" onClick={() => (amount >= 99 ? setAmount(99) : setAmount(amount+1))}>+</button>
                </div>
                <button className="btn btn-add-to-cart" onClick={handlerClickAddToCart}> Thêm vào giỏ </button>
            </div>
        </div>
    )
}