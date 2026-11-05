import { Link, useParams } from "react-router-dom";
import { useGetProductsQuery } from "../redux/api/productApiSlice.js";
import Loader from "../components/Loader.jsx";
import Message from "../components/Message.jsx";
import Product from "./products/Product.jsx";
import {
  Hero,
  TrustBar,
  Categories,
  FeaturedProducts,
  PromoBanner,
  Testimonials,
  Newsletter,
  Footer,
} from "../components/landingpage";

const Home = () => {
  const { keyword } = useParams();
  const { data, isLoading, isError, error } = useGetProductsQuery({ keyword });

  // If user searched for a keyword, display the search results page
  if (keyword) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-black text-gray-900">
              Search Results for: <span className="text-pink-600">"{keyword}"</span>
            </h1>
            <p className="text-sm text-gray-500 mt-1">
              Found {data?.products?.length || 0} product(s) matching your search.
            </p>
          </div>
          <Link
            to="/"
            className="text-xs font-bold text-pink-600 hover:text-pink-700 bg-pink-50 px-4 py-2 rounded-full border border-pink-200"
          >
            ← Back to Home
          </Link>
        </div>

        {isLoading ? (
          <Loader />
        ) : isError ? (
          <div className="max-w-xl mx-auto my-8">
            <Message variant="error">
              {error?.data?.message ||
                error?.error ||
                "Failed to load search results."}
            </Message>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 justify-items-center mt-6">
            {data?.products?.map((product) => (
              <Product key={product._id} product={product} />
            ))}
          </div>
        )}
      </div>
    );
  }

  // Full High-Converting Landing Page
  return (
    <div>
      <div className="container mx-auto px-4 lg:px-8">
        {/* 1. Hero Section */}
        <Hero />

        {/* 2. Trust & Value Proposition Bar */}
        <TrustBar />

        {/* 3. Popular Categories */}
        <Categories />

        {/* 4. Special & Featured Products */}
        <FeaturedProducts />

        {/* 5. Promotional Discount Banner */}
        <PromoBanner />

        {/* 6. Customer Testimonials & Reviews */}
        <Testimonials />

        {/* 7. VIP Newsletter Signup */}
        <Newsletter />
      </div>

      {/* 8. Full Site Footer */}
      <Footer />
    </div>
  );
};

export default Home;
