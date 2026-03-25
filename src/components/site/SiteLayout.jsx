import { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import SiteFooter from "./SiteFooter";
import SiteHeader from "./SiteHeader";

function ScrollToTopOnRouteChange() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [pathname]);

  return null;
}

export default function SiteLayout() {
  return (
    <div className="min-h-screen bg-background font-body text-on-surface selection:bg-primary-container selection:text-on-primary-container">
      <ScrollToTopOnRouteChange />
      <SiteHeader />
      <main className="pt-[13rem] xl:pt-[6.75rem]">
        <Outlet />
      </main>
      <SiteFooter />
    </div>
  );
}
