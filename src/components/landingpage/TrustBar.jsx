import { FiTruck, FiShield, FiRefreshCw, FiHeadphones } from "react-icons/fi";

const TrustBar = () => {
  const perks = [
    {
      icon: <FiTruck className="text-pink-600" size={24} />,
      title: "Free Express Shipping",
      desc: "On all orders above $50",
    },
    {
      icon: <FiShield className="text-pink-600" size={24} />,
      title: "Secure Checkout",
      desc: "Protected by 256-bit SSL encryption",
    },
    {
      icon: <FiRefreshCw className="text-pink-600" size={24} />,
      title: "30-Day Easy Returns",
      desc: "Hassle-free money-back guarantee",
    },
    {
      icon: <FiHeadphones className="text-pink-600" size={24} />,
      title: "24/7 Customer Care",
      desc: "Dedicated real-time assistance",
    },
  ];

  return (
    <section className="my-8 sm:my-12">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {perks.map((perk, index) => (
          <div
            key={index}
            className="flex items-center gap-4 p-5 rounded-2xl bg-white border border-pink-100/80 shadow-sm shadow-pink-100/50 hover:shadow-md hover:shadow-pink-200/50 hover:border-pink-200 transition-all duration-300 transform hover:-translate-y-1 group"
          >
            <div className="p-3.5 rounded-2xl bg-pink-50 text-pink-600 group-hover:bg-gradient-to-tr group-hover:from-pink-500 group-hover:to-rose-400 group-hover:text-white transition-all duration-300 shadow-sm">
              {perk.icon}
            </div>
            <div>
              <h4 className="text-sm font-bold text-gray-900 group-hover:text-pink-600 transition-colors">
                {perk.title}
              </h4>
              <p className="text-xs text-gray-500 mt-0.5">{perk.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TrustBar;

