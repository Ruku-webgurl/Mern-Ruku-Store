import { useState } from "react";
import { Link } from "react-router-dom";
import Ratings from "./Ratings";
import { useGetTopProductsQuery } from "../../redux/api/productApiSlice";
import SmallProduct from "./SmallProduct";
import Loader from "../../components/Loader";
import { FiMessageSquare, FiList, FiGrid } from "react-icons/fi";

function ProductTabs({
  loadingProductReview,
  userInfo,
  submitHandler,
  rating,
  setRating,
  comment,
  setComment,
  product,
}) {
  const { data, isLoading } = useGetTopProductsQuery();
  const [activeTab, setActiveTab] = useState(1);

  if (isLoading) {
    return <Loader />;
  }

  const handleTabClick = (tabNumber) => {
    setActiveTab(tabNumber);
  };

  const topProductsList = Array.isArray(data) ? data : [];

  return (
    <div className="flex flex-col lg:flex-row gap-8">
      {/* Tab Navigation Menu */}
      <section className="flex lg:flex-col gap-2 shrink-0 border-b lg:border-b-0 lg:border-r border-pink-100 pb-4 lg:pb-0 lg:pr-6">
        <button
          onClick={() => handleTabClick(1)}
          className={`flex items-center gap-2 px-5 py-3 rounded-2xl text-xs font-bold transition-all text-left cursor-pointer ${
            activeTab === 1
              ? "bg-pink-500 text-white shadow-sm shadow-pink-200"
              : "bg-pink-50/50 hover:bg-pink-50 text-gray-700"
          }`}
        >
          <FiMessageSquare size={14} />
          <span>Write Review</span>
        </button>

        <button
          onClick={() => handleTabClick(2)}
          className={`flex items-center gap-2 px-5 py-3 rounded-2xl text-xs font-bold transition-all text-left cursor-pointer ${
            activeTab === 2
              ? "bg-pink-500 text-white shadow-sm shadow-pink-200"
              : "bg-pink-50/50 hover:bg-pink-50 text-gray-700"
          }`}
        >
          <FiList size={14} />
          <span>All Reviews ({product?.reviews?.length || 0})</span>
        </button>

        <button
          onClick={() => handleTabClick(3)}
          className={`flex items-center gap-2 px-5 py-3 rounded-2xl text-xs font-bold transition-all text-left cursor-pointer ${
            activeTab === 3
              ? "bg-pink-500 text-white shadow-sm shadow-pink-200"
              : "bg-pink-50/50 hover:bg-pink-50 text-gray-700"
          }`}
        >
          <FiGrid size={14} />
          <span>Related Products</span>
        </button>
      </section>

      {/* Tab Content Panels */}
      <section className="flex-1">
        {/* Tab 1: Write Review */}
        {activeTab === 1 && (
          <div className="max-w-xl">
            <h3 className="text-base font-bold text-gray-900 mb-4">
              Share your experience
            </h3>

            {userInfo ? (
              <form onSubmit={submitHandler} className="space-y-4">
                <div>
                  <label
                    htmlFor="rating"
                    className="block text-xs font-bold text-gray-700 mb-1"
                  >
                    Rating (1 to 5 Stars)
                  </label>

                  <select
                    id="rating"
                    required
                    value={rating}
                    onChange={(e) => setRating(e.target.value)}
                    className="w-full p-2.5 border border-pink-200 rounded-xl text-xs font-semibold text-gray-800 bg-white focus:ring-2 focus:ring-pink-400 outline-none cursor-pointer"
                  >
                    <option value="">Select a score...</option>
                    <option value="1">1 - Inferior</option>
                    <option value="2">2 - Decent</option>
                    <option value="3">3 - Great</option>
                    <option value="4">4 - Excellent</option>
                    <option value="5">5 - Exceptional</option>
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="comment"
                    className="block text-xs font-bold text-gray-700 mb-1"
                  >
                    Your Review
                  </label>

                  <textarea
                    id="comment"
                    rows="4"
                    required
                    placeholder="Tell other shoppers what you loved about this product..."
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    className="w-full p-3 border border-pink-200 rounded-2xl text-xs text-gray-800 bg-white focus:ring-2 focus:ring-pink-400 outline-none resize-none"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={loadingProductReview}
                  className="px-6 py-2.5 bg-gradient-to-r from-pink-500 to-rose-400 hover:from-pink-600 hover:to-rose-500 text-white text-xs font-bold uppercase tracking-wider rounded-full shadow-sm shadow-pink-200 transition-all cursor-pointer"
                >
                  {loadingProductReview ? "Submitting..." : "Submit Review"}
                </button>
              </form>
            ) : (
              <div className="p-4 rounded-2xl bg-pink-50/60 border border-pink-100 text-xs text-gray-600">
                Please{" "}
                <Link
                  to="/login"
                  className="font-bold text-pink-600 hover:underline"
                >
                  sign in
                </Link>{" "}
                to write a verified buyer review.
              </div>
            )}
          </div>
        )}

        {/* Tab 2: All Reviews */}
        {activeTab === 2 && (
          <div className="space-y-4 max-w-2xl">
            {(!product?.reviews || product.reviews.length === 0) && (
              <p className="text-xs text-gray-500 italic py-4">
                No reviews yet. Be the first to share your thoughts!
              </p>
            )}

            {product?.reviews?.map((review) => (
              <div
                key={review._id}
                className="bg-pink-50/30 p-4 rounded-2xl border border-pink-100"
              >
                <div className="flex justify-between items-center mb-2">
                  <span className="font-bold text-xs text-gray-900">
                    {review.name}
                  </span>
                  <span className="text-[11px] text-gray-400">
                    {review.createdAt ? review.createdAt.substring(0, 10) : ""}
                  </span>
                </div>

                <Ratings value={review.rating} />
                <p className="mt-2 text-xs text-gray-700 leading-relaxed">
                  {review.comment}
                </p>
              </div>
            ))}
          </div>
        )}

        {/* Tab 3: Related Products */}
        {activeTab === 3 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {topProductsList.length === 0 ? (
              <p className="text-xs text-gray-400">No related products found.</p>
            ) : (
              topProductsList.map((p) => (
                <div key={p._id}>
                  <SmallProduct product={p} />
                </div>
              ))
            )}
          </div>
        )}
      </section>
    </div>
  );
}

export default ProductTabs;
