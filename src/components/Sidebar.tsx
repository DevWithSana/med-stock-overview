
import { NavLink } from "react-router-dom";
import { cn } from "@/lib/utils";
import { 
  LayoutDashboard, 
  PackageSearch, 
  BarChart3, 
  ShoppingCart, 
  Users, 
  Factory,
  Calendar,
  Settings,
  LogOut
} from "lucide-react";

interface SidebarProps {
  collapsed: boolean;
  mobile?: boolean;
  closeMobileMenu?: () => void;
}

interface NavItemProps {
  icon: React.ElementType;
  label: string;
  to: string;
  collapsed: boolean;
  mobile?: boolean;
  closeMobileMenu?: () => void;
}

const NavItem = ({ icon: Icon, label, to, collapsed, mobile, closeMobileMenu }: NavItemProps) => {
  return (
    <NavLink
      to={to}
      onClick={mobile ? closeMobileMenu : undefined}
      className={({ isActive }) =>
        cn(
          "flex items-center py-3 px-4 rounded-md transition-colors",
          isActive
            ? "bg-sidebar-accent text-sidebar-accent-foreground"
            : "text-sidebar-foreground hover:bg-sidebar-accent/80 hover:text-sidebar-accent-foreground",
          collapsed && !mobile && "justify-center px-2"
        )
      }
    >
      <Icon className={cn("h-5 w-5", !collapsed || mobile ? "mr-3" : "")} />
      {(!collapsed || mobile) && <span>{label}</span>}
    </NavLink>
  );
};

const Sidebar = ({ collapsed, mobile = false, closeMobileMenu }: SidebarProps) => {
  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-center h-16 bg-sidebar-primary p-4">
        <div className="flex items-center justify-center">
          {!collapsed || mobile ? (
            <div className="flex flex-shrink-0 items-center">
              <span className="text-sidebar-primary-foreground text-xl font-bold">PharmaGest</span>
            </div>
          ) : (
            <div className="flex flex-shrink-0 items-center justify-center">
              <span className="text-sidebar-primary-foreground text-xl font-bold">PG</span>
            </div>
          )}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto scrollbar-hide py-5 px-3">
        <div className="space-y-1">
          <NavItem 
            to="/" 
            icon={LayoutDashboard} 
            label="Tableau de Bord" 
            collapsed={collapsed} 
            mobile={mobile}
            closeMobileMenu={closeMobileMenu}
          />
          <NavItem
            to="/stock"
            icon={PackageSearch}
            label="Gestion des Stocks"
            collapsed={collapsed}
            mobile={mobile}
            closeMobileMenu={closeMobileMenu}
          />
          <NavItem
            to="/sales"
            icon={BarChart3}
            label="Ventes"
            collapsed={collapsed}
            mobile={mobile}
            closeMobileMenu={closeMobileMenu}
          />
          <NavItem
            to="/orders"
            icon={ShoppingCart}
            label="Commandes"
            collapsed={collapsed}
            mobile={mobile}
            closeMobileMenu={closeMobileMenu}
          />
          <NavItem
            to="/customers"
            icon={Users}
            label="Clients"
            collapsed={collapsed}
            mobile={mobile}
            closeMobileMenu={closeMobileMenu}
          />
          <NavItem
            to="/suppliers"
            icon={Factory}
            label="Fournisseurs"
            collapsed={collapsed}
            mobile={mobile}
            closeMobileMenu={closeMobileMenu}
          />
        </div>
      </div>

      <div className="border-t border-sidebar-border p-3">
        <div className="space-y-1">
          <NavItem
            to="/calendar"
            icon={Calendar}
            label="Calendrier"
            collapsed={collapsed}
            mobile={mobile}
            closeMobileMenu={closeMobileMenu}
          />
          <NavItem
            to="/settings"
            icon={Settings}
            label="Paramètres"
            collapsed={collapsed}
            mobile={mobile}
            closeMobileMenu={closeMobileMenu}
          />
          <button
            className={cn(
              "flex items-center w-full py-3 px-4 rounded-md transition-colors text-sidebar-foreground hover:bg-sidebar-accent/80 hover:text-sidebar-accent-foreground",
              collapsed && !mobile && "justify-center px-2"
            )}
          >
            <LogOut className={cn("h-5 w-5", !collapsed || mobile ? "mr-3" : "")} />
            {(!collapsed || mobile) && <span>Déconnexion</span>}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
