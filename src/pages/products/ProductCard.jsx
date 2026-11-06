import { Link } from "react-router-dom";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/features/cart/cartSlice";
import { toast } from "react-toastify";
import HeartIcon from "./HeartIcon";
import { getFullImageUrl } from "../../utils/imageUrl";

const ProductCard = ({ p }) => {
  const dispatch = useDispatch();

  const addToCartHandler = (product, qty = 1) => {
    dispatch(addToCart({ ...product, qty }));
    toast.success("Added to cart!", {
      position: "top-right",
      autoClose: 2000,
    });
  };

  if (!p) return null;

  const imageSrc = getFullImageUrl(p.image);

  return (
    <div className="w-full max-w-[280px] bg-white rounded-3xl p-4 border border-pink-100 shadow-sm shadow-pink-100/50 hover:shadow-xl hover:shadow-pink-200/50 hover:border-pink-200 transition-all duration-300 relative group flex flex-col justify-between">
      {/* Product Image Frame */}
      <div className="relative rounded-2xl bg-gradient-to-b from-pink-50/50 to-white p-3 overflow-hidden text-center">
        {p.brand && (
          <span className="absolute bottom-2 left-2 z-10 bg-pink-50 text-pink-700 border border-pink-200/80 text-[10px] font-bold px-2.5 py-0.5 rounded-full shadow-xs">
            {p.brand}
          </span>
        )}

        <Link to={`/product/${p._id}`}>
          <img
            src={imageSrc}
            alt={p.name}
            onError={(e) => {
              e.currentTarget.onerror = null;
              e.currentTarget.src =
                "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&q=80";
            }}
            className="w-full h-48 object-contain mx-auto transition-transform duration-300 group-hover:scale-105"
          />
        </Link>

        <HeartIcon product={p} />
      </div>

      {/* Details & Actions */}
      <div className="pt-4 flex flex-col flex-1 justify-between">
        <div>
          <Link to={`/product/${p._id}`}>
            <h3 className="text-base font-bold text-gray-900 group-hover:text-pink-600 transition-colors line-clamp-1">
              {p.name}
            </h3>
          </Link>

          <p className="text-xs text-gray-500 line-clamp-2 mt-1 leading-relaxed">
            {p.description || "Discover premium quality and exceptional everyday value."}
          </p>
        </div>

        <div className="flex items-center justify-between mt-4 pt-3 border-t border-pink-50">
          <span className="text-xl font-black text-pink-600">
            ${p.price}
          </span>

          <div className="flex items-center gap-1.5">
            <Link
              to={`/product/${p._id}`}
              className="px-3 py-1.5 rounded-full bg-pink-50 hover:bg-pink-100 text-pink-700 text-xs font-bold transition-all"
            >
              Details
            </Link>

            <button
              onClick={() => addToCartHandler(p, 1)}
              className="p-2 rounded-full bg-gradient-to-r from-pink-500 to-rose-400 hover:from-pink-600 hover:to-rose-500 text-white shadow-xs shadow-pink-200 hover:shadow-md transition-all cursor-pointer transform active:scale-95"
              title="Add to cart"
              aria-label="Add to cart"
            >
              <AiOutlineShoppingCart size={17} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
