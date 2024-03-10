import { Outlet } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import Navbar from "@/components/ui/navbar";

export default function Layout() {
  return (
    <div>
      <Navbar />
      <Outlet />
      <Toaster />
    </div>
  );
}
