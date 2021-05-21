import { useState } from "react";
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
    const handleClick = (e) => {
        e.stopPropagation();
        setActive(!active);
    }
    const {item,icon} = props;
    return (
        <li className={item.hasChildren ? "has-menu" + (active ? " active" : "") : ""} onClick={handleClick}>
            <a href={item.url} onClick={(e) => e.stopPropagation()}>{item.label}</a>
            {item.hasChildren ? 
            <>
                <IconLevel level={item.level} icon={icon}/>
                <ul>
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
            <span className="menu-icon"><FiChevronDown /></span>
        )
    } else {
        return (
            <span className="menu-icon"><FiChevronRight /></span>
        )
    }
}