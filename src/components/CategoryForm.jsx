const CategoryForm = ({
  value,
  setValue,
  handleSubmit,
  buttonText = "Submit",
  handleDelete,
}) => {
  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
          Category Name
        </label>
        <input
          type="text"
          className="w-full px-4 py-3 rounded-2xl border border-pink-200/80 bg-pink-50/20 hover:bg-white focus:bg-white text-gray-900 text-sm placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-pink-100 focus:border-pink-400 transition-all shadow-inner"
          placeholder="e.g. Luxury Watches, Smart Wearables"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
      </div>

      <div className="flex items-center gap-3 pt-2">
        <button
          type="submit"
          className="flex-1 py-3 px-6 rounded-full bg-gradient-to-r from-pink-500 to-rose-400 hover:from-pink-600 hover:to-rose-500 text-white text-xs font-bold uppercase tracking-wider shadow-sm shadow-pink-200 transition-all cursor-pointer"
        >
          {buttonText}
        </button>

        {handleDelete && (
          <button
            type="button"
            onClick={handleDelete}
            className="py-3 px-6 rounded-full bg-rose-50 hover:bg-rose-100 text-rose-600 border border-rose-200 text-xs font-bold uppercase tracking-wider transition-all cursor-pointer"
          >
            Delete
          </button>
        )}
      </div>
    </form>
  );
};

export default CategoryForm;
