import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import moment from "moment";
import { useAllProductsQuery } from "../../redux/api/productApiSlice";
import AdminMenu from "./AdminMenu";
import Loader from "../../components/Loader";
import Message from "../../components/Message";
import {
  FiEdit,
  FiSearch,
  FiPlus,
  FiPackage,
  FiTag,
  FiCalendar,
} from "react-icons/fi";
import { getFullImageUrl } from "../../utils/imageUrl";

const AllProducts = () => {
  const { data: products = [], isLoading, isError, error } =
    useAllProductsQuery();
  const [searchTerm, setSearchTerm] = useState("");

  const filteredProducts = useMemo(() => {
    if (!Array.isArray(products)) return [];
    if (!searchTerm.trim()) return products;

    const term = searchTerm.toLowerCase();
    return products.filter(
      (p) =>
        p.name?.toLowerCase().includes(term) ||
        p.brand?.toLowerCase().includes(term) ||
        p.category?.name?.toLowerCase().includes(term)
    );
  }, [products, searchTerm]);

  return (
    <div className="min-h-screen bg-[#fffafb]">
      <AdminMenu />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        {/* Header Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight">
              Product Inventory
            </h1>
            <p className="text-xs sm:text-sm text-gray-500 mt-1">
              Manage your complete product catalog, pricing, and live inventory.
            </p>
          </div>

          <Link
            to="/admin/productlist"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-pink-500 to-rose-400 hover:from-pink-600 hover:to-rose-500 text-white text-xs font-bold uppercase tracking-wider shadow-sm shadow-pink-200 transition-all transform hover:-translate-y-0.5 active:scale-95 cursor-pointer self-start sm:self-auto"
          >
            <FiPlus size={14} />
            <span>Add New Product</span>
          </Link>
        </div>

        {/* Filter & Search Bar */}
        <div className="bg-white rounded-2xl p-4 border border-pink-100 shadow-xs mb-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="relative w-full sm:max-w-md">
            <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
              <FiSearch size={16} />
            </span>
            <input
              type="text"
              placeholder="Search products by title, brand, category..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 text-xs text-gray-800 bg-pink-50/20 hover:bg-white focus:bg-white border border-pink-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-300 transition-all shadow-inner"
            />
          </div>

          <span className="text-xs font-bold text-gray-500 whitespace-nowrap">
            Showing <strong>{filteredProducts.length}</strong> of {products.length} products
          </span>
        </div>

        {/* State Handling */}
        {isLoading ? (
          <div className="py-20 flex justify-center">
            <Loader />
          </div>
        ) : isError ? (
          <div className="max-w-xl mx-auto my-8">
            <Message variant="error">
              {error?.data?.message || error?.error || "Error loading products"}
            </Message>
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 text-center border border-pink-100 shadow-sm max-w-lg mx-auto">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-pink-50 border border-pink-100 flex items-center justify-center text-pink-500 text-2xl">
              <FiPackage />
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">
              No products found
            </h3>
            <p className="text-xs text-gray-500 mb-6">
              {searchTerm
                ? "No products matched your search keyword. Try a different query."
                : "You have not published any products yet."}
            </p>
            <Link
              to="/admin/productlist"
              className="px-6 py-2.5 rounded-full bg-gradient-to-r from-pink-500 to-rose-400 hover:from-pink-600 hover:to-rose-500 text-white text-xs font-bold shadow-sm transition-all"
            >
              Add First Product
            </Link>
          </div>
        ) : (
          /* Products Grid */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((product) => {
              const imageSrc = getFullImageUrl(product.image);

              return (
                <div
                  key={product._id}
                  className="bg-white rounded-3xl p-5 border border-pink-100 shadow-sm shadow-pink-100/40 hover:shadow-md transition-all flex flex-col justify-between"
                >
                  <div>
                    {/* Image & Stock Badges */}
                    <div className="relative rounded-2xl bg-gradient-to-b from-pink-50/50 to-white p-3 border border-pink-100/70 overflow-hidden text-center mb-4">
                      <img
                        src={imageSrc}
                        alt={product.name}
                        onError={(e) => {
                          e.currentTarget.onerror = null;
                          e.currentTarget.src =
                            "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&q=80";
                        }}
                        className="w-full h-44 object-contain mx-auto transition-transform hover:scale-105"
                      />

                      {/* Brand badge */}
                      {product.brand && (
                        <span className="absolute bottom-2 left-2 bg-pink-50/90 text-pink-700 border border-pink-200 text-[10px] font-bold px-2 py-0.5 rounded-full shadow-xs">
                          {product.brand}
                        </span>
                      )}

                      {/* Stock badge */}
                      <span
                        className={`absolute top-2 right-2 text-[10px] font-bold px-2.5 py-0.5 rounded-full shadow-xs ${
                          product.countInStock > 0
                            ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                            : "bg-rose-50 text-rose-700 border border-rose-200"
                        }`}
                      >
                        {product.countInStock > 0
                          ? `${product.countInStock} in stock`
                          : "Out of Stock"}
                      </span>
                    </div>

                    {/* Title & Info */}
                    <h3 className="text-base font-bold text-gray-900 line-clamp-1 mb-1">
                      {product.name}
                    </h3>

                    <p className="text-xs text-gray-500 line-clamp-2 leading-relaxed mb-3">
                      {product.description ||
                        "No detailed description provided for this product."}
                    </p>

                    <div className="flex items-center gap-2 text-[11px] text-gray-400 mb-4">
                      <FiCalendar size={12} />
                      <span>
                        Added {moment(product.createdAt).format("MMM DD, YYYY")}
                      </span>
                    </div>
                  </div>

                  {/* Price & Edit Button Row */}
                  <div className="pt-3 border-t border-pink-50 flex items-center justify-between">
                    <div>
                      <span className="text-lg font-black text-pink-600">
                        ${Number(product.price || 0).toFixed(2)}
                      </span>
                    </div>

                    <Link
                      to={`/admin/product/update/${product._id}`}
                      className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-pink-50 hover:bg-pink-100 text-pink-700 text-xs font-bold border border-pink-200 transition-all cursor-pointer shadow-xs"
                    >
                      <FiEdit size={12} />
                      <span>Edit Product</span>
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </main>
    </div>
  );
};

export default AllProducts;
