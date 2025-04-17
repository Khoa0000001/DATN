// src/App.tsx
import AppRoutes from "@/routes/routes";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  return (
    <>
      <AppRoutes />
      <ToastContainer
        stacked
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        closeOnClick
        pauseOnFocusLoss
        draggable
        pauseOnHover
        limit={10}
        style={{ zIndex: 9999 }}
      />
    </>
  );
};

export default App;
