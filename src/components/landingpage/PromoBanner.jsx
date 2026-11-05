import { useState } from "react";
import { Link } from "react-router-dom";
import { FiArrowRight, FiCopy, FiCheck, FiTag, FiClock } from "react-icons/fi";
import { HiSparkles } from "react-icons/hi2";

const PromoBanner = () => {
  const [copied, setCopied] = useState(false);
  const couponCode = "RUKU35";

  const handleCopy = () => {
    navigator.clipboard.writeText(couponCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <section className="my-12 sm:my-16">
      <div className="relative rounded-3xl lg:rounded-[2.5rem] bg-gradient-to-r from-pink-500 via-rose-400 to-pink-500 p-8 sm:p-12 lg:p-14 text-white overflow-hidden shadow-xl shadow-pink-300/40">
        {/* Ambient background glow & circles */}
        <div className="absolute -top-16 -right-16 w-64 h-64 bg-white/10 rounded-full blur-2xl pointer-events-none" />
        <div className="absolute -bottom-16 -left-16 w-64 h-64 bg-white/10 rounded-full blur-2xl pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8">
          
          {/* Left Text */}
          <div className="max-w-xl text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/20 backdrop-blur-md text-white text-xs font-bold mb-4">
              <HiSparkles size={14} />
              <span>Limited Time Seasonal Promotion</span>
            </div>

            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tight leading-tight mb-3">
              Special Savings: Get Up to 35% Off
            </h2>

            <p className="text-pink-50 text-sm sm:text-base leading-relaxed mb-6">
              Refresh your wardrobe and elevate your tech essentials. Apply our
              exclusive coupon code during checkout to claim your seasonal discount.
            </p>

            {/* Coupon Box */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3">
              <div className="inline-flex items-center gap-3 px-4 py-2 rounded-2xl bg-white/15 backdrop-blur-md border border-white/30 text-white font-mono text-sm">
                <FiTag className="text-pink-200" size={16} />
                <span className="font-bold tracking-wider">{couponCode}</span>
                <button
                  type="button"
                  onClick={handleCopy}
                  className="p-1 rounded-lg bg-white/20 hover:bg-white/30 text-white transition-colors cursor-pointer"
                  title="Copy Coupon Code"
                >
                  {copied ? <FiCheck size={14} /> : <FiCopy size={14} />}
                </button>
              </div>

              {copied && (
                <span className="text-xs font-bold text-white bg-white/25 px-3 py-1 rounded-full animate-fade-in">
                  Coupon Copied!
                </span>
              )}
            </div>
          </div>

          {/* Right Action Button */}
          <div className="flex flex-col items-center gap-3">
            <Link
              to="/shop"
              className="px-8 py-4 rounded-full bg-white text-pink-600 hover:text-rose-600 hover:bg-pink-50 font-black text-sm sm:text-base shadow-xl shadow-pink-700/20 hover:shadow-2xl transition-all duration-200 transform hover:-translate-y-1 inline-flex items-center gap-2"
            >
              <span>Shop Discounted Items</span>
              <FiArrowRight size={18} />
            </Link>

            <span className="text-xs text-pink-100 font-medium flex items-center gap-1.5">
              <FiClock size={13} />
              Offer valid while stocks last
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PromoBanner;

