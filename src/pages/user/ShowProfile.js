import axios from "axios";
import { useEffect, useState } from "react"
import { SERVER } from "../../config";

export default function ShowProfile() {
    const [data,setData] = useState({});
    useEffect(() => {
        (async () => {
            try {
                const res = await axios.get(`${SERVER}/api/user/get-user`, {withCredentials: true});
                setData(res.data);
            } catch (error) {
                console.log(error);
            }
        })()
    },[setData]); 
    return (
        <table>
            <tbody>
                <tr>
                    <td>Họ và tên:</td>
                    <td>{checkData(data.full_name)}</td>
                </tr>
                <tr>
                    <td>Ngày sinh:</td>
                    <td>{checkData(data.date_of_birth)}</td>
                </tr>
                <tr>
                    <td>Điện thoại:</td>
                    <td>{checkData(data.phone)}</td>
                </tr>
                <tr>
                    <td>Email:</td>
                    <td>{checkData(data.email)}</td>
                </tr>
                <tr>
                    <td>Địa chỉ:</td>
                    <td>{checkData(data.address)}</td>
                </tr>
            </tbody>
        </table>
    )
}
function checkData(data) {
    return data ? data : <div className="none">Vui lòng thêm thông tin mục này</div>;
}