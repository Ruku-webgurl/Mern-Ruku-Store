import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useLoginMutation } from "../../redux/api/userApiSlice";
import { setCredientials } from "../../redux/features/auth/authSlice";
import { toast } from "react-toastify";
import {
  FiMail,
  FiLock,
  FiEye,
  FiEyeOff,
  FiArrowRight,
  FiShield,
  FiCheckCircle,
  FiTruck,
} from "react-icons/fi";


const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [login, { isLoading }] = useLoginMutation();
  const { userInfo } = useSelector((state) => state.auth);

  const { search } = useLocation();
  const sp = new URLSearchParams(search);
  const redirect = sp.get("redirect") || "/";

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [navigate, redirect, userInfo]);

  const submitHandler = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error("Please fill in all fields", { position: "top-right" });
      return;
    }

    try {
      const res = await login({ email, password }).unwrap();
      dispatch(setCredientials({ ...res }));
      toast.success(`Welcome back, ${res.username || "Shopper"}!`, {
        position: "top-right",
      });
      navigate(redirect);
    } catch (err) {
      toast.error(
        err?.data?.message || err?.error || "Invalid email or password",
        { position: "top-right" }
      );
    }
  };

  return (
    <div className="min-h-[calc(100vh-5rem)] bg-[#fffafb] flex items-center justify-center py-10 px-4 sm:px-6 lg:px-8">
      {/* Outer Card Container */}
      <div className="w-full max-w-5xl bg-white rounded-3xl shadow-xl shadow-pink-100/60 border border-pink-100/80 overflow-hidden grid grid-cols-1 lg:grid-cols-12 transition-all">
        {/* Left Column: Login Form (7 cols on desktop) */}
        <div className="lg:col-span-7 p-8 sm:p-12 xl:p-14 flex flex-col justify-between">
          <div>
            {/* Brand Logo & Tag */}
            <div className="flex items-center gap-3 mb-8">
              <Link to="/" className="flex items-center gap-2 group">
                <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-pink-500 to-rose-400 flex items-center justify-center text-white font-black text-lg shadow-md shadow-pink-200 group-hover:scale-105 transition-transform">
                  R
                </div>
                <div>
                  <span className="text-lg font-black tracking-tight text-gray-900 block leading-none">
                    RUKU<span className="text-pink-600">.</span>
                  </span>
                  <span className="text-[10px] font-bold tracking-widest text-pink-400 uppercase">
                    STORE
                  </span>
                </div>
              </Link>

              <span className="h-4 w-px bg-pink-100 mx-1 hidden sm:block"></span>

              <div className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-pink-50 text-pink-600 border border-pink-200/80 text-[11px] font-bold">
                {/* <LuSparkles size={12} className="text-pink-500" /> */}
                <span>Member Access</span>
              </div>
            </div>

            {/* Title & Subtitle */}
            <h1 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight">
              Welcome back
            </h1>
            <p className="mt-2 text-sm text-gray-500 leading-relaxed">
              Sign in to manage your orders, wishlist, and enjoy exclusive member discounts.
            </p>

            {/* Form */}
            <form onSubmit={submitHandler} className="mt-8 space-y-5">
              {/* Email Input */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2"
                >
                  Email Address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                    <FiMail size={16} />
                  </div>
                  <input
                    id="email"
                    type="email"
                    required
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 rounded-2xl border border-pink-200/80 bg-pink-50/20 hover:bg-white focus:bg-white text-gray-900 text-sm placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-pink-100 focus:border-pink-400 transition-all shadow-inner"
                  />
                </div>
              </div>

              {/* Password Input */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label
                    htmlFor="password"
                    className="block text-xs font-bold text-gray-700 uppercase tracking-wider"
                  >
                    Password
                  </label>
                  <span className="text-xs font-semibold text-pink-600 hover:text-pink-700 hover:underline cursor-pointer">
                    Forgot password?
                  </span>
                </div>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                    <FiLock size={16} />
                  </div>
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    required
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-10 pr-11 py-3 rounded-2xl border border-pink-200/80 bg-pink-50/20 hover:bg-white focus:bg-white text-gray-900 text-sm placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-pink-100 focus:border-pink-400 transition-all shadow-inner"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-gray-400 hover:text-pink-600 transition-colors cursor-pointer"
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? <FiEyeOff size={16} /> : <FiEye size={16} />}
                  </button>
                </div>
              </div>

              {/* Remember Me */}
              <div className="flex items-center">
                <input
                  id="remember-me"
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 rounded text-pink-600 focus:ring-pink-400 border-gray-300 accent-pink-500 cursor-pointer"
                />
                <label
                  htmlFor="remember-me"
                  className="ml-2.5 text-xs font-medium text-gray-600 cursor-pointer select-none"
                >
                  Keep me signed in for 30 days
                </label>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-pink-500 to-rose-400 hover:from-pink-600 hover:to-rose-500 text-white font-bold text-sm tracking-wide shadow-md shadow-pink-200 hover:shadow-lg hover:shadow-pink-300 transition-all duration-200 transform hover:-translate-y-0.5 active:scale-95 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Signing In...</span>
                  </>
                ) : (
                  <>
                    <span>Sign In to Account</span>
                    <FiArrowRight size={16} />
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Footer Switch to Register */}
          <div className="mt-8 pt-6 border-t border-pink-100 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-gray-500">
            <p>
              New to Ruku Store?{" "}
              <Link
                to={redirect ? `/register?redirect=${redirect}` : "/register"}
                className="font-bold text-pink-600 hover:text-pink-700 hover:underline"
              >
                Create an account
              </Link>
            </p>

            <div className="flex items-center gap-1.5 text-gray-400">
              <FiShield size={13} className="text-pink-500" />
              <span>256-Bit SSL Protected</span>
            </div>
          </div>
        </div>

        {/* Right Column: Promotional Visual Showcase (5 cols on desktop) */}
        <div className="hidden lg:flex lg:col-span-5 relative bg-gradient-to-br from-pink-100 via-rose-50 to-pink-200 p-10 flex-col justify-between overflow-hidden border-l border-pink-100">
          {/* Background Decorative Graphic */}
          <div className="absolute inset-0 z-0 opacity-25 mix-blend-multiply pointer-events-none">
            <img
              src="/hero-podium-bg.jpg"
              alt="Store Showcase"
              className="w-full h-full object-cover object-center"
            />
          </div>

          {/* Subtle Pink Glowing Blurs */}
          <div className="absolute top-10 right-10 w-44 h-44 bg-pink-300/40 rounded-full blur-2xl pointer-events-none"></div>
          <div className="absolute bottom-10 left-10 w-48 h-48 bg-rose-200/50 rounded-full blur-2xl pointer-events-none"></div>

          {/* Top Badge */}
          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/90 backdrop-blur-md border border-pink-200 text-pink-700 text-xs font-black shadow-xs">
              <span>🌸</span>
              <span>RUKU REWARDS CLUB</span>
            </div>
          </div>

          {/* Center Floating Value Cards */}
          <div className="relative z-10 space-y-4 my-auto">
            <div className="bg-white/90 backdrop-blur-md rounded-2xl p-4 border border-pink-100 shadow-sm transition-all hover:translate-x-1">
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-xl bg-pink-100 text-pink-600 shrink-0 mt-0.5">
                  <FiCheckCircle size={16} />
                </div>
                <div>
                  <h4 className="text-xs font-black text-gray-900">
                    Instant 15% Welcome Discount
                  </h4>
                  <p className="text-[11px] text-gray-500 mt-0.5 leading-relaxed">
                    Automatically applied on your first checkout after signing up.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white/90 backdrop-blur-md rounded-2xl p-4 border border-pink-100 shadow-sm transition-all hover:translate-x-1">
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-xl bg-pink-100 text-pink-600 shrink-0 mt-0.5">
                  <FiTruck size={16} />
                </div>
                <div>
                  <h4 className="text-xs font-black text-gray-900">
                    Saved Wishlist & Order Tracking
                  </h4>
                  <p className="text-[11px] text-gray-500 mt-0.5 leading-relaxed">
                    Keep your favorite items synced across all your devices seamlessly.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Social Proof */}
          <div className="relative z-10 pt-4 border-t border-pink-200/60 flex items-center justify-between text-xs font-bold text-gray-700">
            <span>⭐⭐⭐⭐⭐ 4.9/5 Rating</span>
            <span className="text-pink-600">10,000+ Happy Buyers</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
