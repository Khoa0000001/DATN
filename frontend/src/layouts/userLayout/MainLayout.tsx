import { ReactNode } from "react";
import Header from "../components/HeaderUser";
import Footer from "../components/FooterUser";
export default function MainLayout({ children }: { children: ReactNode }) {
  return (
    <div className="relative bg-[var(--color-body-bg)]">
      <Header />
      <div className="pb-[18px]">{children}</div>
      <Footer />
    </div>
  );
}
