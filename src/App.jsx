// Import React and routing components
import React from "react";
import { Routes, Route } from "react-router-dom";

// Import page components
import Home from "./pages/Home";
import CountryDetail from "./pages/CountryDetail";
import Layout from "./components/Layout";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import Favorites from "./pages/Favorites";

const App = () => {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/country/:code" element={<CountryDetail />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Layout>
  );
};

export default App;
