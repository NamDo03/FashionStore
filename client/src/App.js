import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Navbar from "./components/Navbar/Navbar";
import { Footer } from "./components/Footer";
import Collections from "./pages/Collections";
import SingleProduct from "./pages/SingleProduct";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Success from "./components/Checkout/Success";
import { useSelector } from "react-redux";
import ScrollToTop from "./ScrollToTop";
import PageNotFound from "./components/PageNotFound";
import ListProducts from "./pages/Admin/ListProducts";
import ListUsers from "./pages/Admin/ListUsers";
import AddProduct from "./pages/Admin/AddProduct";
import AddUser from "./pages/Admin/AddUser";
import UpdateProduct from "./pages/Admin/UpdateProduct";
import UpdateUser from "./pages/Admin/UpdateUser";
import { useEffect, useState } from "react";
import Loader from "./components/Loader";
import Dashboard from "./pages/Admin/Dashboard";
import AboutUs from "./pages/AboutUs";

function App() {
  const user = useSelector((state) => state.user.currentUser);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);

  const RedirectIfLoggedIn = ({ children }) => {
    if (user) {
      return <Navigate to="/" replace />;
    } else {
      return children;
    }
  };

  const Layout = ({ children }) => {
    return (
      <>
        <Navbar />
        {children}
        <Footer />
      </>
    );
  };

  const AdminRoutes = user && user.isAdmin ? (
    <>
      <Route path="/admin/dashboard" element={<Dashboard />} />
      <Route path="/admin/products" element={<ListProducts />} />
      <Route path="/admin/users" element={<ListUsers />} />
      <Route path="/admin/addproduct" element={<AddProduct />} />
      <Route path="/admin/adduser" element={<AddUser />} />
      <Route path="/admin/editproduct/:id" element={<UpdateProduct />} />
      <Route path="/admin/edituser/:id" element={<UpdateUser />} />
    </>
  ) : null;

  return (
    <div>
      {isLoading ? (
        <div className="bg-black w-full h-full absolute top-0 left-0 flex justify-center items-center">
          <Loader />
        </div>
      ) : (
        <Router>
          <ScrollToTop>
            <Routes>
              <Route path="/" element={<Layout><Home /></Layout>} />
              <Route path="/aboutus" element={<Layout><AboutUs /></Layout>} />
              <Route path="/collections" element={<Layout><Collections /></Layout>} />
              <Route path="/product/:id" element={<Layout><SingleProduct /></Layout>} />
              <Route path="/checkout-success" element={<Layout><Success /></Layout>} />
              <Route
                path="/login"
                element={<RedirectIfLoggedIn><Login /></RedirectIfLoggedIn>}
              />
              <Route
                path="/signup"
                element={<RedirectIfLoggedIn><Signup /></RedirectIfLoggedIn>}
              />
              <Route path="*" element={<Layout><PageNotFound /></Layout>} />
              {AdminRoutes}
            </Routes>
          </ScrollToTop>
        </Router>
      )}

    </div>
  );
}

export default App;
