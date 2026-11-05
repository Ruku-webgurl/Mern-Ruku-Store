import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import Loader from "../../components/Loader";
import { setCredientials } from "../../redux/features/auth/authSlice";
import { Link } from "react-router-dom";
import { useProfileMutation } from "../../redux/api/userApiSlice";
import { FiUser, FiMail, FiLock, FiPackage, FiCheck } from "react-icons/fi";
import { HiSparkles } from "react-icons/hi2";

const Profile = () => {
  const { userInfo } = useSelector((state) => state.auth);

  const [username, setUserName] = useState(userInfo?.username || "");
  const [email, setEmail] = useState(userInfo?.email || "");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [updateProfile, { isLoading: loadingUpdateProfile }] =
    useProfileMutation();

  useEffect(() => {
    if (userInfo) {
      setUserName(userInfo.username || "");
      setEmail(userInfo.email || "");
    }
  }, [userInfo]);

  const dispatch = useDispatch();

  const submitHandler = async (e) => {
    e.preventDefault();
    if (password && password !== confirmPassword) {
      toast.error("Passwords do not match", { position: "top-right" });
      return;
    }

    try {
      const res = await updateProfile({
        _id: userInfo._id,
        username,
        email,
        password: password || undefined,
      }).unwrap();
      dispatch(setCredientials({ ...res }));
      toast.success("Profile updated successfully!", { position: "top-right" });
      setPassword("");
      setConfirmPassword("");
    } catch (err) {
      toast.error(err?.data?.message || err?.error || "Update failed", {
        position: "top-right",
      });
    }
  };

  return (
    <div className="min-h-screen bg-[#fffafb] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-pink-100 shadow-sm shadow-pink-100/50">
          {/* Header */}
          <div className="flex items-center justify-between pb-6 border-b border-pink-100 mb-8">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-pink-500 to-rose-400 flex items-center justify-center text-white font-black text-xl shadow-md shadow-pink-200">
                {username ? username.charAt(0).toUpperCase() : "U"}
              </div>
              <div>
                <h1 className="text-xl sm:text-2xl font-black text-gray-900">
                  Account Settings
                </h1>
                <p className="text-xs text-gray-500">
                  Manage your personal details and preferences
                </p>
              </div>
            </div>

            <Link
              to="/user-orders"
              className="hidden sm:inline-flex items-center gap-2 px-4 py-2 rounded-full bg-pink-50 hover:bg-pink-100 text-pink-700 text-xs font-bold border border-pink-200 transition-all cursor-pointer"
            >
              <FiPackage size={14} />
              <span>My Orders</span>
            </Link>
          </div>

          <form onSubmit={submitHandler} className="space-y-5">
            <div>
              <label
                htmlFor="profile-name"
                className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5"
              >
                Full Name
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                  <FiUser size={16} />
                </div>
                <input
                  id="profile-name"
                  type="text"
                  required
                  placeholder="Enter name"
                  className="w-full pl-10 pr-4 py-3 rounded-2xl border border-pink-200/80 bg-pink-50/20 hover:bg-white focus:bg-white text-gray-900 text-sm focus:outline-none focus:ring-4 focus:ring-pink-100 focus:border-pink-400 transition-all shadow-inner"
                  value={username}
                  onChange={(e) => setUserName(e.target.value)}
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="profile-email"
                className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5"
              >
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                  <FiMail size={16} />
                </div>
                <input
                  id="profile-email"
                  type="email"
                  required
                  placeholder="Enter email"
                  className="w-full pl-10 pr-4 py-3 rounded-2xl border border-pink-200/80 bg-pink-50/20 hover:bg-white focus:bg-white text-gray-900 text-sm focus:outline-none focus:ring-4 focus:ring-pink-100 focus:border-pink-400 transition-all shadow-inner"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            <div className="pt-2 border-t border-pink-50">
              <span className="text-[11px] font-bold text-pink-600 uppercase tracking-wider block mb-3">
                Change Password (leave blank to keep current)
              </span>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="profile-password"
                    className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5"
                  >
                    New Password
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                      <FiLock size={16} />
                    </div>
                    <input
                      id="profile-password"
                      type="password"
                      placeholder="New password"
                      className="w-full pl-10 pr-4 py-2.5 rounded-2xl border border-pink-200/80 bg-pink-50/20 hover:bg-white focus:bg-white text-gray-900 text-sm focus:outline-none focus:ring-4 focus:ring-pink-100 focus:border-pink-400 transition-all shadow-inner"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="profile-confirm-password"
                    className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5"
                  >
                    Confirm Password
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                      <FiLock size={16} />
                    </div>
                    <input
                      id="profile-confirm-password"
                      type="password"
                      placeholder="Repeat password"
                      className="w-full pl-10 pr-4 py-2.5 rounded-2xl border border-pink-200/80 bg-pink-50/20 hover:bg-white focus:bg-white text-gray-900 text-sm focus:outline-none focus:ring-4 focus:ring-pink-100 focus:border-pink-400 transition-all shadow-inner"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-3">
              <button
                type="submit"
                disabled={loadingUpdateProfile}
                className="w-full sm:w-auto px-8 py-3 rounded-full bg-gradient-to-r from-pink-500 to-rose-400 hover:from-pink-600 hover:to-rose-500 text-white font-bold text-xs uppercase tracking-wider shadow-sm shadow-pink-200 transition-all transform hover:-translate-y-0.5 cursor-pointer disabled:opacity-60 flex items-center justify-center gap-2"
              >
                {loadingUpdateProfile ? (
                  <span>Saving...</span>
                ) : (
                  <>
                    <FiCheck size={14} />
                    <span>Save Changes</span>
                  </>
                )}
              </button>

              <Link
                to="/user-orders"
                className="sm:hidden w-full text-center py-2.5 rounded-full bg-pink-50 text-pink-700 text-xs font-bold border border-pink-200"
              >
                View My Orders
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Profile;
