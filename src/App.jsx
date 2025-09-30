import React from "react";
import { useRoutes } from "react-router-dom";
import Navigation from "./components/Navigation";
import Home from "./pages/Home";


function App() {
  const routes = useRoutes([
    { path: "/", element: <Home /> }
  ]);

  return (
    <div className="app">
      <Navigation />
      {routes}
    </div>
  );
}

export default App;
