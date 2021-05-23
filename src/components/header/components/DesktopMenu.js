import { Container } from "react-bootstrap";
import { BiUserCircle } from "react-icons/bi";
import { useSelector } from "react-redux";
import { isLoggedIn } from "../../../func";
import { dataMenu } from "../dataMenu";
import ShowMenu from "./ShowMenu";

export default function DesktopMenu() {
    const Auth = useSelector((state) => state.auth);
    return (
        <div className="desktop-menu">
            <Container>
                <div className="d-flex justify-content-between align-items-center">
                    <ul className="menu">
                        <ShowMenu menu={dataMenu} icon="right"/>
                    </ul>
                    {
                        isLoggedIn() ? 
                            <div className="menu-u">
                                <BiUserCircle style={{fontSize: '20px', verticalAlign: 'middle'}} /> <a href="/profile">{Auth.current.full_name}</a>
                            </div>    
                        : 
                            <div className="menu-u">
                                <a href="/dang-ky">Đăng kí</a> / <a href="/dang-nhap">Đăng nhập</a>
                            </div>
                    }
                </div>
            </Container>
        </div>
    );
}
