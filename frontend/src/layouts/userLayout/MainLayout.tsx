import { Outlet } from "react-router-dom";
import Header from "../components/HeaderUser";
import Footer from "../components/FooterUser";
import ChatbotWidget from "@/components/ChatbotWidget";

export default function MainLayout() {
  return (
    <div className="relative bg-[var(--color-body-bg)]">
      <Header />
      <div className="pb-[18px]">
        <Outlet /> {/* Hiển thị trang con */}
      </div>
      <Footer />
      <ChatbotWidget />
    </div>
  );
}
