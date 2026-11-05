import { useState, useEffect, useRef } from "react";
import { Link, NavLink, useNavigate, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  AiOutlineSearch,
  AiOutlineClose,
  AiOutlineMenu,
  AiOutlineDashboard,
  AiOutlineUser,
  AiOutlineOrderedList,
  AiOutlineLogout,
} from "react-icons/ai";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { HiOutlineShoppingBag } from "react-icons/hi2";
import { FiChevronDown, FiPackage, FiGrid, FiUsers, FiTag } from "react-icons/fi";
import { useLogoutMutation } from "../../redux/api/userApiSlice";
import { logout } from "../../redux/features/auth/authSlice";
import "./Navigation.css";

const Navigation = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const { cartItems } = useSelector((state) => state.cart);
  const favorites = useSelector((state) => state.favorites) || [];

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [isScrolled, setIsScrolled] = useState(false);

  const dropdownRef = useRef(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const [logoutApiCall] = useLogoutMutation();

  const cartCount = cartItems?.reduce((acc, item) => acc + item.qty, 0) || 0;
  const favoritesCount = favorites?.length || 0;

  // Track scroll state for enhanced glassmorphism header styling
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setDropdownOpen(false);
  }, [location.pathname]);

  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      navigate("/login");
      setDropdownOpen(false);
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchKeyword.trim()) {
      navigate(`/shop?keyword=${encodeURIComponent(searchKeyword.trim())}`);
      setSearchKeyword("");
      setMobileMenuOpen(false);
    } else {
      navigate("/shop");
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full transition-all duration-300">
      {/* Top Announcement Bar */}
      <div className="bg-gradient-to-r from-pink-50 via-rose-100/70 to-pink-50 border-b border-pink-200/50 py-1.5 px-4 text-xs font-medium text-pink-900 flex justify-between items-center transition-all">
        <div className="container mx-auto flex justify-between items-center px-2">
          <p className="flex items-center gap-2 mx-auto sm:mx-0">
            <span className="inline-block w-2 h-2 rounded-full bg-pink-500 animate-pulse"></span>
            <span>Welcome to <strong>Ruku Store</strong> • Free express shipping on orders over $50</span>
          </p>
          <div className="hidden sm:flex items-center gap-4 text-pink-800 text-xs">
            <Link to="/shop" className="hover:text-pink-600 transition-colors">
              New Arrivals
            </Link>
            <span className="text-pink-300">|</span>
            <span className="text-pink-700">30-Day Easy Returns</span>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <nav
        className={`w-full bg-white/95 backdrop-blur-md transition-shadow duration-300 border-b ${
          isScrolled
            ? "border-pink-200/70 shadow-md shadow-pink-100/50 py-2.5"
            : "border-pink-100 py-3.5"
        }`}
      >
        <div className="container mx-auto px-4 lg:px-8 flex items-center justify-between gap-4">
          
          {/* Brand Logo */}
          <Link
            to="/"
            className="flex items-center gap-2 group transition-transform duration-200 hover:scale-105"
          >
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-pink-500 to-rose-400 flex items-center justify-center text-white font-extrabold text-lg shadow-sm shadow-pink-200 group-hover:shadow-pink-300 transition-all">
              R
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-extrabold tracking-tight text-gray-900 group-hover:text-pink-600 transition-colors leading-none">
                RUKU<span className="text-pink-500">.</span>
              </span>
              <span className="text-[10px] tracking-widest uppercase font-semibold text-pink-400">
                Store
              </span>
            </div>
          </Link>

          {/* Center Navigation Links (Desktop) */}
          <div className="hidden md:flex items-center space-x-1 lg:space-x-2">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `px-3 py-1.5 rounded-full text-sm font-semibold transition-all duration-200 ${
                  isActive
                    ? "bg-pink-50 text-pink-600 shadow-sm shadow-pink-100/50"
                    : "text-gray-600 hover:text-pink-600 hover:bg-pink-50/50"
                }`
              }
            >
              Home
            </NavLink>

            <NavLink
              to="/shop"
              className={({ isActive }) =>
                `px-3 py-1.5 rounded-full text-sm font-semibold transition-all duration-200 ${
                  isActive
                    ? "bg-pink-50 text-pink-600 shadow-sm shadow-pink-100/50"
                    : "text-gray-600 hover:text-pink-600 hover:bg-pink-50/50"
                }`
              }
            >
              Shop
            </NavLink>

            {userInfo && (
              <NavLink
                to="/user-orders"
                className={({ isActive }) =>
                  `px-3 py-1.5 rounded-full text-sm font-semibold transition-all duration-200 ${
                    isActive
                      ? "bg-pink-50 text-pink-600 shadow-sm shadow-pink-100/50"
                      : "text-gray-600 hover:text-pink-600 hover:bg-pink-50/50"
                  }`
                }
              >
                My Orders
              </NavLink>
            )}
          </div>

          {/* Search Bar (Desktop) */}
          <form
            onSubmit={handleSearchSubmit}
            className="hidden lg:flex items-center relative max-w-xs xl:max-w-sm w-full"
          >
            <input
              type="text"
              placeholder="Search products, brands..."
              value={searchKeyword}
              onChange={(e) => setSearchKeyword(e.target.value)}
              className="w-full bg-pink-50/40 hover:bg-white focus:bg-white text-gray-800 placeholder-gray-400 text-sm rounded-full pl-10 pr-4 py-2 border border-pink-100 focus:border-pink-300 focus:ring-4 focus:ring-pink-100 outline-none transition-all shadow-inner duration-200"
            />
            <AiOutlineSearch
              className="absolute left-3.5 text-pink-400 pointer-events-none"
              size={18}
            />
            {searchKeyword && (
              <button
                type="button"
                onClick={() => setSearchKeyword("")}
                className="absolute right-3 text-gray-400 hover:text-pink-500"
              >
                <AiOutlineClose size={14} />
              </button>
            )}
          </form>

          {/* Right Action Icons & User Dropdown */}
          <div className="flex items-center gap-2 sm:gap-3">
            
            {/* Wishlist Link */}
            <Link
              to="/favorite"
              className="relative p-2 rounded-full text-gray-600 hover:text-pink-600 hover:bg-pink-50/80 transition-all duration-200 group"
              title="My Favorites"
            >
              <FaHeart
                className="transition-transform group-hover:scale-110 text-pink-400 group-hover:text-pink-500"
                size={20}
              />
              {favoritesCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 bg-gradient-to-r from-pink-500 to-rose-500 text-white text-[11px] font-bold h-4 min-w-[16px] px-1 rounded-full flex items-center justify-center shadow-sm shadow-pink-300 animate-pulse-glow">
                  {favoritesCount}
                </span>
              )}
            </Link>

            {/* Cart Link */}
            <Link
              to="/cart"
              className="relative p-2 rounded-full text-gray-600 hover:text-pink-600 hover:bg-pink-50/80 transition-all duration-200 group flex items-center gap-1.5"
              title="Shopping Cart"
            >
              <HiOutlineShoppingBag
                className="transition-transform group-hover:scale-110 text-gray-700 group-hover:text-pink-600"
                size={22}
              />
              <span className="hidden xl:inline text-xs font-semibold text-gray-700 group-hover:text-pink-600">
                Cart
              </span>
              {cartCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 bg-gradient-to-r from-pink-500 to-rose-500 text-white text-[11px] font-bold h-4 min-w-[16px] px-1 rounded-full flex items-center justify-center shadow-sm shadow-pink-300 animate-pulse-glow">
                  {cartCount}
                </span>
              )}
            </Link>

            {/* User Profile / Auth State */}
            {userInfo ? (
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="flex items-center gap-2 pl-2 pr-3 py-1 rounded-full bg-pink-50/60 hover:bg-pink-100/70 border border-pink-200/60 transition-all duration-200 focus:outline-none"
                >
                  <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-pink-500 to-rose-400 text-white text-xs font-bold flex items-center justify-center shadow-sm">
                    {userInfo.username ? userInfo.username[0].toUpperCase() : "U"}
                  </div>
                  <span className="text-xs font-semibold text-gray-800 max-w-[90px] truncate hidden sm:inline">
                    {userInfo.username}
                  </span>
                  <FiChevronDown
                    size={14}
                    className={`text-gray-500 transition-transform duration-200 ${
                      dropdownOpen ? "rotate-180 text-pink-600" : ""
                    }`}
                  />
                </button>

                {/* Dropdown Menu */}
                {dropdownOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-xl shadow-pink-200/40 border border-pink-100 py-2 z-50 animate-slide-down">
                    <div className="px-4 py-2 border-b border-pink-50">
                      <p className="text-xs text-gray-400 font-medium">Signed in as</p>
                      <p className="text-sm font-bold text-gray-800 truncate">
                        {userInfo.username}
                      </p>
                      {userInfo.email && (
                        <p className="text-xs text-pink-600 truncate">{userInfo.email}</p>
                      )}
                    </div>

                    {/* Admin Links */}
                    {userInfo.isAdmin && (
                      <div className="py-1 border-b border-pink-50">
                        <div className="px-3 py-1">
                          <span className="text-[10px] font-bold uppercase tracking-wider text-pink-400">
                            Admin Center
                          </span>
                        </div>
                        <Link
                          to="/admin/dashboard"
                          onClick={() => setDropdownOpen(false)}
                          className="flex items-center gap-2.5 px-4 py-2 text-xs font-medium text-gray-700 hover:bg-pink-50 hover:text-pink-600 transition-colors"
                        >
                          <AiOutlineDashboard className="text-pink-400" size={16} />
                          Dashboard
                        </Link>
                        <Link
                          to="/admin/productlist"
                          onClick={() => setDropdownOpen(false)}
                          className="flex items-center gap-2.5 px-4 py-2 text-xs font-medium text-gray-700 hover:bg-pink-50 hover:text-pink-600 transition-colors"
                        >
                          <FiPackage className="text-pink-400" size={16} />
                          Products Management
                        </Link>
                        <Link
                          to="/admin/categorylist"
                          onClick={() => setDropdownOpen(false)}
                          className="flex items-center gap-2.5 px-4 py-2 text-xs font-medium text-gray-700 hover:bg-pink-50 hover:text-pink-600 transition-colors"
                        >
                          <FiTag className="text-pink-400" size={16} />
                          Categories
                        </Link>
                        <Link
                          to="/admin/orderlist"
                          onClick={() => setDropdownOpen(false)}
                          className="flex items-center gap-2.5 px-4 py-2 text-xs font-medium text-gray-700 hover:bg-pink-50 hover:text-pink-600 transition-colors"
                        >
                          <AiOutlineOrderedList className="text-pink-400" size={16} />
                          All Orders
                        </Link>
                        <Link
                          to="/admin/userlist"
                          onClick={() => setDropdownOpen(false)}
                          className="flex items-center gap-2.5 px-4 py-2 text-xs font-medium text-gray-700 hover:bg-pink-50 hover:text-pink-600 transition-colors"
                        >
                          <FiUsers className="text-pink-400" size={16} />
                          Users
                        </Link>
                      </div>
                    )}

                    {/* Standard User Links */}
                    <div className="py-1">
                      <Link
                        to="/profile"
                        onClick={() => setDropdownOpen(false)}
                        className="flex items-center gap-2.5 px-4 py-2 text-xs font-medium text-gray-700 hover:bg-pink-50 hover:text-pink-600 transition-colors"
                      >
                        <AiOutlineUser className="text-pink-400" size={16} />
                        Profile Settings
                      </Link>
                      <Link
                        to="/user-orders"
                        onClick={() => setDropdownOpen(false)}
                        className="flex items-center gap-2.5 px-4 py-2 text-xs font-medium text-gray-700 hover:bg-pink-50 hover:text-pink-600 transition-colors"
                      >
                        <FiPackage className="text-pink-400" size={16} />
                        My Order History
                      </Link>
                    </div>

                    {/* Logout */}
                    <div className="pt-1 border-t border-pink-50">
                      <button
                        onClick={logoutHandler}
                        className="w-full flex items-center gap-2.5 px-4 py-2 text-xs font-semibold text-rose-600 hover:bg-rose-50 transition-colors text-left"
                      >
                        <AiOutlineLogout size={16} />
                        Sign Out
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link
                  to="/login"
                  className="px-3 py-1.5 text-xs sm:text-sm font-semibold text-gray-700 hover:text-pink-600 transition-colors"
                >
                  Log In
                </Link>
                <Link
                  to="/register"
                  className="px-3.5 py-1.5 text-xs sm:text-sm font-semibold text-white bg-gradient-to-r from-pink-500 to-rose-400 hover:from-pink-600 hover:to-rose-500 rounded-full shadow-sm shadow-pink-200 hover:shadow-md hover:shadow-pink-300 transition-all duration-200 transform hover:-translate-y-0.5"
                >
                  Sign Up
                </Link>
              </div>
            )}

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl text-gray-600 hover:text-pink-600 hover:bg-pink-50 md:hidden transition-colors"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <AiOutlineClose size={22} /> : <AiOutlineMenu size={22} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-pink-100 bg-white/95 backdrop-blur-lg px-4 pt-3 pb-6 animate-slide-down shadow-lg">
            {/* Mobile Search */}
            <form onSubmit={handleSearchSubmit} className="relative mb-4">
              <input
                type="text"
                placeholder="Search products..."
                value={searchKeyword}
                onChange={(e) => setSearchKeyword(e.target.value)}
                className="w-full bg-pink-50/50 text-gray-800 text-sm rounded-full pl-10 pr-4 py-2 border border-pink-200 focus:outline-none focus:ring-2 focus:ring-pink-300"
              />
              <AiOutlineSearch
                className="absolute left-3.5 top-2.5 text-pink-400"
                size={18}
              />
            </form>

            <div className="flex flex-col space-y-2">
              <Link
                to="/"
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 rounded-xl text-sm font-semibold text-gray-700 hover:bg-pink-50 hover:text-pink-600 transition-colors"
              >
                Home
              </Link>
              <Link
                to="/shop"
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 rounded-xl text-sm font-semibold text-gray-700 hover:bg-pink-50 hover:text-pink-600 transition-colors"
              >
                Shop
              </Link>
              <Link
                to="/favorite"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-between px-3 py-2 rounded-xl text-sm font-semibold text-gray-700 hover:bg-pink-50 hover:text-pink-600 transition-colors"
              >
                <span>Favorites</span>
                {favoritesCount > 0 && (
                  <span className="bg-pink-500 text-white text-xs px-2 py-0.5 rounded-full font-bold">
                    {favoritesCount}
                  </span>
                )}
              </Link>
              <Link
                to="/cart"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-between px-3 py-2 rounded-xl text-sm font-semibold text-gray-700 hover:bg-pink-50 hover:text-pink-600 transition-colors"
              >
                <span>Cart</span>
                {cartCount > 0 && (
                  <span className="bg-pink-500 text-white text-xs px-2 py-0.5 rounded-full font-bold">
                    {cartCount}
                  </span>
                )}
              </Link>

              {userInfo && (
                <>
                  <Link
                    to="/user-orders"
                    onClick={() => setMobileMenuOpen(false)}
                    className="px-3 py-2 rounded-xl text-sm font-semibold text-gray-700 hover:bg-pink-50 hover:text-pink-600 transition-colors"
                  >
                    My Orders
                  </Link>
                  <Link
                    to="/profile"
                    onClick={() => setMobileMenuOpen(false)}
                    className="px-3 py-2 rounded-xl text-sm font-semibold text-gray-700 hover:bg-pink-50 hover:text-pink-600 transition-colors"
                  >
                    Profile
                  </Link>

                  {userInfo.isAdmin && (
                    <div className="pt-2 border-t border-pink-100 flex flex-col space-y-1">
                      <span className="px-3 text-[10px] font-bold text-pink-400 uppercase tracking-wider">
                        Admin Options
                      </span>
                      <Link
                        to="/admin/dashboard"
                        onClick={() => setMobileMenuOpen(false)}
                        className="px-3 py-1.5 text-xs text-gray-700 hover:text-pink-600"
                      >
                        Dashboard
                      </Link>
                      <Link
                        to="/admin/productlist"
                        onClick={() => setMobileMenuOpen(false)}
                        className="px-3 py-1.5 text-xs text-gray-700 hover:text-pink-600"
                      >
                        Products
                      </Link>
                      <Link
                        to="/admin/categorylist"
                        onClick={() => setMobileMenuOpen(false)}
                        className="px-3 py-1.5 text-xs text-gray-700 hover:text-pink-600"
                      >
                        Categories
                      </Link>
                      <Link
                        to="/admin/orderlist"
                        onClick={() => setMobileMenuOpen(false)}
                        className="px-3 py-1.5 text-xs text-gray-700 hover:text-pink-600"
                      >
                        Orders
                      </Link>
                    </div>
                  )}

                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      logoutHandler();
                    }}
                    className="text-left px-3 py-2 text-sm font-semibold text-rose-600 hover:bg-rose-50 rounded-xl"
                  >
                    Sign Out
                  </button>
                </>
              )}
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Navigation;
