import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  useUpdateProductMutation,
  useDeleteProductMutation,
  useGetProductByIdQuery,
  useUploadProductImageMutation,
} from "../../redux/api/productApiSlice";
import { useFetchCategoriesQuery } from "../../redux/api/categoryApiSlice";
import { toast } from "react-toastify";
import AdminMenu from "./AdminMenu";
import Loader from "../../components/Loader";
import {
  FiUploadCloud,
  FiTrash2,
  FiCheck,
  FiTag,
  FiLayers,
  FiArrowLeft,
} from "react-icons/fi";

const ProductUpdate = () => {
  const params = useParams();
  const navigate = useNavigate();

  const { data: productData, isLoading: loadingProduct } =
    useGetProductByIdQuery(params._id);
  const { data: categories = [] } = useFetchCategoriesQuery();

  const [uploadProductImage, { isLoading: isUploading }] =
    useUploadProductImageMutation();
  const [updateProduct, { isLoading: isUpdating }] =
    useUpdateProductMutation();
  const [deleteProduct, { isLoading: isDeleting }] =
    useDeleteProductMutation();

  const [image, setImage] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [quantity, setQuantity] = useState("");
  const [brand, setBrand] = useState("");
  const [stock, setStock] = useState(0);

  useEffect(() => {
    if (productData && productData._id) {
      setName(productData.name || "");
      setDescription(productData.description || "");
      setPrice(productData.price || "");
      setCategory(productData.category?._id || productData.category || "");
      setQuantity(productData.quantity || 1);
      setBrand(productData.brand || "");
      setStock(productData.countInStock || 0);
      setImage(
        productData.image ? productData.image.replace(/\\/g, "/") : ""
      );
    }
  }, [productData]);

  const uploadFileHandler = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("image", file);
    try {
      const res = await uploadProductImage(formData).unwrap();
      toast.success("Image uploaded successfully!", {
        position: "top-right",
        autoClose: 2000,
      });
      const cleanPath = res.image ? res.image.replace(/\\/g, "/") : "";
      setImage(cleanPath);
    } catch (error) {
      toast.error(error?.data?.message || error?.error || "Image upload failed", {
        position: "top-right",
        autoClose: 2000,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("image", image);
      formData.append("name", name);
      formData.append("description", description);
      formData.append("price", price);
      formData.append("category", category);
      formData.append("quantity", quantity);
      formData.append("brand", brand);
      formData.append("countInStock", stock);

      const data = await updateProduct({
        productId: params._id,
        formData,
      }).unwrap();

      if (data?.error) {
        toast.error(data.error, { position: "top-right", autoClose: 2000 });
      } else {
        toast.success(`Product "${name}" updated successfully!`, {
          position: "top-right",
          autoClose: 2000,
        });
        navigate("/admin/allproductslist");
      }
    } catch (err) {
      console.error(err);
      toast.error("Product update failed. Try again.", {
        position: "top-right",
        autoClose: 2000,
      });
    }
  };

  const handleDelete = async () => {
    if (
      !window.confirm(
        `Are you sure you want to permanently delete "${name || "this product"}"?`
      )
    ) {
      return;
    }

    try {
      const data = await deleteProduct(params._id).unwrap();
      toast.success(`Product "${data.name || name}" deleted`, {
        position: "top-right",
        autoClose: 2000,
      });
      navigate("/admin/allproductslist");
    } catch (err) {
      console.error(err);
      toast.error("Delete failed. Try again.", {
        position: "top-right",
        autoClose: 2000,
      });
    }
  };

  if (loadingProduct) {
    return (
      <div className="min-h-screen bg-[#fffafb] flex items-center justify-center">
        <Loader />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#fffafb]">
      <AdminMenu />

      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        {/* Header */}
        <div className="flex items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight">
              Update Product
            </h1>
            <p className="text-xs sm:text-sm text-gray-500 mt-1">
              Modify product details, pricing, stock levels, or delete this item.
            </p>
          </div>

          <button
            onClick={() => navigate("/admin/allproductslist")}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-white hover:bg-pink-50 text-gray-700 text-xs font-bold border border-pink-200 transition-all cursor-pointer"
          >
            <FiArrowLeft size={13} />
            <span>All Products</span>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="bg-white rounded-3xl p-6 sm:p-10 border border-pink-100 shadow-sm shadow-pink-100/50">
            {/* Image Preview & Replacement Zone */}
            <div className="mb-8">
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
                Product Image
              </label>

              <div className="flex flex-col sm:flex-row items-center gap-6 p-4 rounded-2xl bg-pink-50/30 border border-pink-100">
                <div className="w-32 h-32 rounded-2xl bg-white p-2 border border-pink-100 shrink-0 flex items-center justify-center">
                  <img
                    src={image || "/hero-podium-bg.jpg"}
                    alt={name}
                    onError={(e) => {
                      e.currentTarget.onerror = null;
                      e.currentTarget.src =
                        "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&q=80";
                    }}
                    className="max-h-full max-w-full object-contain"
                  />
                </div>

                <div className="flex-1 text-center sm:text-left">
                  <span className="text-xs font-bold text-gray-800 block mb-1">
                    Change Product Image
                  </span>
                  <span className="text-[11px] text-gray-500 block mb-3">
                    Upload a high-resolution transparent or studio product shot.
                  </span>
                  <label className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white hover:bg-pink-50 text-pink-700 text-xs font-bold border border-pink-200 transition-all cursor-pointer shadow-xs">
                    <FiUploadCloud size={14} />
                    <span>{isUploading ? "Uploading..." : "Select New File"}</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={uploadFileHandler}
                      className="hidden"
                    />
                  </label>
                </div>
              </div>
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
                  <option value="">Select Category...</option>
                  {categories.map((c) => (
                    <option key={c._id} value={c._id}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Stock */}
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
                    value={stock}
                    onChange={(e) => setStock(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 rounded-2xl border border-pink-200/80 bg-pink-50/20 hover:bg-white focus:bg-white text-gray-900 text-sm focus:outline-none focus:ring-4 focus:ring-pink-100 focus:border-pink-400 transition-all shadow-inner"
                  />
                </div>
              </div>

              {/* Quantity */}
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
                  Quantity Pack Units
                </label>
                <input
                  type="number"
                  min="1"
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
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full p-4 rounded-2xl border border-pink-200/80 bg-pink-50/20 hover:bg-white focus:bg-white text-gray-900 text-sm focus:outline-none focus:ring-4 focus:ring-pink-100 focus:border-pink-400 transition-all shadow-inner resize-none"
                ></textarea>
              </div>
            </div>

            {/* Actions: Save Changes & Delete Button */}
            <div className="mt-8 pt-6 border-t border-pink-100 flex flex-col sm:flex-row items-center justify-between gap-4">
              <button
                type="button"
                onClick={handleDelete}
                disabled={isDeleting}
                className="w-full sm:w-auto px-6 py-3 rounded-full bg-rose-50 hover:bg-rose-100 text-rose-600 border border-rose-200 text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                <FiTrash2 size={14} />
                <span>{isDeleting ? "Deleting..." : "Delete Product"}</span>
              </button>

              <div className="flex items-center gap-3 w-full sm:w-auto">
                <button
                  type="button"
                  onClick={() => navigate("/admin/allproductslist")}
                  className="flex-1 sm:flex-none px-6 py-3 rounded-full bg-white hover:bg-pink-50 text-gray-700 font-bold text-xs border border-pink-200 transition-all cursor-pointer"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={isUpdating}
                  className="flex-1 sm:flex-none px-8 py-3.5 rounded-full bg-gradient-to-r from-pink-500 to-rose-400 hover:from-pink-600 hover:to-rose-500 text-white font-bold text-xs uppercase tracking-wider shadow-md shadow-pink-200 transition-all transform hover:-translate-y-0.5 active:scale-95 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  <FiCheck size={14} />
                  <span>{isUpdating ? "Saving..." : "Save Changes"}</span>
                </button>
              </div>
            </div>
          </div>
        </form>
      </main>
    </div>
  );
};

export default ProductUpdate;
