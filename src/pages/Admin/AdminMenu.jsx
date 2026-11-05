import { NavLink, Link } from "react-router-dom";
import {
  FiBarChart2,
  FiPackage,
  FiPlusCircle,
  FiGrid,
  FiShoppingBag,
  FiUsers,
  FiArrowLeft,
  FiSliders,
} from "react-icons/fi";
import { HiSparkles } from "react-icons/hi2";

const AdminMenu = () => {
  const navItems = [
    { to: "/admin/dashboard", label: "Dashboard", icon: FiBarChart2 },
    { to: "/admin/allproductslist", label: "Products", icon: FiPackage },
    { to: "/admin/productlist", label: "Add Product", icon: FiPlusCircle },
    { to: "/admin/categorylist", label: "Categories", icon: FiGrid },
    { to: "/admin/orderlist", label: "Orders", icon: FiShoppingBag },
    { to: "/admin/userlist", label: "Users", icon: FiUsers },
  ];

  return (
    <div className="w-full bg-white/95 backdrop-blur-md border-b border-pink-100 shadow-xs mb-8 sticky top-16 z-30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
          {/* Admin Panel Brand Badge */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-pink-500 to-rose-400 flex items-center justify-center text-white font-black text-sm shadow-sm shadow-pink-200">
                <FiSliders size={16} />
              </div>
              <div>
                <span className="text-xs font-black tracking-wider text-pink-600 uppercase flex items-center gap-1">
                  <HiSparkles size={11} className="text-pink-500" />
                  Admin Console
                </span>
                <span className="text-sm font-extrabold text-gray-900 leading-none block">
                  Ruku Store Management
                </span>
              </div>
            </div>

            {/* Back to Store link on mobile */}
            <Link
              to="/"
              className="md:hidden inline-flex items-center gap-1 text-[11px] font-bold text-gray-500 hover:text-pink-600 bg-pink-50/60 px-2.5 py-1 rounded-full border border-pink-100"
            >
              <FiArrowLeft size={12} />
              <span>Store</span>
            </Link>
          </div>

          {/* Admin Navigation Pills */}
          <nav className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0 soft-pink-scrollbar">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.to}
                  to={item.to}
                  className={({ isActive }) =>
                    `inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-all duration-200 cursor-pointer ${
                      isActive
                        ? "bg-gradient-to-r from-pink-500 to-rose-400 text-white shadow-sm shadow-pink-200"
                        : "bg-pink-50/50 hover:bg-pink-100/70 text-gray-700 hover:text-pink-600 border border-pink-100/80"
                    }`
                  }
                >
                  <Icon size={14} />
                  <span>{item.label}</span>
                </NavLink>
              );
            })}

            {/* Back to storefront link (desktop) */}
            <Link
              to="/"
              className="hidden md:inline-flex items-center gap-1.5 px-3 py-2 rounded-full text-xs font-bold text-gray-500 hover:text-pink-600 bg-white hover:bg-pink-50 border border-pink-200 transition-all ml-2 cursor-pointer"
              title="Return to customer storefront"
            >
              <FiArrowLeft size={13} />
              <span>Storefront</span>
            </Link>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default AdminMenu;
