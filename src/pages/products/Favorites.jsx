import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { selectFavoriteProduct } from "../../redux/features/favorites/favoriteSlice";
import ProductCard from "./ProductCard";
import { FaHeart } from "react-icons/fa";

const Favorites = () => {
  const favorites = useSelector(selectFavoriteProduct) || [];

  return (
    <div className="min-h-screen bg-[#fffafb] py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8 pb-4 border-b border-pink-100">
          <div>
            <h1 className="text-2xl sm:text-3xl font-black text-gray-900">
              Wishlist & <span className="text-pink-600">Favorites</span>
            </h1>
            <p className="text-xs sm:text-sm text-gray-500 mt-1">
              You have saved {favorites.length} item(s) for later.
            </p>
          </div>
          <Link
            to="/shop"
            className="text-xs font-bold text-pink-600 hover:text-pink-700 bg-pink-50 hover:bg-pink-100 px-4 py-2 rounded-full border border-pink-200 transition-all"
          >
            ← Explore Shop
          </Link>
        </div>

        {favorites.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 text-center border border-pink-100 shadow-sm max-w-lg mx-auto my-12">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-pink-50 border border-pink-100 flex items-center justify-center text-pink-500 text-2xl">
              <FaHeart />
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">
              No favorites saved yet
            </h3>
            <p className="text-sm text-gray-500 mb-6 leading-relaxed">
              Tap the heart icon on any product to save it to your personal wishlist.
            </p>
            <Link
              to="/shop"
              className="inline-block px-7 py-3 rounded-full bg-gradient-to-r from-pink-500 to-rose-400 hover:from-pink-600 hover:to-rose-500 text-white text-xs font-bold uppercase tracking-wider shadow-sm shadow-pink-200 transition-all"
            >
              Browse Products
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 justify-items-center">
            {favorites.map((product) => (
              <ProductCard key={product._id} p={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Favorites;
