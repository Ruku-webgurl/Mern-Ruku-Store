import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  useCreateProductMutation,
  useUploadProductImageMutation,
} from "../../redux/api/productApiSlice";
import { useFetchCategoriesQuery } from "../../redux/api/categoryApiSlice";
import { toast } from "react-toastify";
import AdminMenu from "./AdminMenu";
import {
  FiUploadCloud,
  FiDollarSign,
  FiPackage,
  FiTag,
  FiFileText,
  FiCheck,
  FiLayers,
} from "react-icons/fi";

const ProductList = () => {
  const [image, setImage] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [quantity, setQuantity] = useState("");
  const [brand, setBrand] = useState("");
  const [stock, setStock] = useState(10);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const navigate = useNavigate();

  const [uploadProductImage, { isLoading: isUploading }] =
    useUploadProductImageMutation();
  const [createProduct] = useCreateProductMutation();
  const { data: categories = [], isLoading: loadingCategories } =
    useFetchCategoriesQuery();

  const uploadFileHandler = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("image", file);

    try {
      const res = await uploadProductImage(formData).unwrap();
      toast.success(res.message || "Image uploaded successfully!", {
        position: "top-right",
      });
      const cleanPath = res.image ? res.image.replace(/\\/g, "/") : "";
      setImage(cleanPath);
      setImageUrl(cleanPath);
    } catch (error) {
      toast.error(error?.data?.message || error?.error || "Image upload failed", {
        position: "top-right",
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name.trim() || !price || !category) {
      toast.error("Please fill in all required fields (Name, Price, Category)", {
        position: "top-right",
      });
      return;
    }

    try {
      setIsSubmitting(true);
      const productData = new FormData();
      productData.append("image", image);
      productData.append("name", name);
      productData.append("description", description);
      productData.append("price", price);
      productData.append("category", category);
      productData.append("quantity", quantity || 1);
      productData.append("brand", brand);
      productData.append("countInStock", stock);

      const result = await createProduct(productData).unwrap();

      if (result?.error) {
        toast.error(result.error, { position: "top-right" });
      } else {
        toast.success(`Product "${result.name}" published successfully!`, {
          position: "top-right",
        });
        navigate("/admin/allproductslist");
      }
    } catch (error) {
      console.error(error);
      toast.error(
        error?.data?.message || error?.error || "Product creation failed. Try again.",
        { position: "top-right" }
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#fffafb]">
      <AdminMenu />

      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight">
            Create New Product
          </h1>
          <p className="text-xs sm:text-sm text-gray-500 mt-1">
            Add a new product to your catalog with images, pricing, and stock details.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Main Card */}
          <div className="bg-white rounded-3xl p-6 sm:p-10 border border-pink-100 shadow-sm shadow-pink-100/50">
            {/* Image Upload Zone */}
            <div className="mb-8">
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
                Product Image
              </label>

              {imageUrl ? (
                <div className="relative rounded-2xl bg-pink-50/40 p-4 border border-pink-200 text-center max-w-sm mx-auto">
                  <img
                    src={imageUrl}
                    alt="Uploaded Product"
                    className="max-h-56 mx-auto object-contain rounded-xl"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      setImage("");
                      setImageUrl("");
                    }}
                    className="mt-3 px-4 py-1.5 rounded-full bg-rose-50 hover:bg-rose-100 text-rose-600 text-xs font-bold border border-rose-200 transition-all cursor-pointer"
                  >
                    Change Image
                  </button>
                </div>
              ) : (
                <label className="border-2 border-dashed border-pink-200 hover:border-pink-400 bg-pink-50/20 hover:bg-pink-50/50 rounded-3xl p-8 flex flex-col items-center justify-center cursor-pointer transition-all duration-200">
                  <div className="w-14 h-14 rounded-2xl bg-pink-50 text-pink-500 flex items-center justify-center mb-3 shadow-xs">
                    <FiUploadCloud size={24} />
                  </div>
                  <span className="text-sm font-bold text-gray-800">
                    {isUploading ? "Uploading image..." : "Click to upload product image"}
                  </span>
                  <span className="text-xs text-gray-400 mt-1">
                    Supports PNG, JPG, WEBP (Max 5MB)
                  </span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={uploadFileHandler}
                    className="hidden"
                  />
                </label>
              )}
            </div>

            {/* Inputs Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Product Name */}
              <div className="sm:col-span-2">
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
                  Product Title *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Minimalist Ceramic Lamp"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-3 rounded-2xl border border-pink-200/80 bg-pink-50/20 hover:bg-white focus:bg-white text-gray-900 text-sm focus:outline-none focus:ring-4 focus:ring-pink-100 focus:border-pink-400 transition-all shadow-inner"
                />
              </div>

              {/* Price */}
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
                  Price ($ USD) *
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-3.5 text-gray-400 font-bold text-sm">
                    $
                  </span>
                  <input
                    type="number"
                    step="0.01"
                    min="0"
                    required
                    placeholder="49.99"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    className="w-full pl-8 pr-4 py-3 rounded-2xl border border-pink-200/80 bg-pink-50/20 hover:bg-white focus:bg-white text-gray-900 text-sm focus:outline-none focus:ring-4 focus:ring-pink-100 focus:border-pink-400 transition-all shadow-inner"
                  />
                </div>
              </div>

              {/* Brand */}
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
                  Brand / Manufacturer
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-3.5 text-gray-400">
                    <FiTag size={15} />
                  </span>
                  <input
                    type="text"
                    placeholder="e.g. Nova Nest"
                    value={brand}
                    onChange={(e) => setBrand(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 rounded-2xl border border-pink-200/80 bg-pink-50/20 hover:bg-white focus:bg-white text-gray-900 text-sm focus:outline-none focus:ring-4 focus:ring-pink-100 focus:border-pink-400 transition-all shadow-inner"
                  />
                </div>
              </div>

              {/* Category */}
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
                  Category *
                </label>
                <select
                  required
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full px-4 py-3 rounded-2xl border border-pink-200/80 bg-white text-gray-900 text-sm focus:outline-none focus:ring-4 focus:ring-pink-100 focus:border-pink-400 transition-all cursor-pointer"
                >
                  <option value="">Select a Category...</option>
                  {categories.map((c) => (
                    <option key={c._id} value={c._id}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Count In Stock */}
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
                  Count In Stock
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-3.5 text-gray-400">
                    <FiLayers size={15} />
                  </span>
                  <input
                    type="number"
                    min="0"
                    placeholder="10"
                    value={stock}
                    onChange={(e) => setStock(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 rounded-2xl border border-pink-200/80 bg-pink-50/20 hover:bg-white focus:bg-white text-gray-900 text-sm focus:outline-none focus:ring-4 focus:ring-pink-100 focus:border-pink-400 transition-all shadow-inner"
                  />
                </div>
              </div>

              {/* Quantity */}
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
                  Initial Units / Pack Quantity
                </label>
                <input
                  type="number"
                  min="1"
                  placeholder="1"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                  className="w-full px-4 py-3 rounded-2xl border border-pink-200/80 bg-pink-50/20 hover:bg-white focus:bg-white text-gray-900 text-sm focus:outline-none focus:ring-4 focus:ring-pink-100 focus:border-pink-400 transition-all shadow-inner"
                />
              </div>

              {/* Description */}
              <div className="sm:col-span-2">
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
                  Product Description
                </label>
                <textarea
                  rows="4"
                  placeholder="Describe product materials, dimensions, styling tips..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full p-4 rounded-2xl border border-pink-200/80 bg-pink-50/20 hover:bg-white focus:bg-white text-gray-900 text-sm focus:outline-none focus:ring-4 focus:ring-pink-100 focus:border-pink-400 transition-all shadow-inner resize-none"
                ></textarea>
              </div>
            </div>

            {/* Actions */}
            <div className="mt-8 pt-6 border-t border-pink-100 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => navigate("/admin/allproductslist")}
                className="px-6 py-3 rounded-full bg-white hover:bg-pink-50 text-gray-700 font-bold text-xs border border-pink-200 transition-all cursor-pointer"
              >
                Cancel
              </button>

              <button
                type="submit"
                disabled={isSubmitting || isUploading}
                className="px-8 py-3.5 rounded-full bg-gradient-to-r from-pink-500 to-rose-400 hover:from-pink-600 hover:to-rose-500 text-white font-bold text-xs uppercase tracking-wider shadow-md shadow-pink-200 hover:shadow-lg hover:shadow-pink-300 transition-all transform hover:-translate-y-0.5 active:scale-95 flex items-center gap-2 cursor-pointer disabled:opacity-60"
              >
                <FiCheck size={14} />
                <span>{isSubmitting ? "Publishing..." : "Publish Product"}</span>
              </button>
            </div>
          </div>
        </form>
      </main>
    </div>
  );
};

export default ProductList;
