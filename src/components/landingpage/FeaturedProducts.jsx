import { useState } from "react";
import { Link } from "react-router-dom";
import { useGetProductsQuery } from "../../redux/api/productApiSlice";
import Product from "../../pages/products/Product";
import Loader from "../Loader";
import Message from "../Message";
import { FiArrowRight, FiStar, FiClock } from "react-icons/fi";
import { HiFire } from "react-icons/hi2";

const FeaturedProducts = () => {
  const { data, isLoading, isError, error } = useGetProductsQuery({});
  const [activeTab, setActiveTab] = useState("all");

  const products = data?.products || [];

  // Filter or sort products based on active tab
  let displayedProducts = [...products];
  if (activeTab === "top") {
    displayedProducts = displayedProducts
      .filter((p) => (p.rating || 0) >= 4)
      .slice(0, 8);
  } else if (activeTab === "deals") {
    displayedProducts = displayedProducts.slice(0, 6);
  } else {
    displayedProducts = displayedProducts.slice(0, 8);
  }

  const tabs = [
    { id: "all", label: "Special Picks", icon: <HiFire size={15} /> },
    { id: "top", label: "Top Rated", icon: <FiStar size={14} /> },
    { id: "deals", label: "New In", icon: <FiClock size={14} /> },
  ];

  return (
    <section className="my-12 sm:my-16">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-pink-50 border border-pink-200 text-pink-700 text-xs font-bold mb-2">
            <HiFire className="text-pink-500" size={13} />
            <span>Handpicked For You</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">
            Trending & Special Products
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            Discover quality items loved by our community.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-2 bg-white p-1 rounded-full border border-pink-100 shadow-sm self-start md:self-auto">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-bold transition-all duration-200 cursor-pointer ${
                activeTab === tab.id
                  ? "bg-gradient-to-r from-pink-500 to-rose-400 text-white shadow-sm shadow-pink-200"
                  : "text-gray-600 hover:text-pink-600 hover:bg-pink-50/60"
              }`}
            >
              {tab.icon}
              <span>{tab.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Product Content Area */}
      {isLoading ? (
        <Loader />
      ) : isError ? (
        <div className="max-w-xl mx-auto my-6">
          <Message variant="error">
            {error?.data?.message ||
              error?.error ||
              "Unable to load products. Please check if your backend server is running."}
          </Message>
        </div>
      ) : displayedProducts.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-3xl border border-pink-100 p-8 shadow-sm">
          <p className="text-gray-500 text-sm">No products found in this category.</p>
          <Link
            to="/shop"
            className="inline-flex items-center gap-2 mt-4 px-6 py-2.5 rounded-full bg-pink-500 text-white text-xs font-bold hover:bg-pink-600 transition-colors shadow-sm"
          >
            Explore Catalog
          </Link>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 justify-items-center">
            {displayedProducts.map((product) => (
              <Product key={product._id} product={product} />
            ))}
          </div>

          <div className="mt-10 text-center">
            <Link
              to="/shop"
              className="inline-flex items-center gap-2 px-8 py-3 rounded-full bg-white hover:bg-pink-50 text-gray-800 hover:text-pink-600 font-bold text-sm border border-pink-200 shadow-sm hover:shadow-md transition-all duration-200 transform hover:-translate-y-0.5 group"
            >
              <span>Explore Entire Catalog</span>
              <FiArrowRight
                className="transition-transform group-hover:translate-x-1"
                size={16}
              />
            </Link>
          </div>
        </>
      )}
    </section>
  );
};

export default FeaturedProducts;
