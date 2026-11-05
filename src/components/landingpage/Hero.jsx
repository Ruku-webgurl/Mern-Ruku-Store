import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useGetTopProductsQuery } from "../../redux/api/productApiSlice";
import {
  addToFavorites,
  removeFromFavorites,
} from "../../redux/features/favorites/favoriteSlice";
import {
  addFavoriteToLocalStorage,
  removeFavoriteFromLocalStorage,
} from "../../utils/localStorage";
import {
  FiArrowRight,
  FiTruck,
  FiRefreshCw,
  FiShield,
  FiChevronLeft,
  FiChevronRight,
  FiStar,
} from "react-icons/fi";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { HiSparkles } from "react-icons/hi2";

const Hero = () => {
  // Top products from RTK Query
  const { data: topProducts = [], isLoading } = useGetTopProductsQuery();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const dispatch = useDispatch();
  const favorites = useSelector((state) => state.favorites) || [];

  const productsList = Array.isArray(topProducts) ? topProducts : [];
  const hasProducts = productsList.length > 0;
  const activeProduct = hasProducts ? productsList[currentSlide % productsList.length] : null;

  const totalSlides = hasProducts ? Math.min(productsList.length, 4) : 1;

  // Auto-play the featured product cycle every 5 seconds
  useEffect(() => {
    if (isPaused || totalSlides <= 1) return;

    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % totalSlides);
    }, 5000);

    return () => clearInterval(timer);
  }, [isPaused, totalSlides]);

  const handlePrev = () => {
    setCurrentSlide((prev) => (prev === 0 ? totalSlides - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
  };

  const isFavorite = activeProduct
    ? favorites.some((p) => p._id === activeProduct._id)
    : false;

  const toggleFavorite = (product) => {
    if (!product) return;
    if (isFavorite) {
      dispatch(removeFromFavorites(product));
      removeFavoriteFromLocalStorage(product._id);
    } else {
      dispatch(addToFavorites(product));
      addFavoriteToLocalStorage(product);
    }
  };

  return (
    <section
      className="relative rounded-2xl lg:rounded-3xl p-6 sm:p-10 lg:p-14 overflow-hidden my-4 sm:my-6 transition-all min-h-[580px] lg:min-h-[620px] flex items-center shadow-lg shadow-pink-100/40"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* ================= HERO BACKGROUND: 3D PINK PODIUM & BALLOONS ================= */}
      {/* Set z-0 so it renders on top of the section base and is 100% visible */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <img
          src="/hero-podium-bg.jpg"
          alt="Ruku Store Pink Podium Background"
          className="w-full h-full object-cover object-bottom sm:object-center transition-transform duration-1000 ease-out"
        />
        {/* Soft left-gradient wash overlay: keeps text readable while letting the full 3D podium stage & colorful balloons shine through */}
        <div className="absolute inset-0 bg-gradient-to-r from-white/70 via-white/30 to-transparent pointer-events-none" />
      </div>

      {/* Floating Left Arrow */}
      {totalSlides > 1 && (
        <button
          onClick={handlePrev}
          className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white/95 hover:bg-pink-500 hover:text-white text-gray-700 shadow-md flex items-center justify-center transition-all z-20 cursor-pointer border border-pink-100"
          aria-label="Previous slide"
        >
          <FiChevronLeft size={18} />
        </button>
      )}

      {/* Floating Right Arrow */}
      {totalSlides > 1 && (
        <button
          onClick={handleNext}
          className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white/95 hover:bg-pink-500 hover:text-white text-gray-700 shadow-md flex items-center justify-center transition-all z-20 cursor-pointer border border-pink-100"
          aria-label="Next slide"
        >
          <FiChevronRight size={18} />
        </button>
      )}

      {/* ================= MAIN TWO-COLUMN LAYOUT ================= */}
      <div className="relative z-10 w-full max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-12 px-2 sm:px-6">
        
        {/* ================= LEFT COLUMN: HEADLINE, SCRIPT & CTAs ================= */}
        <div className="w-full lg:w-6/12 flex flex-col items-start text-left bg-white/85 backdrop-blur-md p-6 sm:p-8 lg:p-10 rounded-2xl sm:rounded-3xl border border-white/90 shadow-xl shadow-pink-500/10">
          
          {/* Eyebrow / Pill Badge */}
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-pink-50 border border-pink-200 text-pink-700 text-xs font-bold mb-3 shadow-xs">
            <HiSparkles className="text-pink-500" size={13} />
            <span>WELCOME TO RUKU STORE</span>
          </div>

          {/* Massive Bold Headline */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-gray-950 tracking-tight leading-[1.05] mb-2">
            EVERYTHING.<br />
            FOR EVERYONE.
          </h1>

          {/* Script / Italic Accent Line */}
          <p className="text-2xl sm:text-3xl lg:text-[2rem] text-pink-500 font-serif italic mb-3 tracking-wide">
            Best Quality, Best Prices!
          </p>

          {/* Subtitle Description */}
          <p className="text-sm sm:text-base text-gray-600 max-w-md mb-7 leading-relaxed">
            Discover a wide range of top-quality products handpicked just for you.
          </p>

          {/* Action Buttons Row (Light Pink + White Theme) */}
          <div className="flex flex-wrap items-center gap-3.5 mb-8 w-full sm:w-auto">
            {/* Primary Button: Pink to Rose Gradient */}
            <Link
              to="/shop"
              className="px-8 py-3.5 bg-gradient-to-r from-pink-500 to-rose-400 hover:from-pink-600 hover:to-rose-500 text-white font-bold text-xs sm:text-sm uppercase tracking-wider rounded-full shadow-md shadow-pink-200 hover:shadow-lg hover:shadow-pink-300 transition-all duration-200 transform hover:-translate-y-0.5 flex items-center gap-2 group cursor-pointer"
            >
              <span>SHOP NOW</span>
              <span className="transition-transform duration-200 group-hover:translate-x-1">→</span>
            </Link>

            {/* Secondary Button: Clean White with Pink Border */}
            <Link
              to="/shop"
              className="px-7 py-3.5 bg-white hover:bg-pink-50 text-gray-800 hover:text-pink-600 font-bold text-xs sm:text-sm uppercase tracking-wider rounded-full border border-pink-200 hover:border-pink-300 transition-all duration-200 shadow-xs transform hover:-translate-y-0.5 cursor-pointer"
            >
              EXPLORE COLLECTIONS
            </Link>
          </div>

          {/* Micro Trust Perks Row (3 items side-by-side with pink accent icons) */}
          <div className="grid grid-cols-3 gap-2 sm:gap-4 pt-6 border-t border-pink-100/90 w-full">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-xl bg-pink-100/80 text-pink-600">
                <FiTruck size={17} />
              </div>
              <div>
                <p className="text-[10px] sm:text-[11px] font-black uppercase tracking-wider text-gray-950 leading-none">
                  FREE SHIPPING
                </p>
                <p className="text-[9px] sm:text-[10px] text-gray-500 mt-1">Over $50</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <div className="p-2 rounded-xl bg-pink-100/80 text-pink-600">
                <FiRefreshCw size={16} />
              </div>
              <div>
                <p className="text-[10px] sm:text-[11px] font-black uppercase tracking-wider text-gray-950 leading-none">
                  EASY RETURNS
                </p>
                <p className="text-[9px] sm:text-[10px] text-gray-500 mt-1">30-day policy</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <div className="p-2 rounded-xl bg-pink-100/80 text-pink-600">
                <FiShield size={16} />
              </div>
              <div>
                <p className="text-[10px] sm:text-[11px] font-black uppercase tracking-wider text-gray-950 leading-none">
                  SECURE PAYMENT
                </p>
                <p className="text-[9px] sm:text-[10px] text-gray-500 mt-1">100% secure</p>
              </div>
            </div>
          </div>
        </div>

        {/* ================= RIGHT COLUMN: STAGE SHOWCASE & DISCOUNT BADGE ================= */}
        <div className="w-full lg:w-5/12 flex flex-col items-center justify-center relative min-h-[340px] sm:min-h-[420px]">
          
          {/* Floating Circular Discount Sticker (Theme: Pink Gradient & White) */}
          <div className="absolute top-2 right-4 sm:right-8 z-20 w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-gradient-to-tr from-pink-500 via-rose-400 to-pink-500 text-white flex flex-col items-center justify-center shadow-xl shadow-pink-300/40 border-2 border-white/90 animate-subtle-float pointer-events-none">
            <span className="text-[9px] sm:text-[10px] uppercase font-bold tracking-widest text-pink-100">
              UP TO
            </span>
            <span className="text-xl sm:text-2xl font-black leading-none text-white my-0.5">
              50%
            </span>
            <span className="text-[9px] sm:text-[10px] uppercase font-bold tracking-widest text-pink-100">
              OFF
            </span>
          </div>

          {/* Featured Product Card resting above the podium stage */}
          {hasProducts && activeProduct ? (
            <div className="relative w-full max-w-sm bg-white/95 backdrop-blur-md rounded-3xl p-5 shadow-2xl shadow-pink-300/40 border border-white/90 flex flex-col items-center animate-fade-in mt-12 sm:mt-16">
              
              <div className="w-full flex items-center justify-between mb-2">
                <span className="text-[10px] font-bold text-pink-600 bg-pink-50 px-2.5 py-1 rounded-full uppercase tracking-wider border border-pink-100">
                  Featured Product
                </span>
                <button
                  onClick={() => toggleFavorite(activeProduct)}
                  className="p-2 rounded-full bg-pink-50 hover:bg-pink-100 text-pink-500 transition-colors shadow-xs cursor-pointer"
                  title={isFavorite ? "Remove from wishlist" : "Add to wishlist"}
                >
                  {isFavorite ? <FaHeart size={15} /> : <FaRegHeart size={15} />}
                </button>
              </div>

              <Link
                to={`/product/${activeProduct._id}`}
                className="w-full h-48 sm:h-56 flex items-center justify-center p-3 rounded-2xl bg-gradient-to-b from-pink-50/40 to-white overflow-hidden group"
              >
                <img
                  src={activeProduct.image}
                  alt={activeProduct.name}
                  className="w-full h-full object-contain mx-auto transition-transform duration-300 group-hover:scale-105"
                />
              </Link>

              <div className="w-full mt-3 flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-bold text-gray-900 truncate max-w-[170px] sm:max-w-[200px]">
                    {activeProduct.name}
                  </h4>
                  <div className="flex items-center gap-1 text-xs text-amber-500 mt-0.5">
                    <FiStar className="fill-amber-400 text-amber-400" size={12} />
                    <span>{activeProduct.rating ? Math.round(activeProduct.rating) : 5}/5</span>
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-lg font-black text-pink-600 block">
                    ${activeProduct.price}
                  </span>
                  <Link
                    to={`/product/${activeProduct._id}`}
                    className="text-xs font-bold text-pink-600 hover:text-pink-700 underline"
                  >
                    View Details →
                  </Link>
                </div>
              </div>
            </div>
          ) : (
            /* Ambient Spotlight / Floating Badge when products are loading */
            <div className="p-6 bg-white/90 backdrop-blur-md rounded-3xl shadow-xl shadow-pink-200/40 border border-white text-center max-w-xs mt-12 sm:mt-16 animate-fade-in">
              <span className="text-xs font-bold text-pink-600 uppercase tracking-widest block mb-1">
                New Season Deals
              </span>
              <h3 className="text-lg font-black text-gray-900 mb-2">
                Discover Curated Picks
              </h3>
              <p className="text-xs text-gray-500 mb-4">
                Explore handpicked products crafted for your daily style.
              </p>
              <Link
                to="/shop"
                className="inline-block px-6 py-2.5 bg-gradient-to-r from-pink-500 to-rose-400 text-white rounded-full text-xs font-bold hover:from-pink-600 hover:to-rose-500 transition-all shadow-md shadow-pink-200"
              >
                Explore Shop →
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* ================= BOTTOM DOT INDICATORS ================= */}
      {totalSlides > 1 && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 z-20">
          {[...Array(totalSlides)].map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentSlide(idx)}
              className={`rounded-full transition-all duration-300 cursor-pointer ${
                idx === currentSlide
                  ? "w-7 h-2 bg-gradient-to-r from-pink-500 to-rose-400 shadow-sm"
                  : "w-2 h-2 bg-pink-200 hover:bg-pink-300"
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      )}
    </section>
  );
};

export default Hero;
