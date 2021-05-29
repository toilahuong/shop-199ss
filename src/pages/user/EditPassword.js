import axios from "axios";
import { ErrorMessage, FastField, Form, Formik } from "formik";
import { useEffect, useState } from "react"
import { SERVER, SITE_NAME } from "../../config";
import * as Yup from "yup";
import validateMsg from "../../validateMsg";
import { toast } from "react-toastify";
const EditPasswordSchema = Yup.object().shape({
    oldPassword: Yup.string()
        .required(() => validateMsg("Mật khẩu cũ", "required")),
    newPassword: Yup.string()
        .min(6, () => validateMsg("Mật khẩu mới", "min"))
        .max(50, () => validateMsg("Mật khẩu mới", "max"))
        .required(() => validateMsg("Mật khẩu mới", "required")),
    confirmPassword: Yup.string()
        .oneOf([Yup.ref('newPassword'), null], () => validateMsg("Mật khẩu", "matchpass"))
        .required(() => validateMsg("Nhập lại mật khẩu", "required")),
});
export default function EditPassword() {
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
        document.title = `Đổi mật khẩu - ${SITE_NAME}`;
    },[])
    useEffect(() => {
        (async () => {
            try {
                const csrf = await axios.get(`${SERVER}/api/form`, {withCredentials: true})
                let data = {
                    oldPassword: '',
                    newPassword: '',
                    confirmPassword: '',
                    _csrf: csrf.data.csrfToken
                }
                return setInitialValues(data);
            } catch (error) {
                console.log(error);
            }
        })();
    },[]);
    return initialValues ?
    (
        <Formik
            initialValues={{...initialValues}}
            validationSchema={EditPasswordSchema}
            onSubmit={async (values) => {
                try {
                    console.log(values);
                    const res = await axios.put(`${SERVER}/api/user/change-password`, values,{ withCredentials: true });
                    console.log(res);
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
                                <td>Mật khẩu cũ:</td>
                                <td>
                                    <div className="form-group">
                                        <FastField type="password" name="oldPassword" placeholder="*******" autoComplete="off"/>
                                        <ErrorMessage name="oldPassword" render={msg => <div className="error-message">{msg}</div>} />
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td>Mật khẩu mới:</td>
                                <td>
                                    <div className="form-group">
                                    <FastField type="password" name="newPassword" placeholder="*******" autoComplete="off"/>
                                        <ErrorMessage name="newPassword" render={msg => <div className="error-message">{msg}</div>} />
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td>Xác nhận mật khẩu:</td>
                                <td>
                                    <div className="form-group">
                                    <FastField type="password" name="confirmPassword" placeholder="*******" autoComplete="off"/>
                                        <ErrorMessage name="confirmPassword" render={msg => <div className="error-message">{msg}</div>} />
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
