import { FaStar, FaQuoteLeft } from "react-icons/fa";
import { FiCheckCircle } from "react-icons/fi";
import { HiSparkles } from "react-icons/hi2";

const Testimonials = () => {
  const reviews = [
    {
      id: 1,
      name: "Elena Ross",
      role: "Verified Buyer",
      initial: "E",
      rating: 5,
      review:
        "The package arrived within 3 days and the quality exceeded my expectations. The fabrics and finishing are truly premium. Will definitely order again!",
      date: "Purchased last week",
    },
    {
      id: 2,
      name: "Marcus Vance",
      role: "Verified Buyer",
      initial: "M",
      rating: 5,
      review:
        "Ruku Store's customer service was super helpful when I needed to adjust my order. Great shopping experience and seamless checkout.",
      date: "2 weeks ago",
    },
    {
      id: 3,
      name: "Sophia Chen",
      role: "Verified Buyer",
      initial: "S",
      rating: 5,
      review:
        "Everything was carefully packaged with lovely attention to detail. The accessories match the pictures exactly. Highly recommended!",
      date: "1 month ago",
    },
  ];

  return (
    <section className="my-12 sm:my-16">
      {/* Section Header */}
      <div className="text-center max-w-xl mx-auto mb-10">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-pink-50 border border-pink-200 text-pink-700 text-xs font-bold mb-2">
          <HiSparkles className="text-pink-500" size={13} />
          <span>Buyer Reviews</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">
          Loved by Our Shoppers
        </h2>
        <p className="text-sm text-gray-500 mt-1">
          Read genuine feedback from shoppers who trust Ruku Store for their everyday essentials.
        </p>
      </div>

      {/* Testimonials Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {reviews.map((rev) => (
          <div
            key={rev.id}
            className="p-6 rounded-3xl bg-white border border-pink-100 shadow-sm shadow-pink-100/40 hover:shadow-xl hover:shadow-pink-200/40 hover:border-pink-200 transition-all duration-300 transform hover:-translate-y-1 flex flex-col justify-between"
          >
            <div>
              {/* Star Rating & Quote Mark */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-1 text-pink-500">
                  {[...Array(rev.rating)].map((_, i) => (
                    <FaStar key={i} size={14} />
                  ))}
                </div>
                <FaQuoteLeft className="text-pink-100" size={20} />
              </div>

              <p className="text-sm text-gray-600 leading-relaxed italic mb-6">
                "{rev.review}"
              </p>
            </div>

            {/* Buyer Profile */}
            <div className="flex items-center gap-3 pt-4 border-t border-pink-50">
              <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-pink-500 to-rose-400 text-white font-bold flex items-center justify-center text-sm shadow-sm shadow-pink-200">
                {rev.initial}
              </div>
              <div>
                <h4 className="text-sm font-bold text-gray-900 flex items-center gap-1.5">
                  {rev.name}
                  <FiCheckCircle className="text-pink-500" size={13} title="Verified Customer" />
                </h4>
                <p className="text-xs text-gray-400">{rev.date}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Testimonials;

