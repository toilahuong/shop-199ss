import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
const CategoryProduct = React.lazy(() => import('./CategoryProduct.js'));
const ShowProduct = React.lazy(() => import('./ShowProduct.js'));
const AllProduct = React.lazy(() => import('./AllProduct.js'));
export default function Product() {
    return (
        <Router basename="/san-pham">
            <Switch>
                <Route path="/:category/:product" component={ShowProduct}/>
                <Route path="/:category/" component={CategoryProduct}/>
                <Route exac path="/" component={AllProduct}/>
            </Switch>
        </Router>
    )
}