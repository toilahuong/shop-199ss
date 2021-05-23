import { dataMenu } from "../dataMenu";
import { GrClose } from "react-icons/gr";
import ShowMenu from "./ShowMenu";
import { useEffect, useState } from "react";
import { CLIENT } from "../../../config";
import { isLoggedIn } from "../../../func";
export default function MobileMenu(props) {
    const {isActive,handler} = props;
    const [menu, setMenu] = useState([]);
    useEffect(() => {
        let userMenu = [];
        if(isLoggedIn()) {
            userMenu = [
                {
                    label: "Tài khoản",
                    url: CLIENT+"/profile",
                    level: 1,
                    hasChildren: false,
                }
            ];
        } else {
            userMenu = [
            
                {
                    label: "Đăng ký",
                    url: CLIENT+"/dang-ky",
                    level: 1,
                    hasChildren: false,
                },
                {
                    label: "Đăng Nhập",
                    url: CLIENT+"/dang-nhap",
                    level: 1,
                    hasChildren: false,
                }
            ];
        }
        
        const newData = [...dataMenu,...userMenu];
        setMenu(newData);
    },[])
    return (
        <div className={"sidebar" + (isActive ? " active": "")}>
            <div className="sidebar__bg" onClick={handler}></div>
            
            <div className="mobile-menu">
                <button className="btn btn-close" onClick={handler}> <GrClose /> </button>
                <ul className="menu">
                    <ShowMenu menu={menu} icon="down"/>
                </ul>
            </div>
        </div>
    );
}