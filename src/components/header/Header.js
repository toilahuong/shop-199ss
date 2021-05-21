import {Container} from "react-bootstrap";
import {FiPhoneCall} from 'react-icons/fi';
import {GoMail, GoThreeBars} from 'react-icons/go';
import {BiMap} from 'react-icons/bi';
import Search from "./components/Search";
import { AiOutlineShoppingCart } from "react-icons/ai";
import DesktopMenu from "./components/DesktopMenu";
import MobileMenu from "./components/MobileMenu";
import { CLIENT } from "../../config";
import { useState } from "react";
import { useSelector } from "react-redux";
import ShowCart from "./components/ShowCart";
export default function Header() {
    const [activeMobileMenu, setActiveMobileMenu] = useState(false);
    const handlerActiveMobileMenu = () => setActiveMobileMenu(!activeMobileMenu);
    const [activeShowCart, setActiveShowCart] = useState(false);
    const handlerActiveShowCart = () => setActiveShowCart(!activeShowCart);
    const cartNumber = useSelector(state => state.cart);
    return (
        <div className="header">
            <div className="header-top">
                <Container>
                    <div className="d-flex justify-content-between">
                        <ul className="header-top__contact">
                            <li>
                                <FiPhoneCall className="header-top__contact--icon"/>
                                <span>Hotline: <a href="#hotline">0357654619</a></span>
                            </li>
                            <li>
                                <GoMail className="header-top__contact--icon"/>
                                <span>Email: <a href="#email">vbh30062001@gmail.com</a></span>
                            </li>
                        </ul>
                        <ul className="header-top__contact right">
                            <li>
                                <BiMap className="header-top__contact--icon"/>
                                <span>số 10, Lưu Nhân Chú, Tổ 3, Thị Trấn Sóc Sơn, Hà Nội</span>
                            </li>
                        </ul>
                    </div>
                </Container>
            </div>
            <div className="header-mid">
                <Container>
                    
                    <div className="d-flex justify-content-between align-items-center flex-wrap flex-lg-nowrap">
                        <button className="btn btn-open d-lg-none" onClick={() => setActiveMobileMenu(!activeMobileMenu)}>
                            <GoThreeBars/>
                        </button>
                        <div className="header-mid__logo">
                            <a href={CLIENT}><img src={CLIENT+"/assets/images/logo-199s.png"} alt="199s clothes"/></a>
                        </div>
                        <div className="header-mid__search  order-4 order-lg-3">
                            <Search />
                        </div>
                        <div className="header-mid__cart order-3 order-lg-4">
                            <button className="btn" onClick={() => setActiveShowCart(!activeShowCart)}>
                                <AiOutlineShoppingCart className="header-mid__cart-icon"/>
                                <span className="header-mid__cart-count"> {cartNumber.numberProduct} </span>
                            </button>
                        </div>
                    </div>   
                </Container>
            </div>
            <DesktopMenu/>
            <MobileMenu isActive={activeMobileMenu} handler={handlerActiveMobileMenu}/>
            <ShowCart isActive={activeShowCart} handler={handlerActiveShowCart}/>
        </div>
    )
}
