import { useRef, useState } from "react";
import $ from "jquery";
import { FiChevronDown,FiChevronRight } from "react-icons/fi";
export default function ShowMenu(props) {
    const {menu,icon} = props;
    return menu.map(
        (item,index) => 
            <MenuItem key={index} item={item} icon={icon} />
        
    );
}
function MenuItem(props) {
    const [active, setActive] = useState(false);
    const elm = useRef();
    const handleClick = (e) => {
        setActive(!active);
        if(elm.current) {
            let element = $(elm.current);
            element.animate({'height': 'toggle'})
        }
    }
    const {item,icon} = props;
    return (
        <li className={item.hasChildren ? "has-menu" : ""} >
            <a href={item.url}>{item.label}</a>
            {item.hasChildren ? 
            <>
                <IconLevel onClick={handleClick} level={item.level} icon={icon} />
                <ul ref={elm}>
                    <ShowMenu menu={item.childrens} icon={icon}/>
                </ul>
            </> : ""}
        </li>
    )
}

function IconLevel(props) {
    const {level, icon} = props;
    if (level === 1 || icon === "down") {
        return (
            <span onClick={props.onClick}className="menu-icon"><FiChevronDown /></span>
        )
    } else {
        return (
            <span className="menu-icon"><FiChevronRight /></span>
        )
    }
}