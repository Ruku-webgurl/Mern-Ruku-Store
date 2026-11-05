import { Link } from "react-router-dom";
import { useFetchCategoriesQuery } from "../../redux/api/categoryApiSlice";
import { FiArrowRight, FiSmartphone, FiWatch, FiShoppingBag, FiHeart } from "react-icons/fi";
import { HiSparkles } from "react-icons/hi2";

const Categories = () => {
  const { data: categories = [], isLoading } = useFetchCategoriesQuery();

  // Curated category icons / fallback categories
  const fallbackCategories = [
    {
      _id: "cat-1",
      name: "Fashion & Apparel",
      itemCount: "120+ Products",
      icon: <FiShoppingBag size={28} />,
      color: "from-pink-100 to-rose-50",
    },
    {
      _id: "cat-2",
      name: "Smart Gadgets & Tech",
      itemCount: "85+ Products",
      icon: <FiSmartphone size={28} />,
      color: "from-rose-50 to-pink-100",
    },
    {
      _id: "cat-3",
      name: "Beauty & Cosmetics",
      itemCount: "64+ Products",
      icon: <HiSparkles size={28} />,
      color: "from-pink-100 to-pink-50",
    },
    {
      _id: "cat-4",
      name: "Watches & Accessories",
      itemCount: "92+ Products",
      icon: <FiWatch size={28} />,
      color: "from-rose-100 to-pink-50",
    },
  ];

  const categoryList =
    Array.isArray(categories) && categories.length > 0
      ? categories.map((cat, idx) => ({
          _id: cat._id,
          name: cat.name,
          itemCount: "Explore Collection",
          icon: fallbackCategories[idx % fallbackCategories.length].icon,
          color: fallbackCategories[idx % fallbackCategories.length].color,
        }))
      : fallbackCategories;

  return (
    <section className="my-12 sm:my-16">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-pink-50 border border-pink-200 text-pink-700 text-xs font-bold mb-2">
            <HiSparkles className="text-pink-500" size={13} />
            <span>Curated Collections</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">
            Shop by Category
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            Browse our most loved departments and discover trending essentials.
          </p>
        </div>

        <Link
          to="/shop"
          className="inline-flex items-center gap-1.5 text-sm font-bold text-pink-600 hover:text-pink-700 group transition-colors self-start sm:self-auto"
        >
          <span>View All Categories</span>
          <FiArrowRight
            className="transition-transform group-hover:translate-x-1"
            size={16}
          />
        </Link>
      </div>

      {/* Category Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {categoryList.map((cat) => (
          <Link
            key={cat._id}
            to="/shop"
            className="relative rounded-3xl p-6 bg-white border border-pink-100/90 shadow-sm shadow-pink-100/40 hover:shadow-xl hover:shadow-pink-200/50 hover:border-pink-200 transition-all duration-300 transform hover:-translate-y-1.5 group flex flex-col justify-between overflow-hidden"
          >
            {/* Ambient subtle glow background */}
            <div
              className={`absolute top-0 right-0 w-32 h-32 rounded-full bg-gradient-to-br ${cat.color} opacity-40 blur-2xl group-hover:opacity-70 transition-opacity pointer-events-none`}
            />

            <div>
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-pink-50 to-rose-50 border border-pink-100/80 flex items-center justify-center text-pink-500 group-hover:bg-gradient-to-tr group-hover:from-pink-500 group-hover:to-rose-400 group-hover:text-white transition-all duration-300 shadow-sm mb-5">
                {cat.icon}
              </div>

              <h3 className="text-lg font-bold text-gray-900 group-hover:text-pink-600 transition-colors">
                {cat.name}
              </h3>
              <p className="text-xs text-gray-400 mt-1 font-medium">
                {cat.itemCount}
              </p>
            </div>

            <div className="mt-6 pt-3 border-t border-pink-50/80 flex items-center justify-between text-xs font-bold text-pink-600 group-hover:text-pink-700">
              <span>Explore Items</span>
              <div className="w-7 h-7 rounded-full bg-pink-50 group-hover:bg-pink-500 group-hover:text-white flex items-center justify-center transition-all duration-300">
                <FiArrowRight size={13} />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default Categories;

