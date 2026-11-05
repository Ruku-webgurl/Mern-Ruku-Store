import { useEffect } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import {
  addToFavorites,
  removeFromFavorites,
  setFavorites,
} from "../../redux/features/favorites/favoriteSlice";
import {
  addFavoriteToLocalStorage,
  getFavoritesFromLocalStorage,
  removeFavoriteFromLocalStorage,
} from "../../utils/localStorage";

const HeartIcon = ({ product }) => {
  const dispatch = useDispatch();
  const favorites = useSelector((state) => state.favorites) || [];
  const isFavorite = favorites.some((p) => p._id === product._id);

  useEffect(() => {
    const favoritesFromLocalStorage = getFavoritesFromLocalStorage();
    dispatch(setFavorites(favoritesFromLocalStorage));
  }, [dispatch]);

  const toggleFavorites = () => {
    if (isFavorite) {
      dispatch(removeFromFavorites(product));
      removeFavoriteFromLocalStorage(product._id);
    } else {
      dispatch(addToFavorites(product));
      addFavoriteToLocalStorage(product);
    }
  };

  return (
    <button
      type="button"
      className="absolute top-3 right-3 p-2 rounded-full bg-white/90 backdrop-blur-md border border-pink-100 shadow-sm hover:shadow-md hover:bg-pink-50 transition-all duration-200 cursor-pointer z-10"
      onClick={toggleFavorites}
      aria-label={isFavorite ? "Remove from wishlist" : "Add to wishlist"}
    >
      {isFavorite ? (
        <FaHeart className="text-pink-500 transition-transform active:scale-125" size={16} />
      ) : (
        <FaRegHeart className="text-gray-400 hover:text-pink-500 transition-colors" size={16} />
      )}
    </button>
  );
};

export default HeartIcon;
