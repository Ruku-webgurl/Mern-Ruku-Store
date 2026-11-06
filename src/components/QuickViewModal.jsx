import { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/features/cart/cartSlice";
import { toast } from "react-toastify";
import {
  FiX,
  FiShoppingBag,
  FiCheck,
  FiStar,
  FiArrowRight,
  FiShield,
  FiTruck,
} from "react-icons/fi";
import HeartIcon from "../pages/products/HeartIcon";
import { getFullImageUrl } from "../utils/imageUrl";

const QuickViewModal = ({ product, isOpen, onClose }) => {
  const [qty, setQty] = useState(1);
  const dispatch = useDispatch();

  if (!isOpen || !product) return null;

  const imageSrc = getFullImageUrl(product.image);

  const addToCartHandler = () => {
    dispatch(addToCart({ ...product, qty: Number(qty) }));
    toast.success(`Added ${qty} item(s) to your cart!`, {
      position: "top-right",
      autoClose: 2000,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-xs transition-opacity animate-fade-in"
        onClick={onClose}
      ></div>

      {/* Modal Dialog Card */}
      <div className="relative bg-white rounded-3xl p-6 sm:p-8 max-w-2xl w-full border border-pink-100 shadow-2xl z-10 transform transition-all animate-scale-up">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full bg-pink-50 hover:bg-pink-100 text-gray-500 hover:text-pink-600 transition-colors cursor-pointer z-20"
          aria-label="Close modal"
        >
          <FiX size={18} />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          {/* Image Frame */}
          <div className="relative rounded-2xl bg-gradient-to-b from-pink-50/60 to-white p-4 border border-pink-100 flex items-center justify-center min-h-[260px] sm:min-h-[300px]">
            <img
              src={imageSrc}
              alt={product.name}
              onError={(e) => {
                e.currentTarget.onerror = null;
                e.currentTarget.src =
                  "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&q=80";
              }}
              className="max-h-64 w-auto object-contain mx-auto transition-transform hover:scale-105 duration-300"
            />
            <HeartIcon product={product} />
          </div>

          {/* Details */}
          <div className="flex flex-col justify-between">
            <div>
              {product.brand && (
                <span className="inline-block px-2.5 py-0.5 rounded-full bg-pink-50 text-pink-700 border border-pink-200 text-[10px] font-bold uppercase tracking-wider mb-2">
                  {product.brand}
                </span>
              )}

              <h2 className="text-xl sm:text-2xl font-black text-gray-900 leading-snug line-clamp-2">
                {product.name}
              </h2>

              {/* Price & Rating */}
              <div className="flex items-center gap-3 mt-3">
                <span className="text-2xl font-black text-pink-600">
                  ${product.price}
                </span>
                <span className="text-xs text-gray-400 line-through">
                  ${(Number(product.price) * 1.25).toFixed(2)}
                </span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                  Save 20%
                </span>
              </div>

              <p className="mt-3 text-xs text-gray-600 line-clamp-3 leading-relaxed">
                {product.description ||
                  "Discover authentic quality and timeless appeal, carefully selected for everyday luxury."}
              </p>
            </div>

            {/* Quantity and Actions */}
            <div className="mt-6 pt-4 border-t border-pink-50 space-y-4">
              <div className="flex items-center gap-3">
                <div className="flex items-center border border-pink-200 rounded-2xl bg-white overflow-hidden p-1 shadow-inner">
                  <button
                    type="button"
                    onClick={() => setQty((prev) => Math.max(1, prev - 1))}
                    className="w-8 h-8 flex items-center justify-center font-bold text-gray-600 hover:text-pink-600 hover:bg-pink-50 rounded-xl transition-all cursor-pointer"
                  >
                    -
                  </button>
                  <span className="w-10 text-center text-xs font-bold text-gray-900">
                    {qty}
                  </span>
                  <button
                    type="button"
                    onClick={() => setQty((prev) => prev + 1)}
                    className="w-8 h-8 flex items-center justify-center font-bold text-gray-600 hover:text-pink-600 hover:bg-pink-50 rounded-xl transition-all cursor-pointer"
                  >
                    +
                  </button>
                </div>

                <button
                  type="button"
                  onClick={addToCartHandler}
                  className="flex-1 py-3 px-6 rounded-2xl bg-gradient-to-r from-pink-500 to-rose-400 hover:from-pink-600 hover:to-rose-500 text-white font-bold text-xs uppercase tracking-wider shadow-md shadow-pink-200 transition-all transform hover:-translate-y-0.5 active:scale-95 flex items-center justify-center gap-2 cursor-pointer"
                >
                  <FiShoppingBag size={14} />
                  <span>Add To Cart</span>
                </button>
              </div>

              <div className="flex items-center justify-between text-[11px] text-gray-500 pt-2">
                <Link
                  to={`/product/${product._id}`}
                  onClick={onClose}
                  className="font-bold text-pink-600 hover:text-pink-700 hover:underline flex items-center gap-1"
                >
                  <span>View Full Product Page</span>
                  <FiArrowRight size={12} />
                </Link>

                <span className="flex items-center gap-1 text-emerald-600 font-semibold">
                  <FiCheck size={12} /> In Stock & Ready to Ship
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuickViewModal;

