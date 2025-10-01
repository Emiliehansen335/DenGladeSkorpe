import React from "react";
import { useRoutes } from "react-router-dom";
import Navigation from "./components/Navigation";
import Home from "./pages/Home";
import Footer from "./components/footer/Footer";
import Kontakt from "./pages/Kontakt";
import Personalet from "./pages/Personalet";


function App() {
  const routes = useRoutes([
    { path: "/", element: <Home /> },
     { path: "/Kontakt", element: <Kontakt /> },
     { path: "/Personalet", element: <Personalet /> },
  ]);

  return (
    <div className="app">
      <Navigation />
      {routes}
      <Footer/>
    </div>
  );
}

export default App;
