import { Outlet } from "react-router-dom";
import SiteFooter from "./SiteFooter";
import SiteHeader from "./SiteHeader";

export default function SiteLayout() {
  return (
    <div className="min-h-screen bg-background font-body text-on-surface selection:bg-primary-container selection:text-on-primary-container">
      <SiteHeader />
      <main className="pt-[6.75rem]">
        <Outlet />
      </main>
      <SiteFooter />
    </div>
  );
}
