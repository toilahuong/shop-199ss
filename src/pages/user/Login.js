import axios from "axios";
import { ErrorMessage, FastField, Form, Formik } from "formik";
import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { toast } from "react-toastify";
import * as Yup from "yup";
import { SERVER, SITE_NAME } from "../../config";
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
        document.title = `Đăng nhập - ${SITE_NAME}`;
    },[])
    useEffect(() => {
        (async () => {
            try {
                const csrf = await axios.get(`${SERVER}/api/form`, {withCredentials: true})
                let data = {
                    email: '',
                    password: '', 
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
        <Container>
            <div className="sec-guest hide-loading">
                <h1> Đăng Nhập </h1>
                <div className="social-login">

                </div>
                <Formik
                    initialValues={initialValues}
                    validationSchema={LoginSchema}
                    onSubmit={async (values) => {
                        try {
                            await axios.post(`${SERVER}/api/user/login`, values,{ withCredentials: true });
                            toast.success("Đăng nhập thành công",settings);
                            setTimeout(() => {
                                window.location = '/profile';
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
                                    <FastField type="email" name="email" placeholder="Tên đăng nhập hoặc email"/>
                                    <ErrorMessage name="email" render={msg => <div className="error-message">{msg}</div>} />
                                </div>
                                <div className="form-group">
                                    <FastField type="password" name="password" placeholder="********" autoComplete="off"/>
                                    <ErrorMessage name="password" render={msg => <div className="error-message">{msg}</div>} />
                                </div>
                                <div className="form-group">
                                    <button type="submit" className="btn"> Đăng nhập </button>
                                </div>
                            </Form>
                        )
                    }
                    
                </Formik>
                <div className="forget-pass">
                    <a href="/quen-mat-khau">Quên mật khẩu?</a>
                </div>
                <div className="signup-now">
                    Bạn chưa có tài khoản? <a href="/dang-ky">Đăng ký ngay!</a>
                </div>
            </div>
        </Container>
    ) : ''
}