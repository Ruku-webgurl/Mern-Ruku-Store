import { useState } from "react";
import { FiMail, FiCheckCircle } from "react-icons/fi";
import { HiSparkles } from "react-icons/hi2";

const Newsletter = () => {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail("");
    }
  };

  return (
    <section className="my-12 sm:my-16">
      <div className="relative rounded-3xl lg:rounded-[2.5rem] bg-gradient-to-br from-pink-50 via-white to-rose-50/70 border border-pink-100 p-8 sm:p-12 text-center max-w-3xl mx-auto shadow-xl shadow-pink-100/40 overflow-hidden">
        {/* Ambient subtle glow */}
        <div className="absolute -top-16 -right-16 w-48 h-48 bg-pink-200/40 rounded-full blur-2xl pointer-events-none" />
        <div className="absolute -bottom-16 -left-16 w-48 h-48 bg-rose-200/40 rounded-full blur-2xl pointer-events-none" />

        <div className="relative z-10 max-w-lg mx-auto">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white border border-pink-200 text-pink-700 text-xs font-bold mb-3 shadow-sm">
            <HiSparkles className="text-pink-500" size={13} />
            <span>Exclusive Membership Perk</span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight mb-2">
            Join the Ruku VIP Circle
          </h2>

          <p className="text-sm text-gray-600 mb-6 leading-relaxed">
            Subscribe to receive an instant <strong className="text-pink-600">15% off coupon</strong> for your first order, plus private access to seasonal drops and new arrivals.
          </p>

          {subscribed ? (
            <div className="p-4 rounded-2xl bg-pink-50 border border-pink-200 text-pink-800 text-sm font-semibold flex items-center justify-center gap-2 animate-fade-in">
              <FiCheckCircle className="text-pink-600" size={18} />
              <span>Thank you! Your 15% discount code has been sent to your email.</span>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="flex flex-col sm:flex-row items-center gap-3"
            >
              <div className="relative w-full">
                <FiMail
                  className="absolute left-4 top-3.5 text-pink-400"
                  size={18}
                />
                <input
                  type="email"
                  required
                  placeholder="Enter your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-white text-gray-800 text-sm rounded-full pl-11 pr-4 py-3 border border-pink-200 focus:border-pink-400 focus:ring-4 focus:ring-pink-100 outline-none transition-all shadow-inner"
                />
              </div>

              <button
                type="submit"
                className="w-full sm:w-auto px-7 py-3 rounded-full bg-gradient-to-r from-pink-500 to-rose-400 hover:from-pink-600 hover:to-rose-500 text-white font-bold text-sm shadow-md shadow-pink-200 hover:shadow-lg hover:shadow-pink-300 transition-all transform hover:-translate-y-0.5 whitespace-nowrap cursor-pointer"
              >
                Claim 15% Off
              </button>
            </form>
          )}

          <p className="text-xs text-gray-400 mt-4">
            We value your privacy. Unsubscribe anytime with 1 click.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;

