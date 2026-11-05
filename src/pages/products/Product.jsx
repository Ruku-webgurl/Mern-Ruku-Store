import { Link } from "react-router-dom";
import HeartIcon from "./HeartIcon";

const Product = ({ product }) => {
  return (
    <div className="w-72 sm:w-80 bg-white rounded-3xl p-4 border border-pink-100 shadow-md shadow-pink-100/40 hover:shadow-xl hover:shadow-pink-200/50 transition-all duration-300 relative group flex flex-col justify-between">
      <div className="relative rounded-2xl bg-gradient-to-b from-pink-50/50 to-white p-3 overflow-hidden text-center">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-52 object-contain mx-auto transition-transform duration-300 group-hover:scale-105"
        />
        <HeartIcon product={product} />
      </div>

      <div className="pt-4 flex flex-col flex-1 justify-between">
        <Link to={`/product/${product._id}`}>
          <h2 className="text-base font-bold text-gray-900 group-hover:text-pink-600 transition-colors line-clamp-1">
            {product.name}
          </h2>
        </Link>

        {product.brand && (
          <span className="text-[11px] font-semibold text-pink-500 uppercase tracking-wider mt-1">
            {product.brand}
          </span>
        )}

        <div className="flex justify-between items-center mt-3 pt-3 border-t border-pink-50">
          <span className="text-xl font-black text-pink-600">
            ${product.price}
          </span>

          <Link
            to={`/product/${product._id}`}
            className="px-4 py-1.5 rounded-full bg-pink-50 hover:bg-pink-500 text-pink-600 hover:text-white text-xs font-bold transition-all duration-200 shadow-sm"
          >
            View
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Product;
