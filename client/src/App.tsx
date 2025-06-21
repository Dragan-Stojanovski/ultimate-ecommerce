import { Routes, Route, useLocation } from "react-router-dom";
import HomePage from "./presentation/pages/home-page";
import AdminDashboard from "./admin_dashboard";
import NavBar from "./presentation/components/nav-bar/NavBar";
import AdminNavCategoriesPage from "./admin_dashboard/presentation/pages/admin-nav-categories-page";
import AdminProductsPage from "./admin_dashboard/presentation/pages/admin-products-page";
import AdminCustomersPage from "./admin_dashboard/presentation/pages/admin-customers-page";
import AdminOrdersPage from "./admin_dashboard/presentation/pages/admin-orders-page";
import AdminPromotionsPage from "./admin_dashboard/presentation/pages/admin-promotions-page";
import AdminAnalyticsPage from "./admin_dashboard/presentation/pages/admin-analytics-page";
import ProductDetailsPage from "./admin_dashboard/presentation/pages/product-details-page";
import RegisterPage from "./presentation/pages/register-page";
import LoginPage from "./presentation/pages/login-page";
import { fetchUserDirectly } from "./domain/store/actions/getUserOwn";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

const App = () => {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith("/admin");

  	const dispatch = useDispatch();

	useEffect(() => {
		fetchUserDirectly(dispatch);
	}, [dispatch]);
  
  return (
    <>
      {isAdminRoute ? null : <NavBar />}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />}>
          <Route path="nav-categories" element={<AdminNavCategoriesPage />} />
          <Route path="products" element={<AdminProductsPage />} />
          <Route path="products/:id" element={<ProductDetailsPage />} />
          <Route path="customers" element={<AdminCustomersPage />} />
          <Route path="orders" element={<AdminOrdersPage />} />
          <Route path="promotions" element={<AdminPromotionsPage />} />
          <Route path="analytics" element={<AdminAnalyticsPage />} />
        </Route>
      </Routes>
    </>
  );
};

export default App;
