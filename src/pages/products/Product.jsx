import { useState } from "react";
import { Link } from "react-router-dom";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { FiEye, FiStar } from "react-icons/fi";
import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/features/cart/cartSlice";
import { toast } from "react-toastify";
import HeartIcon from "./HeartIcon";
import { getFullImageUrl } from "../../utils/imageUrl";
import QuickViewModal from "../../components/QuickViewModal";

const Product = ({ product }) => {
  const [isQuickViewOpen, setIsQuickViewOpen] = useState(false);
  const dispatch = useDispatch();

  if (!product) return null;

  const addToCartHandler = (item, qty = 1) => {
    dispatch(addToCart({ ...item, qty }));
    toast.success("Added to cart!", {
      position: "top-right",
      autoClose: 2000,
    });
  };

  const imageSrc = getFullImageUrl(product.image);
  const originalPrice = (Number(product.price) * 1.25).toFixed(2);

  return (
    <>
      <div className="w-full max-w-[280px] bg-white rounded-3xl p-3 border border-pink-100/80 shadow-sm shadow-pink-100/40 hover:shadow-2xl hover:shadow-pink-300/40 hover:border-pink-300 transition-all duration-500 ease-out transform hover:-translate-y-2 relative group flex flex-col justify-between overflow-hidden">
        {/* Top Product Image Container */}
        <div className="relative rounded-2xl bg-gradient-to-b from-pink-50/50 via-pink-50/20 to-white p-4 overflow-hidden text-center aspect-square flex items-center justify-center">
          {/* Top Left: Brand Pill Badge */}
          {product.brand && (
            <span className="absolute top-2.5 left-2.5 z-10 bg-white/90 backdrop-blur-md text-pink-700 border border-pink-200/90 text-[10px] font-extrabold px-2.5 py-0.5 rounded-full shadow-xs">
              {product.brand}
            </span>
          )}

          {/* Top Right: Heart Wishlist Button */}
          <HeartIcon product={product} />

          {/* Product Image with Zoom on Hover */}
          <Link
            to={`/product/${product._id}`}
            className="w-full h-full flex items-center justify-center"
          >
            <img
              src={imageSrc}
              alt={product.name}
              onError={(e) => {
                e.currentTarget.onerror = null;
                e.currentTarget.src =
                  "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&q=80";
              }}
              className="max-h-48 w-auto object-contain mx-auto transition-transform duration-700 ease-out group-hover:scale-110"
            />
          </Link>

          {/* Subtle Ambient Hover Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-pink-900/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>

          {/* MM Selections Style: Slide-Up Action Bar Drawer */}
          <div className="absolute inset-x-3 bottom-3 flex items-center justify-center gap-1.5 translate-y-10 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 ease-out z-20">
            {/* Quick Add to Cart Pill Button */}
            <button
              onClick={(e) => {
                e.preventDefault();
                addToCartHandler(product, 1);
              }}
              className="flex-1 py-2 px-3 rounded-full bg-gradient-to-r from-pink-500 to-rose-400 hover:from-pink-600 hover:to-rose-500 text-white font-bold text-[11px] uppercase tracking-wider shadow-md shadow-pink-300/60 transition-all transform active:scale-95 flex items-center justify-center gap-1.5 cursor-pointer"
              title="Quick Add to Bag"
            >
              <AiOutlineShoppingCart size={13} />
              <span>Quick Add</span>
            </button>

            {/* Quick View Button */}
            <button
              onClick={(e) => {
                e.preventDefault();
                setIsQuickViewOpen(true);
              }}
              className="p-2 rounded-full bg-white/95 hover:bg-pink-50 text-gray-700 hover:text-pink-600 border border-pink-200 shadow-sm transition-all transform active:scale-95 cursor-pointer"
              title="Quick View Preview"
              aria-label="Quick View"
            >
              <FiEye size={14} />
            </button>
          </div>
        </div>

        {/* Product Information Details */}
        <div className="pt-3.5 pb-1 px-1.5 flex flex-col flex-1 justify-between">
          <div>
            {product.brand && (
              <span className="text-[10px] font-extrabold text-pink-500 tracking-wider uppercase block mb-1">
                • {product.brand}
              </span>
            )}

            <Link to={`/product/${product._id}`}>
              <h3 className="text-sm font-bold text-gray-900 group-hover:text-pink-600 transition-colors line-clamp-1 leading-snug">
                {product.name}
              </h3>
            </Link>

            {/* Star Rating & Review snippet */}
            <div className="flex items-center gap-1.5 mt-1.5 text-amber-400 text-xs">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <FiStar
                    key={i}
                    size={11}
                    className={
                      i < (product.rating || 5)
                        ? "fill-amber-400 text-amber-400"
                        : "text-gray-300"
                    }
                  />
                ))}
              </div>
              <span className="text-[10px] font-bold text-gray-400">
                ({product.numReviews || 12})
              </span>
            </div>
          </div>

          {/* Pricing Row */}
          <div className="flex items-center justify-between mt-3 pt-2.5 border-t border-pink-50">
            <div className="flex items-baseline gap-1.5">
              <span className="text-base sm:text-lg font-black text-pink-600">
                ${product.price}
              </span>
              <span className="text-[11px] text-gray-400 line-through font-semibold">
                ${originalPrice}
              </span>
            </div>

            <Link
              to={`/product/${product._id}`}
              className="text-[11px] font-bold text-pink-600 group-hover:text-pink-700 hover:underline flex items-center gap-0.5"
            >
              <span>View</span>
              <span className="transition-transform group-hover:translate-x-0.5">
                →
              </span>
            </Link>
          </div>
        </div>
      </div>

      {/* Quick View Modal Popup */}
      <QuickViewModal
        product={product}
        isOpen={isQuickViewOpen}
        onClose={() => setIsQuickViewOpen(false)}
        onAddToCart={addToCartHandler}
      />
    </>
  );
};

export default Product;
