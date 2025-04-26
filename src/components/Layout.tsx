
import { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import { 
  ChevronLeft,
  ChevronRight, 
  Menu
} from "lucide-react";
import { Button } from "@/components/ui/button";

const Layout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
  const toggleMobileMenu = () => setMobileMenuOpen(!mobileMenuOpen);

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar for desktop */}
      <div
        className={`bg-sidebar hidden md:block transition-all duration-300 ${
          sidebarOpen ? "w-64" : "w-20"
        }`}
      >
        <Sidebar collapsed={!sidebarOpen} />
      </div>

      {/* Mobile sidebar */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 md:hidden">
          <div className="fixed inset-0 bg-black/25" onClick={toggleMobileMenu} />
          <div className="fixed inset-y-0 left-0 z-40 w-64 bg-sidebar overflow-y-auto">
            <Sidebar collapsed={false} mobile={true} closeMobileMenu={() => setMobileMenuOpen(false)} />
          </div>
        </div>
      )}

      <div className="flex flex-col flex-1 overflow-hidden">
        {/* Top header */}
        <header className="bg-white shadow-sm z-10">
          <div className="flex h-16 items-center justify-between px-4">
            {/* Mobile menu button */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={toggleMobileMenu}
            >
              <Menu className="h-5 w-5" />
              <span className="sr-only">Open sidebar</span>
            </Button>

            {/* Toggle sidebar button for desktop */}
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleSidebar}
              className="hidden md:flex"
            >
              {sidebarOpen ? (
                <ChevronLeft className="h-5 w-5" />
              ) : (
                <ChevronRight className="h-5 w-5" />
              )}
            </Button>

            <div className="flex-1 px-4 flex justify-between">
              <div className="flex-1 flex">
                <h1 className="text-2xl font-semibold text-gray-800">
                  Pharmacie Dashboard
                </h1>
              </div>
              <div className="ml-4 flex items-center md:ml-6">
                <div className="bg-pharma-primary rounded-full h-8 w-8 flex items-center justify-center text-white">
                  AD
                </div>
              </div>
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto bg-background p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;
