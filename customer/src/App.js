import { Route, Routes } from "react-router-dom";
import Home from "./pages/home/Home";
import LoginPage from "./pages/login/LoginPage";
import About from "./pages/about/About";
import Shop from "./pages/shop/Shop";
import Blog from "./pages/blog/Blog";
import Details from "./pages/details/Details";
import Checkout from "./pages/checkout/Checkout";
import RegisterPage from "./pages/register/RegisterPage";
import History from "./pages/history/History";
import Profile from "./pages/profile/Profile";
import ResetPassword from "./pages/ResetPassword";
import ForgotPassword from "./pages/ForgotPassword";
import ChangeInfo from "./pages/ChangeInfo";

function App() {
  return (
    <Routes>
      <Route exact path="/" element={<Home />} />
      <Route exact path="/about" element={<About />} />
      <Route exact path="/product" element={<Shop />} />
      <Route exact path="/history" element={<History />} />
      <Route exact path="/blog" element={<Blog />} />
      <Route exact path="/login" element={<LoginPage />} />
      <Route path="/product/:productId" element={<Details />} />
      <Route exact path="/checkout" element={<Checkout />} />
      <Route exact path="/register" element={<RegisterPage />} />
      <Route exact path="/profile" element={<Profile />} />
      <Route exact path="/reset-password" element={<ResetPassword />} />
      <Route exact path="/forgot-password" element={<ForgotPassword />} />
      <Route exact path="/change-info" element={<ChangeInfo />} />
    </Routes>
  );
}

export default App;
