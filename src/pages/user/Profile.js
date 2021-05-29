import React, { useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import { BrowserRouter as Router, Link, Route, Switch } from "react-router-dom";
const ShowProfile = React.lazy(() => import("./ShowProfile"));
const EditProfile = React.lazy(() => import("./EditProfile"));
const EditPassword = React.lazy(() => import("./EditPassword"));
const Logout = React.lazy(() => import("./Logout"));
export default function Profile() {
    const Auth = useSelector((state) => state.auth);
    useEffect(() => {
        document.title = Auth.current.full_name;
    },[Auth])
    return (
        <Router basename="/profile">
            <div className="sec sec-profile hide-loading">
                <h1 className="title text-center">
                    Tài khoản
                </h1>
                <Container>
                    <Row>
                        <Col md={{span: 9, order: 2}}>
                            <div className="profile__main">
                                <Switch>
                                    <Route exact path="/" component={ShowProfile}/>
                                    <Route exact path="/edit" component={EditProfile}/>
                                    <Route exact path="/change-password" component={EditPassword}/>
                                    <Route exact path="/logout" component={Logout}/>
                                </Switch>
                            </div>
                        </Col>
                        <Col md={{span: 3, order: 1}}>
                            <div className="profile__sidebar">
                                <ul>
                                    <li>
                                        <Link to="/">Thông tin cá nhân</Link>
                                    </li>
                                    <li>
                                        <Link to="/edit">Sửa thông tin</Link>
                                    </li>
                                    <li>
                                        <Link to="/change-password">Đổi mật khẩu</Link>
                                    </li>
                                    <li>
                                        <Link to="/cart">Đơn hàng</Link>
                                    </li>
                                    <li>
                                        <Link to="/logout">Đăng xuất</Link>
                                    </li>
                                </ul>
                            </div>
                        </Col>
                        
                    </Row>
                </Container>
                
            </div>
        </Router>
    )
}
