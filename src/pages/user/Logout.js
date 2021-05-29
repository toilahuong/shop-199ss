import axios from "axios"
import { useEffect, useState } from "react";
import { SERVER } from "../../config"

export default function Logout() {
    const [csrf, setCsrf] = useState();
    const handleClick = async () => {
        await axios.post(`${SERVER}/api/user/logout`,{_csrf: csrf},{withCredentials: true});
        window.location = '/dang-nhap';
    }
    useEffect(() => {
        (async () => {
            try {
                const csrf = await axios.get(`${SERVER}/api/form`, {withCredentials: true})
                return setCsrf(csrf.data.csrfToken);
            } catch (error) {
                console.log(error);
            }
        })();
    },[]);
    return csrf ?
    (
        <div className="px-3">
            Bạn có chắc chắn muốn đăng xuất? <button className="btn btn-primary m-0 mt-3" onClick={handleClick}> Đăng xuất </button>
        </div>
    ) : ''
}