import { useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useGetFilteredProductsQuery } from "../redux/api/productApiSlice";
import { useFetchCategoriesQuery } from "../redux/api/categoryApiSlice";
import {
  setCategories,
  setProducts,
  setChecked,
  setRadio,
} from "../redux/features/shop/shopSlice";
import Loader from "../components/Loader";
import Message from "../components/Message";
import ProductCard from "./products/ProductCard";
import {
  FiFilter,
  FiRefreshCw,
  FiGrid,
  FiTag,
  FiDollarSign,
  FiX,
  FiSliders,
} from "react-icons/fi";
import { HiSparkles } from "react-icons/hi2";

const Shop = () => {
  const dispatch = useDispatch();
  const { categories, products, checked, radio } = useSelector(
    (state) => state.shop
  );

  const categoriesQuery = useFetchCategoriesQuery();
  const [priceFilter, setPriceFilter] = useState("");
  const [selectedBrand, setSelectedBrand] = useState("");
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  // Fetch filtered products based on checked categories and radio price from Redux
  const filteredProductsQuery = useGetFilteredProductsQuery({
    checked,
    radio,
  });

  // Sync categories into Redux store safely
  useEffect(() => {
    if (
      !categoriesQuery.isLoading &&
      categoriesQuery.data &&
      Array.isArray(categoriesQuery.data)
    ) {
      dispatch(setCategories(categoriesQuery.data));
    }
  }, [categoriesQuery.data, categoriesQuery.isLoading, dispatch]);

  // Extract unique brands safely from data
  const uniqueBrands = useMemo(() => {
    const rawData = filteredProductsQuery.data;
    if (!Array.isArray(rawData)) return [];
    const brandsSet = new Set(
      rawData
        .map((p) => p.brand)
        .filter((b) => b && typeof b === "string" && b.trim() !== "")
    );
    return Array.from(brandsSet);
  }, [filteredProductsQuery.data]);

  // Client-side filtering for brand and price input
  useEffect(() => {
    const rawData = filteredProductsQuery.data;
    if (!Array.isArray(rawData)) {
      dispatch(setProducts([]));
      return;
    }

    let result = [...rawData];

    // Filter by Brand
    if (selectedBrand) {
      result = result.filter((p) => p.brand === selectedBrand);
    }

    // Filter by Price Input
    if (priceFilter.trim() !== "") {
      const numericPrice = Number(priceFilter);
      if (!isNaN(numericPrice) && numericPrice > 0) {
        result = result.filter(
          (p) => Number(p.price) <= numericPrice || p.price?.toString().includes(priceFilter)
        );
      } else {
        result = result.filter((p) =>
          p.price?.toString().includes(priceFilter)
        );
      }
    }

    dispatch(setProducts(result));
  }, [filteredProductsQuery.data, selectedBrand, priceFilter, dispatch]);

  // Toggle category checkboxes safely
  const handleCheck = (isChecked, categoryId) => {
    const currentChecked = Array.isArray(checked) ? checked : [];
    const updatedChecked = isChecked
      ? [...currentChecked, categoryId]
      : currentChecked.filter((id) => id !== categoryId);
    dispatch(setChecked(updatedChecked));
  };

  // Handle brand selection
  const handleBrandSelect = (brand) => {
    setSelectedBrand((prev) => (prev === brand ? "" : brand));
  };

  // Reset all filters safely without full page reload
  const handleResetFilters = () => {
    dispatch(setChecked([]));
    dispatch(setRadio([]));
    setSelectedBrand("");
    setPriceFilter("");
  };

  // Quick price presets
  const handlePricePreset = (maxPrice) => {
    setPriceFilter(maxPrice.toString());
  };

  const activeCategoryObjects = useMemo(() => {
    if (!Array.isArray(categories) || !Array.isArray(checked)) return [];
    return categories.filter((c) => checked.includes(c._id));
  }, [categories, checked]);

  const hasActiveFilters =
    (checked && checked.length > 0) ||
    Boolean(selectedBrand) ||
    Boolean(priceFilter.trim());

  return (
    <div className="min-h-screen bg-[#fffafb] py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Page Banner / Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-pink-50 border border-pink-200/80 text-pink-600 text-xs font-bold tracking-wider uppercase mb-3 shadow-xs">
           
            <span>Curated Catalog</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-gray-900 tracking-tight">
            Explore All <span className="text-pink-600">Products</span>
          </h1>
          <p className="mt-2 text-sm sm:text-base text-gray-600 max-w-xl mx-auto">
            Discover handpicked collections crafted with premium quality, comfort, and everyday elegance.
          </p>
        </div>

        {/* Mobile Filter Toggle Button */}
        <div className="lg:hidden mb-6 flex justify-between items-center bg-white p-4 rounded-2xl border border-pink-100 shadow-sm">
          <span className="text-sm font-bold text-gray-800">
            {products?.length || 0} product(s) found
          </span>
          <button
            onClick={() => setMobileFilterOpen(!mobileFilterOpen)}
            className="flex items-center gap-2 px-4 py-2 bg-pink-50 hover:bg-pink-100 text-pink-700 font-bold text-xs rounded-full border border-pink-200 transition-all cursor-pointer"
          >
            <FiSliders size={14} />
            <span>{mobileFilterOpen ? "Hide Filters" : "Filter Catalog"}</span>
            {hasActiveFilters && (
              <span className="w-2 h-2 rounded-full bg-pink-500"></span>
            )}
          </button>
        </div>

        {/* Main Content Layout */}
        <div className="flex flex-col lg:flex-row gap-8 items-start">
          {/* Sidebar Filters */}
          <aside
            className={`${
              mobileFilterOpen ? "block" : "hidden"
            } lg:block w-full lg:w-72 xl:w-80 shrink-0 bg-white/95 backdrop-blur-md rounded-3xl p-6 border border-pink-100 shadow-sm shadow-pink-100/50 lg:sticky lg:top-24 transition-all`}
          >
            {/* Sidebar Title & Reset Header */}
            <div className="flex items-center justify-between pb-4 border-b border-pink-100 mb-6">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-xl bg-pink-50 text-pink-600 border border-pink-100">
                  <FiFilter size={18} />
                </div>
                <h2 className="text-lg font-black text-gray-900">Filters</h2>
              </div>

              {hasActiveFilters && (
                <button
                  onClick={handleResetFilters}
                  className="text-xs font-bold text-pink-600 hover:text-pink-700 hover:underline flex items-center gap-1 cursor-pointer"
                >
                  <FiRefreshCw size={12} />
                  <span>Reset All</span>
                </button>
              )}
            </div>

            {/* Filter Group: Categories */}
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-3">
                <FiGrid className="text-pink-500" size={15} />
                <h3 className="text-xs font-extrabold text-gray-700 uppercase tracking-wider">
                  Filter by Category
                </h3>
              </div>

              <div className="space-y-2 max-h-56 overflow-y-auto pr-1 soft-pink-scrollbar">
                {categoriesQuery.isLoading ? (
                  <div className="py-2 text-xs text-gray-400">Loading categories...</div>
                ) : Array.isArray(categories) && categories.length > 0 ? (
                  categories.map((c) => {
                    const isChecked = checked?.includes(c._id);
                    return (
                      <label
                        key={c._id}
                        className={`flex items-center justify-between p-2 rounded-xl cursor-pointer text-xs font-medium transition-all ${
                          isChecked
                            ? "bg-pink-50/80 text-pink-700 font-bold border border-pink-200/80"
                            : "hover:bg-pink-50/40 text-gray-700"
                        }`}
                      >
                        <div className="flex items-center gap-2.5">
                          <input
                            type="checkbox"
                            checked={Boolean(isChecked)}
                            onChange={(e) => handleCheck(e.target.checked, c._id)}
                            className="w-4 h-4 rounded text-pink-600 focus:ring-pink-400 border-gray-300 accent-pink-500 cursor-pointer"
                          />
                          <span className="capitalize">{c.name}</span>
                        </div>
                      </label>
                    );
                  })
                ) : (
                  <p className="text-xs text-gray-400">No categories found</p>
                )}
              </div>
            </div>

            {/* Filter Group: Brands */}
            <div className="mb-6 pt-5 border-t border-pink-50">
              <div className="flex items-center gap-2 mb-3">
                <FiTag className="text-pink-500" size={15} />
                <h3 className="text-xs font-extrabold text-gray-700 uppercase tracking-wider">
                  Filter by Brand
                </h3>
              </div>

              <div className="space-y-1.5 max-h-48 overflow-y-auto pr-1 soft-pink-scrollbar">
                {/* All Brands Option */}
                <label
                  className={`flex items-center gap-2.5 p-2 rounded-xl cursor-pointer text-xs font-medium transition-all ${
                    !selectedBrand
                      ? "bg-pink-50/80 text-pink-700 font-bold border border-pink-200/80"
                      : "hover:bg-pink-50/40 text-gray-700"
                  }`}
                >
                  <input
                    type="radio"
                    name="shopBrand"
                    checked={!selectedBrand}
                    onChange={() => setSelectedBrand("")}
                    className="w-4 h-4 text-pink-600 focus:ring-pink-400 accent-pink-500 cursor-pointer"
                  />
                  <span>All Brands</span>
                </label>

                {uniqueBrands.map((brand) => {
                  const isSelected = selectedBrand === brand;
                  return (
                    <label
                      key={brand}
                      className={`flex items-center gap-2.5 p-2 rounded-xl cursor-pointer text-xs font-medium transition-all ${
                        isSelected
                          ? "bg-pink-50/80 text-pink-700 font-bold border border-pink-200/80"
                          : "hover:bg-pink-50/40 text-gray-700"
                      }`}
                    >
                      <input
                        type="radio"
                        name="shopBrand"
                        checked={isSelected}
                        onChange={() => handleBrandSelect(brand)}
                        className="w-4 h-4 text-pink-600 focus:ring-pink-400 accent-pink-500 cursor-pointer"
                      />
                      <span>{brand}</span>
                    </label>
                  );
                })}
              </div>
            </div>

            {/* Filter Group: Price */}
            <div className="mb-6 pt-5 border-t border-pink-50">
              <div className="flex items-center gap-2 mb-3">
                <FiDollarSign className="text-pink-500" size={15} />
                <h3 className="text-xs font-extrabold text-gray-700 uppercase tracking-wider">
                  Filter by Price
                </h3>
              </div>

              {/* Price Preset Pills */}
              <div className="flex flex-wrap gap-1.5 mb-3">
                {[50, 150, 500, 1500].map((amount) => (
                  <button
                    key={amount}
                    type="button"
                    onClick={() => handlePricePreset(amount)}
                    className={`px-2.5 py-1 rounded-full text-[11px] font-bold border transition-all cursor-pointer ${
                      priceFilter === amount.toString()
                        ? "bg-pink-500 text-white border-pink-500 shadow-xs"
                        : "bg-pink-50/60 hover:bg-pink-100 text-pink-700 border-pink-200"
                    }`}
                  >
                    ≤ ${amount}
                  </button>
                ))}
              </div>

              {/* Custom Price Input */}
              <div className="relative">
                <span className="absolute left-3 top-2.5 text-gray-400 font-bold text-xs">$</span>
                <input
                  type="text"
                  placeholder="Enter max price..."
                  value={priceFilter}
                  onChange={(e) => setPriceFilter(e.target.value)}
                  className="w-full pl-7 pr-8 py-2 text-xs text-gray-800 bg-pink-50/30 hover:bg-white focus:bg-white border border-pink-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-300 focus:border-pink-400 transition-all shadow-inner"
                />
                {priceFilter && (
                  <button
                    onClick={() => setPriceFilter("")}
                    className="absolute right-2.5 top-2.5 text-gray-400 hover:text-pink-600"
                  >
                    <FiX size={14} />
                  </button>
                )}
              </div>
            </div>

            {/* Clear All Filters Action Button */}
            <button
              onClick={handleResetFilters}
              disabled={!hasActiveFilters}
              className={`w-full py-3 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-200 flex items-center justify-center gap-2 shadow-sm ${
                hasActiveFilters
                  ? "bg-gradient-to-r from-pink-500 to-rose-400 hover:from-pink-600 hover:to-rose-500 text-white shadow-pink-200 cursor-pointer transform hover:-translate-y-0.5 active:scale-95"
                  : "bg-gray-100 text-gray-400 cursor-not-allowed"
              }`}
            >
              <FiRefreshCw size={14} />
              <span>Reset All Filters</span>
            </button>
          </aside>

          {/* Products Content Area */}
          <main className="flex-1 w-full">
            {/* Header info & Active Filter Chips Bar */}
            <div className="bg-white/90 backdrop-blur-md rounded-2xl p-4 sm:p-5 border border-pink-100 shadow-xs mb-6 flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <span className="text-sm sm:text-base font-black text-gray-900">
                  Showing Products
                </span>
                <span className="px-2.5 py-0.5 rounded-full bg-pink-50 text-pink-700 text-xs font-extrabold border border-pink-200">
                  {products?.length || 0}
                </span>
              </div>

              {/* Active Filter Chips */}
              {hasActiveFilters && (
                <div className="flex flex-wrap items-center gap-1.5">
                  {activeCategoryObjects.map((c) => (
                    <span
                      key={c._id}
                      className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-pink-100 text-pink-800 text-xs font-semibold"
                    >
                      <span>Category: {c.name}</span>
                      <button
                        onClick={() => handleCheck(false, c._id)}
                        className="hover:text-pink-950 cursor-pointer"
                      >
                        <FiX size={12} />
                      </button>
                    </span>
                  ))}

                  {selectedBrand && (
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-pink-100 text-pink-800 text-xs font-semibold">
                      <span>Brand: {selectedBrand}</span>
                      <button
                        onClick={() => setSelectedBrand("")}
                        className="hover:text-pink-950 cursor-pointer"
                      >
                        <FiX size={12} />
                      </button>
                    </span>
                  )}

                  {priceFilter && (
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-pink-100 text-pink-800 text-xs font-semibold">
                      <span>Max: ${priceFilter}</span>
                      <button
                        onClick={() => setPriceFilter("")}
                        className="hover:text-pink-950 cursor-pointer"
                      >
                        <FiX size={12} />
                      </button>
                    </span>
                  )}

                  <button
                    onClick={handleResetFilters}
                    className="text-[11px] font-bold text-pink-600 hover:text-pink-700 underline ml-1 cursor-pointer"
                  >
                    Clear all
                  </button>
                </div>
              )}
            </div>

            {/* Products State Display */}
            {filteredProductsQuery.isLoading ? (
              <div className="py-20 flex flex-col items-center justify-center">
                <Loader />
                <p className="text-sm font-medium text-gray-500 mt-4">
                  Loading collections...
                </p>
              </div>
            ) : filteredProductsQuery.isError ? (
              <div className="max-w-md mx-auto my-12">
                <Message variant="error">
                  {filteredProductsQuery.error?.data?.message ||
                    filteredProductsQuery.error?.error ||
                    "Could not load products. Please check server connection."}
                </Message>
                <div className="text-center mt-4">
                  <button
                    onClick={() => filteredProductsQuery.refetch()}
                    className="px-5 py-2 rounded-full bg-pink-500 hover:bg-pink-600 text-white text-xs font-bold shadow-sm transition-all cursor-pointer"
                  >
                    Try Again
                  </button>
                </div>
              </div>
            ) : !products || products.length === 0 ? (
              <div className="bg-white rounded-3xl p-12 text-center border border-pink-100 shadow-sm max-w-lg mx-auto my-8">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-pink-50 border border-pink-100 flex items-center justify-center text-pink-500 text-2xl">
                  🛍️
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  No products found
                </h3>
                <p className="text-sm text-gray-500 mb-6 leading-relaxed">
                  We couldn't find any products matching your selected filters. Try broadening your criteria or resetting filters.
                </p>
                <button
                  onClick={handleResetFilters}
                  className="px-6 py-2.5 rounded-full bg-gradient-to-r from-pink-500 to-rose-400 hover:from-pink-600 hover:to-rose-500 text-white text-xs font-bold uppercase tracking-wider shadow-sm shadow-pink-200 transition-all cursor-pointer"
                >
                  Clear All Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6 justify-items-center">
                {products.map((p) => (
                  <ProductCard key={p._id} p={p} />
                ))}
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};

export default Shop;
