import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import Header from './components/header/Header';
import React, { useEffect } from 'react';
import Footer from './components/footer/Footer';
import Loading from './components/loading/Loading';
import NotFound from './components/notfound/NotFound';
import { useDispatch } from 'react-redux';
import { getUser } from './features/auth/authSlice';
import { isLoggedIn } from './func';
const Home = React.lazy(() => import('./pages/Home.js'));
const Login = React.lazy(() => import('./pages/user/Login'));
const Register = React.lazy(() => import('./pages/user/Register'));
const Profile = React.lazy(() => import('./pages/user/Profile'));

const Product = React.lazy(() => import('./pages/product/Product'));

const Post = React.lazy(() => import('./pages/post/Post.js'));

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    (async () => {
      const action = getUser();
      await dispatch(action);
    })();
  },[dispatch])
  return (
    <Router>
      <Header />
      <React.Suspense fallback={<Loading />}>
        <Switch>
          <Route path="/dang-nhap" render={() => 
            isLoggedIn() ? <Redirect to="/"/> : <Login />
          }/>
          <Route path="/dang-ky" render={() => 
            isLoggedIn() ? <Redirect to="/"/> : <Register />
          }/>
          <Route path="/profile" render={() => 
            isLoggedIn() ? <Profile /> : <Redirect to="/dang-nhap"/>
          }/>
          <Route path="/san-pham" component={Product}/>
          <Route path="/tin-tuc" component={Post}/>
          <Route exact path="/" component={Home}/>
          <Route path="*" component={NotFound}/>
        </Switch>
      </React.Suspense>  
      <Footer />
    </Router>
  );
}
export default App;
