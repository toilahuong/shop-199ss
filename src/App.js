import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Header from './components/header/Header';
import React from 'react';
import Footer from './components/footer/Footer';
import Loading from './components/loading/Loading';
import NotFound from './components/notfound/NotFound';
const Home = React.lazy(() => import('./pages/Home.js'));
const Login = React.lazy(() => import('./pages/user/Login'));
const Register = React.lazy(() => import('./pages/user/Register'));

const CategoryProduct = React.lazy(() => import('./pages/product/CategoryProduct.js'));
const ShowProduct = React.lazy(() => import('./pages/product/ShowProduct.js'));
const AllProduct = React.lazy(() => import('./pages/product/AllProduct.js'));

const CategoryPost = React.lazy(() => import('./pages/post/CategoryPost.js'));
const ShowPost = React.lazy(() => import('./pages/post/ShowPost.js'));

function App() {
  return (
    <Router>
      <Header />
      <React.Suspense fallback={<Loading />}>
        <Switch>
          <Route path="/dang-nhap" component={Login}/>
          <Route path="/dang-ky" component={Register}/>
          <Route path="/san-pham/:category/:product" component={ShowProduct}/>
          <Route path="/san-pham/:category/" component={CategoryProduct}/>
          <Route path="/san-pham" component={AllProduct}/>
          <Route path="/:category_post/:post_slug" component={ShowPost}/>
          <Route path="/:category_post" component={CategoryPost}/>
          <Route exact path="/" component={Home}/>
          <Route path="*" component={NotFound}/>
        </Switch>
      </React.Suspense>  
      <Footer />
    </Router>
  );
}
export default App;
