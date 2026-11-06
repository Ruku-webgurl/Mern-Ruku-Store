import { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  useGetProductDetailsQuery,
  useCreateReviewMutation,
} from "../../redux/api/productApiSlice";
import Loader from "../../components/Loader";
import Message from "../../components/Message";
import {
  FaBox,
  FaClock,
  FaShoppingCart,
  FaStar,
  FaStore,
  FaArrowLeft,
} from "react-icons/fa";
import moment from "moment";
import HeartIcon from "./HeartIcon";
import Ratings from "./Ratings";
import ProductTabs from "./ProductTabs";
import { addToCart } from "../../redux/features/cart/cartSlice";
import { getFullImageUrl } from "../../utils/imageUrl";

const ProductDetails = () => {
  const { id: productId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [qty, setQty] = useState(1);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const {
    data: product,
    isLoading,
    refetch,
    error,
  } = useGetProductDetailsQuery(productId);

  const { userInfo } = useSelector((state) => state.auth);

  const [createReview, { isLoading: loadingProductReview }] =
    useCreateReviewMutation();

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      await createReview({
        productId,
        rating,
        comment,
      }).unwrap();
      refetch();
      toast.success("Review created successfully", { position: "top-right" });
      setRating(0);
      setComment("");
    } catch (err) {
      toast.error(err?.data?.message || err?.error || "Failed to submit review", {
        position: "top-right",
      });
    }
  };

  const addToCartHandler = () => {
    dispatch(addToCart({ ...product, qty: Number(qty) }));
    toast.success("Added to cart!", { position: "top-right", autoClose: 2000 });
    navigate("/cart");
  };

  const imageSrc = getFullImageUrl(product?.image);

  return (
    <div className="min-h-screen bg-[#fffafb] py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Navigation Breadcrumb / Go Back */}
        <div className="mb-6">
          <Link
            to="/shop"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white hover:bg-pink-50 text-gray-700 hover:text-pink-600 font-bold text-xs border border-pink-200 shadow-xs transition-all"
          >
            <FaArrowLeft size={11} />
            <span>Back to Shop</span>
          </Link>
        </div>

        {isLoading ? (
          <div className="py-20 flex justify-center">
            <Loader />
          </div>
        ) : error ? (
          <div className="max-w-lg mx-auto my-12">
            <Message variant="error">
              {error?.data?.message || error?.error || "Failed to load product details."}
            </Message>
          </div>
        ) : product ? (
          <>
            {/* Product Card Container */}
            <div className="bg-white rounded-3xl p-6 sm:p-10 border border-pink-100 shadow-sm shadow-pink-100/50 mb-12">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
                {/* Product Image Frame */}
                <div className="relative rounded-2xl bg-gradient-to-b from-pink-50/50 to-white p-6 border border-pink-100/80 flex items-center justify-center min-h-[350px]">
                  <img
                    src={imageSrc}
                    alt={product.name}
                    onError={(e) => {
                      e.currentTarget.onerror = null;
                      e.currentTarget.src =
                        "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&q=80";
                    }}
                    className="max-h-96 w-auto object-contain mx-auto transition-transform duration-300 hover:scale-105"
                  />
                  <HeartIcon product={product} />
                </div>

                {/* Product Meta & Purchase Info */}
                <div className="flex flex-col justify-between">
                  <div>
                    {product.brand && (
                      <span className="inline-block px-3 py-1 rounded-full bg-pink-50 text-pink-700 border border-pink-200 text-xs font-bold uppercase tracking-wider mb-3">
                        {product.brand}
                      </span>
                    )}

                    <h1 className="text-2xl sm:text-3xl font-black text-gray-900 leading-snug">
                      {product.name}
                    </h1>

                    <div className="flex items-center gap-4 mt-3">
                      <Ratings
                        value={product.rating || 0}
                        text={`${product.numReviews || 0} reviews`}
                      />
                      <span
                        className={`text-xs font-bold px-2.5 py-0.5 rounded-full ${
                          product.countInStock > 0
                            ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                            : "bg-rose-50 text-rose-700 border border-rose-200"
                        }`}
                      >
                        {product.countInStock > 0 ? "In Stock" : "Out of Stock"}
                      </span>
                    </div>

                    <div className="mt-5">
                      <span className="text-3xl sm:text-4xl font-black text-pink-600">
                        ${product.price}
                      </span>
                    </div>

                    <p className="mt-4 text-sm text-gray-600 leading-relaxed">
                      {product.description ||
                        "Experience high-end design, crafted for unmatched longevity and everyday refinement."}
                    </p>
                  </div>

                  {/* Micro Specs List */}
                  <div className="grid grid-cols-2 gap-3 my-6 p-4 rounded-2xl bg-pink-50/40 border border-pink-100 text-xs font-medium text-gray-700">
                    <div className="flex items-center gap-2">
                      <FaStore className="text-pink-500 shrink-0" />
                      <span>
                        Brand: <strong>{product.brand}</strong>
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <FaClock className="text-pink-500 shrink-0" />
                      <span>
                        Added:{" "}
                        <strong>{moment(product.createdAt).fromNow()}</strong>
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <FaShoppingCart className="text-pink-500 shrink-0" />
                      <span>
                        Available: <strong>{product.countInStock}</strong>
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <FaBox className="text-pink-500 shrink-0" />
                      <span>
                        Quantity: <strong>{product.quantity || 1}</strong>
                      </span>
                    </div>
                  </div>

                  {/* Quantity & Add to Cart Controls */}
                  <div className="flex flex-wrap items-center gap-4">
                    {product.countInStock > 0 && (
                      <div className="flex items-center gap-2">
                        <label
                          htmlFor="qty-select"
                          className="text-xs font-bold text-gray-700"
                        >
                          Qty:
                        </label>
                        <select
                          id="qty-select"
                          value={qty}
                          onChange={(e) => setQty(Number(e.target.value))}
                          className="p-2.5 rounded-xl border border-pink-200 bg-white text-gray-800 text-sm font-bold focus:ring-2 focus:ring-pink-400 outline-none cursor-pointer"
                        >
                          {[...Array(Math.min(product.countInStock, 10)).keys()].map(
                            (x) => (
                              <option key={x + 1} value={x + 1}>
                                {x + 1}
                              </option>
                            )
                          )}
                        </select>
                      </div>
                    )}

                    <button
                      onClick={addToCartHandler}
                      disabled={product.countInStock === 0}
                      className={`flex-1 py-3.5 px-8 rounded-full font-bold text-xs uppercase tracking-wider transition-all duration-200 flex items-center justify-center gap-2 shadow-sm ${
                        product.countInStock > 0
                          ? "bg-gradient-to-r from-pink-500 to-rose-400 hover:from-pink-600 hover:to-rose-500 text-white shadow-pink-200 cursor-pointer transform hover:-translate-y-0.5 active:scale-95"
                          : "bg-gray-100 text-gray-400 cursor-not-allowed"
                      }`}
                    >
                      <FaShoppingCart size={14} />
                      <span>
                        {product.countInStock > 0
                          ? "Add To Cart"
                          : "Out of Stock"}
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Product Tabs (Reviews & Related) */}
            <div className="bg-white rounded-3xl p-6 sm:p-10 border border-pink-100 shadow-sm">
              <ProductTabs
                loadingProductReview={loadingProductReview}
                userInfo={userInfo}
                submitHandler={submitHandler}
                rating={rating}
                setRating={setRating}
                comment={comment}
                setComment={setComment}
                product={product}
              />
            </div>
          </>
        ) : null}
      </div>
    </div>
  );
};

export default ProductDetails;
