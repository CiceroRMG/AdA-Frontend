import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { Outlet } from "react-router-dom";

export function DefaultLayout() {
    return (
      <div className="flex flex-col h-screen">
        <Header />
        <div className="max-w-[90rem] w-full mx-auto px-2 pt-32 pb-5">
          <Outlet />
        </div>
        <Footer />
      </div>
    )
  }