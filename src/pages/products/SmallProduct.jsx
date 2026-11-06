import { Link } from "react-router-dom";
import HeartIcon from "./HeartIcon";
import { getFullImageUrl } from "../../utils/imageUrl";

const SmallProduct = ({ product }) => {
  const imageSrc = getFullImageUrl(product?.image);

  return (
    <div className="bg-white rounded-2xl p-3 border border-pink-100 shadow-xs hover:shadow-md transition-all">
      <div className="relative rounded-xl bg-pink-50/40 p-2 overflow-hidden text-center">
        <Link to={`/product/${product._id}`}>
          <img
            src={imageSrc}
            alt={product.name}
            onError={(e) => {
              e.currentTarget.onerror = null;
              e.currentTarget.src =
                "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&q=80";
            }}
            className="w-full h-36 object-contain mx-auto transition-transform hover:scale-105"
          />
        </Link>
        <HeartIcon product={product} />
      </div>

      <div className="pt-3">
        <Link to={`/product/${product._id}`}>
          <div className="flex items-center justify-between gap-2">
            <h4 className="text-xs font-bold text-gray-900 hover:text-pink-600 transition-colors line-clamp-1">
              {product.name}
            </h4>
            <span className="text-xs font-black text-pink-600 shrink-0">
              ${product.price}
            </span>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default SmallProduct;
