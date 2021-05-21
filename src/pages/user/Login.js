import { ErrorMessage, FastField, Form, Formik } from "formik";
import { Container } from "react-bootstrap";
import * as Yup from "yup";
import validateMsg from "../../validateMsg";
const LoginSchema = Yup.object().shape({
    username: Yup.string()
      .min(3, (Obj) => validateMsg(Obj.path, "min"))
      .max(50, (Obj) => validateMsg(Obj.path, "max"))
      .required((Obj) => validateMsg(Obj.path, "required")),
    password: Yup.string()
      .min(6, (Obj) => validateMsg(Obj.path, "min"))
      .max(50, (Obj) => validateMsg(Obj.path, "max"))
      .required((Obj) => validateMsg(Obj.path, "required")),
});
export default function Login() {
    return (
        <Container>
            <div className="sec-guest">
                <h1> Đăng Nhập </h1>
                <div className="social-login">

                </div>
                <Formik
                    initialValues={{
                        username: '',
                        password: '',
                    }}
                    validationSchema={LoginSchema}
                    onSubmit={async (values) => {
                        await new Promise((r) => setTimeout(r, 500));
                        alert(JSON.stringify(values, null, 2));
                    }}
                >
                    <Form>
                        <div className="form-group">
                            <FastField name="username" placeholder="Tên đăng nhập hoặc email"/>
                            <ErrorMessage name="username" render={msg => <div className="error-message">{msg}</div>} />
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