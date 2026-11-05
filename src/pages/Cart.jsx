import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FaTrash, FaArrowLeft, FaShoppingBag } from "react-icons/fa";
import { addToCart, removeFromCart } from "../redux/features/cart/cartSlice";

const Cart = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);
  const { cartItems = [] } = cart;

  const addToCartHandler = (product, qty) => {
    dispatch(addToCart({ ...product, qty }));
  };

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id));
  };

  const checkoutHandler = () => {
    navigate("/login?redirect=/shipping");
  };

  const totalItems = cartItems.reduce((acc, item) => acc + item.qty, 0);
  const totalPrice = cartItems
    .reduce((acc, item) => acc + item.qty * item.price, 0)
    .toFixed(2);

  return (
    <div className="min-h-screen bg-[#fffafb] py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-6">
          <Link
            to="/shop"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white hover:bg-pink-50 text-gray-700 hover:text-pink-600 font-bold text-xs border border-pink-200 shadow-xs transition-all"
          >
            <FaArrowLeft size={11} />
            <span>Continue Shopping</span>
          </Link>
        </div>

        {cartItems.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 text-center border border-pink-100 shadow-sm max-w-lg mx-auto my-12">
            <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-pink-50 border border-pink-100 flex items-center justify-center text-pink-500 text-3xl">
              <FaShoppingBag />
            </div>
            <h2 className="text-2xl font-black text-gray-900 mb-2">
              Your bag is empty
            </h2>
            <p className="text-sm text-gray-500 mb-6 leading-relaxed">
              Looks like you haven't added anything to your cart yet. Explore our curated collections to find something you love.
            </p>
            <Link
              to="/shop"
              className="inline-block px-8 py-3.5 rounded-full bg-gradient-to-r from-pink-500 to-rose-400 hover:from-pink-600 hover:to-rose-500 text-white text-xs font-bold uppercase tracking-wider shadow-sm shadow-pink-200 transition-all transform hover:-translate-y-0.5"
            >
              Start Shopping
            </Link>
          </div>
        ) : (
          <div>
            <div className="flex items-center justify-between mb-8">
              <div>
                <h1 className="text-2xl sm:text-3xl font-black text-gray-900">
                  Shopping Cart
                </h1>
                <p className="text-xs sm:text-sm text-gray-500 mt-1">
                  You have {totalItems} item(s) in your bag.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
              {/* Cart Items List */}
              <div className="lg:col-span-2 space-y-4">
                {cartItems.map((item) => {
                  const imageSrc = item.image
                    ? item.image.replace(/\\/g, "/")
                    : "/hero-podium-bg.jpg";
                  return (
                    <div
                      key={item._id}
                      className="bg-white rounded-3xl p-4 sm:p-5 border border-pink-100 shadow-xs flex flex-col sm:flex-row items-center gap-4 transition-all hover:shadow-md"
                    >
                      {/* Product Thumbnail */}
                      <div className="w-20 h-20 rounded-2xl bg-pink-50/50 p-2 border border-pink-100 shrink-0 flex items-center justify-center">
                        <img
                          src={imageSrc}
                          alt={item.name}
                          onError={(e) => {
                            e.currentTarget.onerror = null;
                            e.currentTarget.src =
                              "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&q=80";
                          }}
                          className="max-h-full max-w-full object-contain"
                        />
                      </div>

                      {/* Product Info */}
                      <div className="flex-1 text-center sm:text-left">
                        <Link
                          to={`/product/${item._id}`}
                          className="text-sm font-bold text-gray-900 hover:text-pink-600 transition-colors line-clamp-1"
                        >
                          {item.name}
                        </Link>
                        {item.brand && (
                          <div className="text-[11px] font-semibold text-pink-500 mt-0.5">
                            {item.brand}
                          </div>
                        )}
                        <div className="text-sm font-black text-pink-600 mt-1">
                          ${item.price}
                        </div>
                      </div>

                      {/* Quantity Selector */}
                      <div className="flex items-center gap-2">
                        <label
                          htmlFor={`qty-${item._id}`}
                          className="text-xs font-bold text-gray-600"
                        >
                          Qty:
                        </label>
                        <select
                          id={`qty-${item._id}`}
                          className="p-2 border border-pink-200 rounded-xl bg-white text-gray-800 text-xs font-bold focus:ring-2 focus:ring-pink-400 outline-none cursor-pointer"
                          value={item.qty}
                          onChange={(e) =>
                            addToCartHandler(item, Number(e.target.value))
                          }
                        >
                          {[...Array(Math.min(item.countInStock || 10, 10)).keys()].map(
                            (x) => (
                              <option key={x + 1} value={x + 1}>
                                {x + 1}
                              </option>
                            )
                          )}
                        </select>
                      </div>

                      {/* Remove Button */}
                      <button
                        className="p-2.5 rounded-full text-rose-500 hover:text-rose-700 hover:bg-rose-50 transition-all cursor-pointer"
                        onClick={() => removeFromCartHandler(item._id)}
                        title="Remove item"
                        aria-label="Remove item"
                      >
                        <FaTrash size={14} />
                      </button>
                    </div>
                  );
                })}
              </div>

              {/* Order Summary Box */}
              <div className="bg-white rounded-3xl p-6 border border-pink-100 shadow-sm sticky top-24">
                <h2 className="text-lg font-black text-gray-900 pb-3 border-b border-pink-100">
                  Order Summary
                </h2>

                <div className="space-y-3 my-4 text-xs font-medium text-gray-600">
                  <div className="flex justify-between">
                    <span>Subtotal ({totalItems} items)</span>
                    <span className="font-bold text-gray-900">${totalPrice}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Shipping</span>
                    <span className="font-bold text-emerald-600">FREE</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Estimated Tax</span>
                    <span className="font-bold text-gray-900">$0.00</span>
                  </div>
                </div>

                <div className="pt-3 border-t border-pink-100 mb-6 flex justify-between items-center">
                  <span className="text-sm font-bold text-gray-900">Total</span>
                  <span className="text-2xl font-black text-pink-600">
                    ${totalPrice}
                  </span>
                </div>

                <button
                  className="w-full py-3.5 rounded-full bg-gradient-to-r from-pink-500 to-rose-400 hover:from-pink-600 hover:to-rose-500 text-white text-xs font-bold uppercase tracking-wider shadow-sm shadow-pink-200 transition-all transform hover:-translate-y-0.5 cursor-pointer active:scale-95"
                  disabled={cartItems.length === 0}
                  onClick={checkoutHandler}
                >
                  Proceed To Checkout
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
