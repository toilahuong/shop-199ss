import { Container } from "react-bootstrap";
import { dataMenu } from "../dataMenu";
import ShowMenu from "./ShowMenu";

export default function DesktopMenu() {
    return (
        <div className="desktop-menu">
            <Container>
                <div className="d-flex justify-content-between align-items-center">
                    <ul className="menu">
                        <ShowMenu menu={dataMenu} icon="right"/>
                    </ul>
                    <div className="menu-u">
                        <a href="/dang-ky">Đăng kí</a> / <a href="/dang-nhap">Đăng nhập</a>
                    </div>
                </div>
            </Container>
        </div>
    );
}
