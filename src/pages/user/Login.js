import Axios from "axios";
import { ErrorMessage, FastField, Form, Formik } from "formik";
import { Container } from "react-bootstrap";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import * as Yup from "yup";
import { SERVER } from "../../config";
import validateMsg from "../../validateMsg";
const LoginSchema = Yup.object().shape({
    email: Yup.string()
      .min(3, () => validateMsg("Email", "min"))
      .max(50, () => validateMsg("Email", "max"))
      .required(() => validateMsg("Email", "required")),
    password: Yup.string()
      .min(6, () => validateMsg("Mật khẩu", "min"))
      .max(50, () => validateMsg("Mật khẩu", "max"))
      .required(() => validateMsg("Mật khẩu", "required")),
});
export default function Login() {
    const auth = useSelector((state) => state.auth);
    console.log(auth);
    return (
        <Container>
            <div className="sec-guest">
                <h1> Đăng Nhập </h1>
                <div className="social-login">

                </div>
                <Formik
                    initialValues={{
                        email: '',
                        password: '',
                    }}
                    validationSchema={LoginSchema}
                    onSubmit={async (values) => {
                        try {
                            const res = await Axios.post(`${SERVER}/api/user/login`, values,{ withCredentials: true });
                            toast.success("Đăng nhập thành công",{
                                position: "top-center",
                                autoClose: 2000,
                                hideProgressBar: false,
                                closeOnClick: true,
                                pauseOnHover: true,
                                draggable: true,
                                progress: undefined,
                            });
                            localStorage.setItem("auth", res.data.token);
                            console.log(res);
                            
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
                            <FastField type="email" name="email" placeholder="Tên đăng nhập hoặc email"/>
                            <ErrorMessage name="email" render={msg => <div className="error-message">{msg}</div>} />
                        </div>
                        <div className="form-group">
                            <FastField type="password" name="password" placeholder="********" autoComplete="on"/>
                            <ErrorMessage name="password" render={msg => <div className="error-message">{msg}</div>} />
                        </div>
                        <div className="form-group">
                            <button type="submit" className="btn"> Đăng nhập </button>
                        </div>
                    </Form>
                </Formik>
                <div className="forget-pass">
                    <a href="/quen-mat-khau">Quên mật khẩu?</a>
                </div>
                <div className="signup-now">
                    Bạn chưa có tài khoản? <a href="/dang-ky">Đăng ký ngay!</a>
                </div>
            </div>
        </Container>
    )
}