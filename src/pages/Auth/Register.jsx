import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useRegisterMutation } from "../../redux/api/userApiSlice";
import { setCredientials } from "../../redux/features/auth/authSlice";
import { toast } from "react-toastify";
import {
  FiUser,
  FiMail,
  FiLock,
  FiEye,
  FiEyeOff,
  FiArrowRight,
  FiShield,
  FiCheckCircle,
  FiGift,
} from "react-icons/fi";
import { HiSparkles } from "react-icons/hi2";
import { FcVip } from "react-icons/fc";

const Register = () => {
  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(true);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [register, { isLoading }] = useRegisterMutation();
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

    if (!username.trim() || !email.trim() || !password) {
      toast.error("Please fill in all required fields", {
        position: "top-right",
      });
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match", { position: "top-right" });
      return;
    }

    if (password.length < 6) {
      toast.error("Password must be at least 6 characters", {
        position: "top-right",
      });
      return;
    }

    if (!agreeTerms) {
      toast.error("Please agree to the Terms of Service to continue", {
        position: "top-right",
      });
      return;
    }

    try {
      const res = await register({ username, email, password }).unwrap();
      dispatch(setCredientials({ ...res }));
      toast.success(
        `Welcome to Ruku Store, ${res.username || "Shopper"}! Account created.`,
        { position: "top-right" }
      );
      navigate(redirect);
    } catch (error) {
      toast.error(
        error?.data?.message || error?.error || "Registration failed. Try again.",
        { position: "top-right" }
      );
    }
  };

  return (
    <div className="min-h-[calc(100vh-5rem)] bg-[#fffafb] flex items-center justify-center py-10 px-4 sm:px-6 lg:px-8">
      {/* Outer Card Container */}
      <div className="w-full max-w-5xl bg-white rounded-3xl shadow-xl shadow-pink-100/60 border border-pink-100/80 overflow-hidden grid grid-cols-1 lg:grid-cols-12 transition-all">
        {/* Left Column: Register Form (7 cols on desktop) */}
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
                
                <span>Join VIP Club</span>
              </div>
            </div>

            {/* Title & Subtitle */}
            <h1 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight">
              Create an account
            </h1>
            <p className="mt-2 text-sm text-gray-500 leading-relaxed">
              Join Ruku Store today to unlock special discounts, instant order tracking, and fast checkout.
            </p>

            {/* Form */}
            <form onSubmit={submitHandler} className="mt-7 space-y-4">
              {/* Full Name Input */}
              <div>
                <label
                  htmlFor="name"
                  className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5"
                >
                  Full Name
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                    <FiUser size={16} />
                  </div>
                  <input
                    id="name"
                    type="text"
                    required
                    placeholder="Jane Doe"
                    value={username}
                    onChange={(e) => setUserName(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 rounded-2xl border border-pink-200/80 bg-pink-50/20 hover:bg-white focus:bg-white text-gray-900 text-sm placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-pink-100 focus:border-pink-400 transition-all shadow-inner"
                  />
                </div>
              </div>

              {/* Email Input */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5"
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
                    className="w-full pl-10 pr-4 py-2.5 rounded-2xl border border-pink-200/80 bg-pink-50/20 hover:bg-white focus:bg-white text-gray-900 text-sm placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-pink-100 focus:border-pink-400 transition-all shadow-inner"
                  />
                </div>
              </div>

              {/* Password & Confirm Password Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Password Input */}
                <div>
                  <label
                    htmlFor="password"
                    className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5"
                  >
                    Password
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                      <FiLock size={16} />
                    </div>
                    <input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      required
                      placeholder="Min 6 characters"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full pl-10 pr-10 py-2.5 rounded-2xl border border-pink-200/80 bg-pink-50/20 hover:bg-white focus:bg-white text-gray-900 text-sm placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-pink-100 focus:border-pink-400 transition-all shadow-inner"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-pink-600 transition-colors cursor-pointer"
                      aria-label={showPassword ? "Hide password" : "Show password"}
                    >
                      {showPassword ? <FiEyeOff size={15} /> : <FiEye size={15} />}
                    </button>
                  </div>
                </div>

                {/* Confirm Password Input */}
                <div>
                  <label
                    htmlFor="confirmPassword"
                    className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5"
                  >
                    Confirm Password
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                      <FiLock size={16} />
                    </div>
                    <input
                      id="confirmPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      required
                      placeholder="Repeat password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="w-full pl-10 pr-10 py-2.5 rounded-2xl border border-pink-200/80 bg-pink-50/20 hover:bg-white focus:bg-white text-gray-900 text-sm placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-pink-100 focus:border-pink-400 transition-all shadow-inner"
                    />
                    <button
                      type="button"
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                      className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-pink-600 transition-colors cursor-pointer"
                      aria-label={
                        showConfirmPassword ? "Hide password" : "Show password"
                      }
                    >
                      {showConfirmPassword ? (
                        <FiEyeOff size={15} />
                      ) : (
                        <FiEye size={15} />
                      )}
                    </button>
                  </div>
                </div>
              </div>

              {/* Agree Terms Checkbox */}
              <div className="flex items-start pt-1">
                <input
                  id="agree-terms"
                  type="checkbox"
                  checked={agreeTerms}
                  onChange={(e) => setAgreeTerms(e.target.checked)}
                  className="w-4 h-4 mt-0.5 rounded text-pink-600 focus:ring-pink-400 border-gray-300 accent-pink-500 cursor-pointer shrink-0"
                />
                <label
                  htmlFor="agree-terms"
                  className="ml-2.5 text-xs text-gray-600 cursor-pointer select-none leading-relaxed"
                >
                  I agree to Ruku Store's{" "}
                  <span className="font-semibold text-pink-600 hover:underline">
                    Terms of Service
                  </span>{" "}
                  and{" "}
                  <span className="font-semibold text-pink-600 hover:underline">
                    Privacy Policy
                  </span>
                  .
                </label>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full mt-3 py-3.5 px-6 rounded-2xl bg-gradient-to-r from-pink-500 to-rose-400 hover:from-pink-600 hover:to-rose-500 text-white font-bold text-sm tracking-wide shadow-md shadow-pink-200 hover:shadow-lg hover:shadow-pink-300 transition-all duration-200 transform hover:-translate-y-0.5 active:scale-95 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Creating Account...</span>
                  </>
                ) : (
                  <>
                    <span>Create Your Account</span>
                    <FiArrowRight size={16} />
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Footer Switch to Login */}
          <div className="mt-8 pt-5 border-t border-pink-100 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-gray-500">
            <p>
              Already have an account?{" "}
              <Link
                to={redirect ? `/login?redirect=${redirect}` : "/login"}
                className="font-bold text-pink-600 hover:text-pink-700 hover:underline"
              >
                Sign In
              </Link>
            </p>

            <div className="flex items-center gap-1.5 text-gray-400">
              <FiShield size={13} className="text-pink-500" />
              <span>Safe & Secure Enrollment</span>
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
          <div className="absolute top-12 left-10 w-44 h-44 bg-pink-300/40 rounded-full blur-2xl pointer-events-none"></div>
          <div className="absolute bottom-12 right-10 w-48 h-48 bg-rose-200/50 rounded-full blur-2xl pointer-events-none"></div>

          {/* Top Badge */}
          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/90 backdrop-blur-md border border-pink-200 text-pink-700 text-xs font-black shadow-xs">
              <FiGift size={13} className="text-pink-600" />
              <span>FREE MEMBER BENEFITS</span>
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
                    Express 1-Click Ordering
                  </h4>
                  <p className="text-[11px] text-gray-500 mt-0.5 leading-relaxed">
                    Save your preferred shipping address and payment methods securely.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white/90 backdrop-blur-md rounded-2xl p-4 border border-pink-100 shadow-sm transition-all hover:translate-x-1">
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-xl bg-pink-100 text-pink-600 shrink-0 mt-0.5">
                  <FcVip size={20} />
                </div>
                <div>
                  <h4 className="text-xs font-black text-gray-900">
                    VIP Drops & Flash Sales
                  </h4>
                  <p className="text-[11px] text-gray-500 mt-0.5 leading-relaxed">
                    Get 24-hour early access to seasonal collections and clearance events.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Social Proof */}
          <div className="relative z-10 pt-4 border-t border-pink-200/60 flex items-center justify-between text-xs font-bold text-gray-700">
            <span>🎁 Welcome Gift on Sign Up</span>
            <span className="text-pink-600">100% Free Forever</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
