import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
const CategoryPost = React.lazy(() => import('./CategoryPost.js'));
const ShowPost = React.lazy(() => import('./ShowPost.js'));
const AllPost = React.lazy(() => import('./AllPost.js'));
export default function Post() {
    return (
        <Router basename="/tin-tuc">
            <Switch>
                <Route path="/:category_post/:post_slug" component={ShowPost}/>
                <Route path="/:category_post" component={CategoryPost}/>
                <Route exact path="/" component={AllPost}/>
            </Switch>
        </Router>
    )
}