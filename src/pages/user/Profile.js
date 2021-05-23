import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
const ShowProfile = React.lazy(() => import("./ShowProfile"));
export default function Profile() {
    return (
        <Router basename="/profile">
            <div className="sec sec-profile">
                <h1 className="title text-center">
                    Tài khoản
                </h1>
                <Switch>
                    <Route exact path="/" component={ShowProfile}/>
                    <Route exact path="/edit" component={EditProfile}/>
                </Switch>
            </div>
        </Router>
    )
}

function EditProfile() {
    return (
        <>
            edit profile
        </>
    )
}