import { ErrorMessage, FastField, Form, Formik } from "formik";
import { Container } from "react-bootstrap";
import * as Yup from "yup";
import validateMsg from "../../validateMsg";
const RegisterSchema = Yup.object().shape({
    username: Yup.string()
        .min(3, (Obj) => validateMsg(Obj.path, "min"))
        .max(50, (Obj) => validateMsg(Obj.path, "max"))
        .required((Obj) => validateMsg(Obj.path, "required")),
    fullname: Yup.string()
        .required((Obj) => validateMsg(Obj.path, "required")),
    phone: Yup.string()
        .required((Obj) => validateMsg(Obj.path, "required")),
    email: Yup.string()
        .email((Obj) => validateMsg(Obj.path, "email"))
        .required((Obj) => validateMsg(Obj.path, "required")),
    password: Yup.string()
        .min(6, (Obj) => validateMsg(Obj.path, "min"))
        .max(50, (Obj) => validateMsg(Obj.path, "max"))
        .required((Obj) => validateMsg(Obj.path, "required")),
    passwordConfirmation: Yup.string()
        .oneOf([Yup.ref('password'), null], (Obj) => validateMsg(Obj.path, "matchpass"))
        .required((Obj) => validateMsg(Obj.path, "required")),
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
                        username: '',
                        fullname: '',
                        phone: '',
                        email: '',
                        password: '',
                        passwordConfirmation: '',
                    }}
                    validationSchema={RegisterSchema}
                    onSubmit={async (values) => {
                        await new Promise((r) => setTimeout(r, 500));
                        alert(JSON.stringify(values, null, 2));
                    }}
                >
                    <Form>
                        <div className="form-group">
                            <FastField name="username" placeholder="Tên đăng nhập"/>
                            <ErrorMessage name="username" render={msg => <div className="error-message">{msg}</div>} />
                        </div>
                        <div className="form-group">
                            <FastField name="fullname" placeholder="Họ và tên"/>
                            <ErrorMessage name="fullname" render={msg => <div className="error-message">{msg}</div>} />
                        </div>
                        <div className="form-group">
                            <FastField name="phone" placeholder="Số điện thoại"/>
                            <ErrorMessage name="phone" render={msg => <div className="error-message">{msg}</div>} />
                        </div>
                        <div className="form-group">
                            <FastField type="email" name="email" placeholder="Email"/>
                            <ErrorMessage name="email" render={msg => <div className="error-message">{msg}</div>} />
                        </div>
                        <div className="form-group">
                            <FastField type="password" name="password" placeholder="********" autoComplete="on"/>
                            <ErrorMessage name="password" render={msg => <div className="error-message">{msg}</div>} />
                        </div>
                        <div className="form-group">
                            <FastField type="password" name="passwordConfirmation" placeholder="********" autoComplete="on"/>
                            <ErrorMessage name="passwordConfirmation" render={msg => <div className="error-message">{msg}</div>} />
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