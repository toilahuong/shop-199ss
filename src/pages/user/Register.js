import Axios from "axios";
import { ErrorMessage, FastField, Form, Formik } from "formik";
import { Container } from "react-bootstrap";
import { toast } from "react-toastify";
import * as Yup from "yup";
import { SERVER } from "../../config";
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
    return (
        <Container>
            <div className="sec-guest">
                <h1> Đăng Ký </h1>
                <div className="social-login">

                </div>

                <Formik
                    initialValues={{
                        email: '',
                        full_name: '',
                        phone: '',
                        password: '',
                        confirm_password: '',
                    }}
                    validationSchema={RegisterSchema}
                    onSubmit={async (values) => {
                        try {
                            await Axios.post(`${SERVER}/api/user/register`, values);
                            toast.success("Đăng ký tài khoản thành công",{
                                position: "top-center",
                                autoClose: 2000,
                                hideProgressBar: false,
                                closeOnClick: true,
                                pauseOnHover: true,
                                draggable: true,
                                progress: undefined,
                            });
                            setTimeout(() => {
                                window.location = "/dang-nhap"; 
                            },2000);
                        } catch (error) {
                            if(error.response) {
                                error.response.data.errors.forEach((elm) => {
                                    toast.warn(elm.msg,{
                                        position: "top-center",
                                        autoClose: 3000,
                                        hideProgressBar: false,
                                        closeOnClick: true,
                                        pauseOnHover: true,
                                        draggable: true,
                                        progress: undefined,
                                    });
                                })
                            }
                        }
                    }}
                >
                    <Form>
                        <div className="form-group">
                            <FastField type="email" name="email" placeholder="Email"/>
                            <ErrorMessage name="email" render={msg => <div className="error-message">{msg}</div>} />
                        </div>
                        <div className="form-group">
                            <FastField name="full_name" placeholder="Họ và tên"/>
                            <ErrorMessage name="full_name" render={msg => <div className="error-message">{msg}</div>} />
                        </div>
                        <div className="form-group">
                            <FastField name="phone" placeholder="Số điện thoại"/>
                            <ErrorMessage name="phone" render={msg => <div className="error-message">{msg}</div>} />
                        </div>
                       
                        <div className="form-group">
                            <FastField type="password" name="password" placeholder="********" autoComplete="on"/>
                            <ErrorMessage name="password" render={msg => <div className="error-message">{msg}</div>} />
                        </div>
                        <div className="form-group">
                            <FastField type="password" name="confirm_password" placeholder="********" autoComplete="on"/>
                            <ErrorMessage name="confirm_password" render={msg => <div className="error-message">{msg}</div>} />
                        </div>
                        <div className="form-group">
                            <button type="submit" className="btn"> Đăng Ký </button>
                        </div>
                    </Form>
                </Formik>
                <p className="mt-3 mb-2">Bằng cách đăng ký, bạn xác nhận rằng bạn chấp nhận</p>
                <p><a href="/cac-dieu-khoan">Các điều khoản</a> và <a href="/chinh-sach-bao-mat">Chính sách bảo mật</a></p>
            </div>
        </Container>
    )
}