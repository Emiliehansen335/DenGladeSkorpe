import React from "react";
import { useRoutes } from "react-router-dom";
import Navigation from "./components/Navigation";
import Home from "./pages/Home";
import Footer from "./components/footer/Footer";
import Kontakt from "./pages/Kontakt";
import Personalet from "./pages/Personalet";
import DishesDetail from "./pages/DishesDetail";
import { CartProvider } from "./context/CartContext";
import Kurv from "./pages/Kurv";

function App() {
  const routes = useRoutes([
    { path: "/", element: <Home /> },
    { path: "/Kontakt", element: <Kontakt /> },
    { path: "/Personalet", element: <Personalet /> },
    {
      path: "/dishes/:id",
      element: <DishesDetail />,
    },
    { path: "/kurv", element: <Kurv /> },
  ]);

  return (
    <CartProvider>
      <div className="app">
        <Navigation />
        {routes}
        <Footer />
      </div>
    </CartProvider>
  );
}

export default App;
