// import Header from "./components/layout/Header/Header.jsx";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import WebFont from "webfontloader";
import React from "react";
// import Loader from "./components/Loader/Loader.jsx";
// import Footer from "./components/layout/Footer/Footer.jsx";
import LoginSignup from "./component/User/LoginSignup";
import ProductDetails from "./component/Product/ProductDetails";
// import Home from "./component/Home/Home";

import store from "./store"
import { loadUser } from "./actions/userAction";
import { useDispatch, useSelector } from "react-redux";

import Profile from "./component/User/Profile.jsx"
// import ProtectedRoute from "./components/Route/ProtectedRoute";
import Shipping from "./component/Cart/Shipping.jsx"
import ConfirmOrder from "./component/Cart/ConfirmOrder.jsx"
import OrderSuccess from "./component/Cart/OrderSuccess";
import About from "./component/layout/About/About";
import NotFound from "./component/layout/Not Found/NotFound";
import Contact from "./component/layout/Contact/Contact";
import MyOrders from "./component/Order/MyOrder.jsx"
import Home from "./component/Home/Home"
import Products from "./component/Product/Products";
import Dashboard from "./component/admin/Dashboard";
import NewProduct from "./component/admin/NewProduct";
import ProductList from "./component/admin/ProductList";
import ProductReviews from "./component/admin/ProductReview";

const  App=()=> {
  const { isAuthenticated, user } = useSelector((state) => state.user);

  React.useEffect(() => {
    WebFont.load({
      google: {
        families: ["Roboto", "Droid Sans", "Chilanka"],
      },
    });

    // store.dispatch(loadUser());
  },[]);


  return (
    <>
      <Router> 
        
        {/* <Header/> */}
        {/* {isAuthenticated && <UserOptions user={user} />}  */}
        <Routes> 
      
      
       <Route  path="/" element={<Home />} /> 
       <Route  path="/about" element={<About />} /> 
       <Route  path="/notfound" element={<NotFound />} /> 
       <Route  path="/contact" element={<Contact />} /> 
       {/* <Route path='/sad' element={<Loader />} />  */}
       
       <Route path="/login" element={<LoginSignup/>} />
       <Route path="/orders" element={<MyOrders/>} />
      
       <Route path="/account" element={<Profile/>} />

       <Route path="/shipping" element={<Shipping/>} />
       <Route path="/newproduct" element={<NewProduct/>} />
       {/* <Route path="/order/confirm" element={<ConfirmOrder/>} /> */}
       {/* <ProtectedRoute path="/me/update" element={<UpdateProfile/>} /> */}
       {/* <Route  path="/success" element={<OrderSuccess/>} /> */}

       {/* <Route path="/useroption" element={<UserOptions/>} /> */}

       <Route path='/products/:id' element={<ProductDetails/>} /> 
       <Route path="/products" element={<Products/>}/>
       <Route path="/admin/dashboard" element={<Dashboard/>}/>
       <Route path="/productlist" element={<ProductList/>}/>
       <Route path="/productreview" element={<ProductReviews/>}/>
       </Routes>
      </Router> 
    

      
    </>
  );
}

export default App;
