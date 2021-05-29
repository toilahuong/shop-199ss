import axios from "axios";
import { ErrorMessage, FastField, Form, Formik } from "formik";
import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { toast } from "react-toastify";
import * as Yup from "yup";
import { SERVER, SITE_NAME } from "../../config";
import validateMsg from "../../validateMsg";
const RegisterSchema = Yup.object().shape({
    email: Yup.string()
        .email(() => validateMsg("Email", "email"))
        .required(() => validateMsg("Email", "required")),
    full_name: Yup.string()
        .required(() => validateMsg("Họ và tên", "required")),
    phone: Yup.string()
        .required(() => validateMsg("Số điện thoại", "required"))
        .matches(/([+84|84|0]+(3|5|7|8|9|1[2|6|8|9]))+([0-9]{8})\b/g, () => validateMsg("Số điện thoại", "matchphone")),
    password: Yup.string()
        .min(6, () => validateMsg("Mật khẩu", "min"))
        .max(50, () => validateMsg("Mật khẩu", "max"))
        .required(() => validateMsg("Mật khẩu", "required")),
    confirm_password: Yup.string()
        .oneOf([Yup.ref('password'), null], () => validateMsg("Mật khẩu", "matchpass"))
        .required(() => validateMsg("Nhập lại mật khẩu", "required")),
});
export default function Register() {
    const [initialValues, setInitialValues] = useState();
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
        document.title = `Đăng ký - ${SITE_NAME}`;
    }, [])
    useEffect(() => {
        (async () => {
            try {
                const csrf = await axios.get(`${SERVER}/api/form`, { withCredentials: true })
                let data = {
                    email: '',
                    full_name: '',
                    phone: '',
                    password: '',
                    confirm_password: '',
                    _csrf: csrf.data.csrfToken
                }
                return setInitialValues(data);
            } catch (error) {
                console.log(error);
            }
        })();
    }, []);
    return initialValues ?
        (
            <Container>
                <div className="sec-guest hide-loading">
                    <h1> Đăng Ký </h1>
                    <div className="social-login">

                    </div>

                    <Formik
                        initialValues={initialValues}
                        validationSchema={RegisterSchema}
                        onSubmit={async (values) => {
                            try {
                                await axios.post(`${SERVER}/api/user/register`, values,{ withCredentials: true });
                                toast.success("Đăng ký thành công",settings);
                                setTimeout(() => {
                                    window.location = '/dang-nhap';
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
                        {
                            props => (
                                <Form>
                                    <FastField type="hidden" name="_csrf" value={props.values._csrf}/>
                                    <div className="form-group">
                                        <FastField type="email" name="email" placeholder="Email" autoComplete="off"/>
                                        <ErrorMessage name="email" render={msg => <div className="error-message">{msg}</div>} />
                                    </div>
                                    <div className="form-group">
                                        <FastField name="full_name" placeholder="Họ và tên" autoComplete="off"/>
                                        <ErrorMessage name="full_name" render={msg => <div className="error-message">{msg}</div>} />
                                    </div>
                                    <div className="form-group">
                                        <FastField name="phone" placeholder="Số điện thoại" autoComplete="off"/>
                                        <ErrorMessage name="phone" render={msg => <div className="error-message">{msg}</div>} />
                                    </div>

                                    <div className="form-group">
                                        <FastField type="password" name="password" placeholder="********" autoComplete="off" />
                                        <ErrorMessage name="password" render={msg => <div className="error-message">{msg}</div>} />
                                    </div>
                                    <div className="form-group">
                                        <FastField type="password" name="confirm_password" placeholder="********" autoComplete="off" />
                                        <ErrorMessage name="confirm_password" render={msg => <div className="error-message">{msg}</div>} />
                                    </div>
                                    <div className="form-group">
                                        <button type="submit" className="btn"> Đăng Ký </button>
                                    </div>
                                </Form>
                            )
                        }

                    </Formik>
                    <p className="mt-3 mb-2">Bằng cách đăng ký, bạn xác nhận rằng bạn chấp nhận</p>
                    <p><a href="/cac-dieu-khoan">Các điều khoản</a> và <a href="/chinh-sach-bao-mat">Chính sách bảo mật</a></p>
                </div>
            </Container>
        ) : ''
}