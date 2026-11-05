import { useState } from "react";
import {
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
  useFetchCategoriesQuery,
} from "../../redux/api/categoryApiSlice";
import { toast } from "react-toastify";
import CategoryForm from "../../components/CategoryForm";
import Modal from "../../components/Modal";
import AdminMenu from "./AdminMenu";
import { FiGrid, FiPlus, FiEdit2, FiTag } from "react-icons/fi";
import Loader from "../../components/Loader";

const CategoryList = () => {
  const { data: categories = [], isLoading } = useFetchCategoriesQuery();
  const [name, setName] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [updatingName, setUpdatingName] = useState("");
  const [modalVisible, setModalVisible] = useState(false);

  const [createCategory] = useCreateCategoryMutation();
  const [updateCategory] = useUpdateCategoryMutation();
  const [deleteCategory] = useDeleteCategoryMutation();

  const handleCreateCategory = async (e) => {
    e.preventDefault();

    if (!name.trim()) {
      toast.error("Category name is required", { position: "top-right" });
      return;
    }

    try {
      const result = await createCategory({ name }).unwrap();
      if (result.error) {
        toast.error(result.error, { position: "top-right" });
      } else {
        setName("");
        toast.success(`Category "${result.name}" created successfully!`, {
          position: "top-right",
        });
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to create category. Try again.", {
        position: "top-right",
      });
    }
  };

  const handleUpdateCategory = async (e) => {
    e.preventDefault();

    if (!updatingName.trim()) {
      toast.error("Category name is required", { position: "top-right" });
      return;
    }

    try {
      const result = await updateCategory({
        categoryId: selectedCategory._id,
        updatedCategory: { name: updatingName },
      }).unwrap();

      if (result.error) {
        toast.error(result.error, { position: "top-right" });
      } else {
        toast.success(`Category updated to "${result.name}"`, {
          position: "top-right",
        });
        setSelectedCategory(null);
        setUpdatingName("");
        setModalVisible(false);
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to update category", { position: "top-right" });
    }
  };

  const handleDeleteCategory = async () => {
    if (!selectedCategory?._id) return;

    if (
      !window.confirm(
        `Are you sure you want to delete "${selectedCategory.name}"?`
      )
    ) {
      return;
    }

    try {
      const deleted = await deleteCategory(selectedCategory._id).unwrap();
      toast.success(
        `Category "${deleted.name || "item"}" deleted successfully`,
        { position: "top-right" }
      );
      setSelectedCategory(null);
      setModalVisible(false);
    } catch (err) {
      toast.error(
        err?.data?.message || err?.error || "Failed to delete category",
        { position: "top-right" }
      );
    }
  };

  return (
    <div className="min-h-screen bg-[#fffafb]">
      <AdminMenu />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-8">
          <div>
            <h1 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight">
              Manage Categories
            </h1>
            <p className="text-xs sm:text-sm text-gray-500 mt-1">
              Add, update, or remove product categories to organize your storefront.
            </p>
          </div>
          <span className="self-start sm:self-auto px-3.5 py-1.5 rounded-full bg-pink-50 text-pink-700 text-xs font-bold border border-pink-200">
            {categories.length} total categories
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Create Category Card (5 cols) */}
          <div className="lg:col-span-5 bg-white rounded-3xl p-6 sm:p-8 border border-pink-100 shadow-sm shadow-pink-100/50">
            <div className="flex items-center gap-2 mb-4 pb-3 border-b border-pink-50">
              <div className="p-2 rounded-xl bg-pink-50 text-pink-600">
                <FiPlus size={16} />
              </div>
              <h2 className="text-base font-black text-gray-900">
                Create Category
              </h2>
            </div>

            <CategoryForm
              value={name}
              setValue={setName}
              handleSubmit={handleCreateCategory}
              buttonText="Create Category"
            />
          </div>

          {/* Existing Categories Card (7 cols) */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 border border-pink-100 shadow-sm shadow-pink-100/50">
            <div className="flex items-center justify-between gap-2 mb-4 pb-3 border-b border-pink-50">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-xl bg-pink-50 text-pink-600">
                  <FiGrid size={16} />
                </div>
                <h2 className="text-base font-black text-gray-900">
                  Existing Categories
                </h2>
              </div>
              <span className="text-[11px] text-gray-400 font-semibold">
                Tap to edit / delete
              </span>
            </div>

            {isLoading ? (
              <div className="py-12 flex justify-center">
                <Loader />
              </div>
            ) : categories.length === 0 ? (
              <p className="text-xs text-gray-400 py-6 text-center">
                No categories found. Create your first category on the left!
              </p>
            ) : (
              <div className="flex flex-wrap gap-2.5">
                {categories.map((category) => (
                  <button
                    key={category._id}
                    onClick={() => {
                      setModalVisible(true);
                      setSelectedCategory(category);
                      setUpdatingName(category.name);
                    }}
                    className="group inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-pink-50/60 hover:bg-gradient-to-r hover:from-pink-500 hover:to-rose-400 hover:text-white text-gray-700 text-xs font-bold border border-pink-200/80 hover:border-transparent shadow-xs transition-all duration-200 cursor-pointer transform hover:-translate-y-0.5"
                    title="Click to edit category"
                  >
                    <FiTag size={12} className="text-pink-500 group-hover:text-white" />
                    <span className="capitalize">{category.name}</span>
                    <FiEdit2 size={11} className="opacity-40 group-hover:opacity-100" />
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Edit Modal */}
        <Modal isOpen={modalVisible} onClose={() => setModalVisible(false)}>
          <div className="mb-4">
            <h3 className="text-lg font-black text-gray-900">Edit Category</h3>
            <p className="text-xs text-gray-500 mt-0.5">
              Update category title or remove it from the catalog.
            </p>
          </div>

          <CategoryForm
            value={updatingName}
            setValue={setUpdatingName}
            handleSubmit={handleUpdateCategory}
            buttonText="Save Changes"
            handleDelete={handleDeleteCategory}
          />
        </Modal>
      </main>
    </div>
  );
};

export default CategoryList;
