// src/App.tsx
import AppRoutes from "@/routers/router";
import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0); // Cuộn đến đầu trang khi route thay đổi
  }, [location]);

  return null;
};
const App = () => {
  return (
    <>
      <ScrollToTop />
      <AppRoutes />
    </>
  );
};

export default App;
