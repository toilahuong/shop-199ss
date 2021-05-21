import { useState } from 'react';
import {AiFillCaretDown} from 'react-icons/ai';
export default function Search() {
    const [category, setCategory] = useState({
        value: 0,
        name: "Chọn danh mục"
    });
    const [content, setContent] = useState('');
    const handleSubmit = (e) => {
        e.preventDefault();
        window.location = `/search?s=${content}${category.value === 0 ? "" : "&product_cat="+category.value}`;
    }
    const listCategory = [
        {
            value: 123,
            name: "Áo"
        },
        {
            value: 456,
            name: "Quần"
        }
    ]

    return (
        <form className="header-search" onSubmit={handleSubmit}>
            <div className="search__select dropdown d-none d-md-block">
                <label>{category.name} <AiFillCaretDown className="search__select-icon" /></label>
                <ul className="search__select-list dropdown-menu"> 
                    {listCategory.map((item,index) => 
                        <li key={index}
                            onClick={() => setCategory(item)} 
                            className="search__select-item">
                            {item.name}
                        </li>
                    )}
                </ul>
            </div>
            <div className="search__input">
                <input type="text" placeholder="Nhập nội dung..." onChange={(e) => setContent(e.target.value)} defaultValue=""/>
            </div>
            <div className="search__button">
                <button type="submit">Tìm kiếm</button>
            </div>
        </form>
    );
}