import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "../components/Header";
import Home from "../pages/Home";
// import TemplateSkeleton from "../pages/TemplateSkeleton";

const AppRoutes: React.FC = () => {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        {/* <Route path="/templateSkeleton" element={<TemplateSkeleton />} /> */}
      </Routes>
    </Router>
  );
};

export default AppRoutes;
