import axios from "axios";
import { ErrorMessage, FastField, Form, Formik } from "formik";
import { useEffect, useState } from "react"
import { SERVER, SITE_NAME } from "../../config";
import * as Yup from "yup";
import validateMsg from "../../validateMsg";
import { toast } from "react-toastify";
const EditProfileSchema = Yup.object().shape({
    full_name: Yup.string()
      .required(() => validateMsg("Họ và tên", "required")),
    phone: Yup.string()
      .required(() => validateMsg("Số điện thoại", "required")),
    address: Yup.string()
      .required(() => validateMsg("Địa chỉ", "required")),
    password: Yup.string()
      .required(() => validateMsg("Mật khẩu", "required")),
});
export default function EditProfile() {
    const [initialValues,setInitialValues] = useState();
    const settings = {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
    };
    useEffect(() => {
        document.title = `Sửa thông tin cá nhân - ${SITE_NAME}`;
    },[])
    useEffect(() => {
        (async () => {
            try {
                const user = await axios.get(`${SERVER}/api/user/get-user`, {withCredentials: true})
                const csrf = await axios.get(`${SERVER}/api/form`, {withCredentials: true})
                let data = {
                    ...user.data,
                    _csrf: csrf.data.csrfToken
                }
                data.address = data.address ? data.address : "";
                data.date_of_birth = data.date_of_birth ? data.date_of_birth : "";
                delete data.updatedAt;
                delete data.createdAt;
                return setInitialValues(data);
            } catch (error) {
                console.log(error);
            }
        })();
    },[]);
    return initialValues ?
    (
        <Formik
            initialValues={{...initialValues,password: ''}}
            validationSchema={EditProfileSchema}
            onSubmit={async (values) => {
        
                try {
                    console.log(values);
                    const res = await axios.put(`${SERVER}/api/user/edit`, {
                        full_name: values.full_name,
                        date_of_birth: values.date_of_birth,
                        address: values.address,
                        phone: values.phone,
                        password: values.password,
                        _csrf: values._csrf
                    },{ withCredentials: true });
                    if(!res.data.isUpdate) throw new Error("error");
                    toast.success("Sửa thông tin thành công",settings);
                    setTimeout(() => {
                        window.location.reload();                    
                    },2000);
                } catch (error) {
                    if(error.response.data.errors) {
                        error.response.data.errors.forEach((elm) => {
                            toast.error(elm.msg,settings);
                        })
                    } else {
                        toast.error("Đã xảy ra lỗi, vui lòng thử lại",settings);
                    }
                }
            }}
        >   
            {props => (
                <Form>
                    <FastField type="hidden" name="_csrf" value={props.values._csrf}/>
                    <table>
                        <tbody>
                            <tr>
                                <td>Họ và tên:</td>
                                <td>
                                    <div className="form-group">
                                        <FastField name="full_name" placeholder="Họ và tên" value={props.values.full_name}/>
                                        <ErrorMessage name="full_name" render={msg => <div className="error-message">{msg}</div>} />
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td>Ngày sinh:</td>
                                <td>
                                    <div className="form-group">
                                        <FastField type="date" name="date_of_birth" value={props.values.date_of_birth}/>
                                        <ErrorMessage name="date_of_birth" render={msg => <div className="error-message">{msg}</div>} />
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td>Điện thoại:</td>
                                <td>
                                    <div className="form-group">
                                        <FastField name="phone" placeholder="Số điện thoại" value={props.values.phone}/>
                                        <ErrorMessage name="phone" render={msg => <div className="error-message">{msg}</div>} />
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td>Email:</td>
                                <td>
                                    <div className="form-group">
                                        <FastField name="email" placeholder="email" value={props.values.email} disabled/>
                                        <ErrorMessage name="email" render={msg => <div className="error-message">{msg}</div>} />
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td>Địa chỉ:</td>
                                <td>
                                    <div className="form-group">
                                        <FastField name="address" placeholder="Địa chỉ nhận hàng" value={props.values.address}/>
                                        <ErrorMessage name="address" render={msg => <div className="error-message">{msg}</div>} />
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td>Xác nhận mật khẩu:</td>
                                <td>
                                    <div className="form-group">
                                        <FastField type="password" name="password" placeholder="********" autoComplete="off"/>
                                        <ErrorMessage name="password" render={msg => <div className="error-message">{msg}</div>} />
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <div className="form-group">
                            <button type="submit" className="btn"> Chỉnh sửa </button>
                        </div>
                </Form>
            )}
            
        </Formik>
    ) : ''
}
