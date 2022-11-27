import React, { Suspense, useEffect } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/homePage";
import ShopPage from "./pages/shopPage";
import CartPage from "./pages/cartPage";
import AboutusPage from "./pages/aboutusPage";
import ContactusPage from "./pages/contactusPage";
import NavBar from "./components/navBar";
import NavBarSmall from "./components/navBarSmall";
import { CartCounterProvider } from "./components/cartCounter";
import { AuthProvider } from "./components/auth";
import CartDetails from "./components/CartDetails";
import BottomNav from "./components/BottomNav";
import { db } from "./firebase-config";
import { resetCount } from "./manager";
const loading = (
  <div
    className="w-100 d-flex justify-content-center align-items-center"
    style={{ height: "100vh" }}
  >
    <h1 className="">loading....</h1>
  </div>
);

export default function App(props) {
  useEffect(() => {
    async function resetCountingPages() {
      let today = new Date().toLocaleString("en-US", {
        timeZone: "Africa/Kampala",
      });
      const todayDate = new Date(today);
      await db
        .collection("projectStatus")
        .doc("hijabGallery")
        .get()
        .then((status) => {
          const countingDate = new Date(status.data().countingDay);
          if (todayDate.getDate() > countingDate.getDate()) {
            resetCount();
          }
        });
    }
    resetCountingPages();
  }, []);

  return (
    <AuthProvider>
      <CartCounterProvider>
        <BrowserRouter>
          <NavBar />
          <NavBarSmall />
          <Suspense fallback={loading}>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/shop" element={<ShopPage />} />
              <Route path="/cart" element={<CartPage />} />
              <Route path="/about_us" element={<AboutusPage />} />
              <Route path="/contact_us" element={<ContactusPage />} />
              <Route path="/cart_details" element={<CartDetails />} />
            </Routes>
          </Suspense>
          <BottomNav />
        </BrowserRouter>
      </CartCounterProvider>
    </AuthProvider>
  );
}
