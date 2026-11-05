import { useEffect, useState } from "react";
import { FaTrash, FaEdit, FaCheck, FaTimes, FaUserShield } from "react-icons/fa";
import Loader from "../../components/Loader";
import { toast } from "react-toastify";
import {
  useGetUsersQuery,
  useDeleteUserMutation,
  useUpdateUserMutation,
} from "../../redux/api/userApiSlice";
import Message from "../../components/Message";
import AdminMenu from "./AdminMenu";
import { FiUsers, FiMail, FiCheck, FiX } from "react-icons/fi";

const UserList = () => {
  const { data: users = [], refetch, isLoading, error } = useGetUsersQuery();

  const [deleteUser] = useDeleteUserMutation();
  const [updateUser] = useUpdateUserMutation();

  const [editableUserId, setEditableUserId] = useState(null);
  const [editableUserName, setEditableUserName] = useState("");
  const [editableUserEmail, setEditableUserEmail] = useState("");

  useEffect(() => {
    refetch();
  }, [refetch]);

  const deleteHandler = async (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        await deleteUser(id).unwrap();
        toast.success("User deleted successfully", { position: "top-right" });
        refetch();
      } catch (err) {
        toast.error(err?.data?.message || err?.error || "Delete failed", {
          position: "top-right",
        });
      }
    }
  };

  const toggleEdit = (id, username, email) => {
    setEditableUserId(id);
    setEditableUserName(username);
    setEditableUserEmail(email);
  };

  const updateHandler = async (id) => {
    try {
      await updateUser({
        userId: id,
        username: editableUserName,
        email: editableUserEmail,
      }).unwrap();
      toast.success("User updated successfully", { position: "top-right" });
      setEditableUserId(null);
      refetch();
    } catch (err) {
      toast.error(err?.data?.message || err?.error || "Update failed", {
        position: "top-right",
      });
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
              User Management
            </h1>
            <p className="text-xs sm:text-sm text-gray-500 mt-1">
              View customer profiles, update user roles, and manage system administrators.
            </p>
          </div>
          <span className="self-start sm:self-auto px-3.5 py-1.5 rounded-full bg-pink-50 text-pink-700 text-xs font-bold border border-pink-200">
            {users.length} registered users
          </span>
        </div>

        {isLoading ? (
          <div className="py-20 flex justify-center">
            <Loader />
          </div>
        ) : error ? (
          <div className="max-w-xl mx-auto my-8">
            <Message variant="error">
              {error?.data?.message || error?.error || "Failed to load users."}
            </Message>
          </div>
        ) : (
          <div className="bg-white rounded-3xl border border-pink-100 shadow-sm shadow-pink-100/50 overflow-hidden">
            <div className="overflow-x-auto soft-pink-scrollbar">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-pink-50/50 border-b border-pink-100 text-[11px] font-extrabold text-gray-600 uppercase tracking-wider">
                    <th className="py-4 px-5">User</th>
                    <th className="py-4 px-4">User ID</th>
                    <th className="py-4 px-4">Email</th>
                    <th className="py-4 px-4 text-center">Role</th>
                    <th className="py-4 px-5 text-right">Actions</th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-pink-50 text-xs text-gray-700">
                  {users.map((user) => {
                    const isEditing = editableUserId === user._id;

                    return (
                      <tr
                        key={user._id}
                        className="hover:bg-pink-50/30 transition-colors"
                      >
                        {/* Name / Avatar */}
                        <td className="py-3.5 px-5">
                          {isEditing ? (
                            <input
                              type="text"
                              value={editableUserName}
                              onChange={(e) =>
                                setEditableUserName(e.target.value)
                              }
                              className="px-3 py-1.5 border border-pink-200 rounded-xl text-xs bg-white focus:outline-none focus:ring-2 focus:ring-pink-300"
                            />
                          ) : (
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-pink-400 to-rose-400 flex items-center justify-center text-white font-bold text-xs shadow-xs">
                                {user.username ? user.username.charAt(0).toUpperCase() : "U"}
                              </div>
                              <span className="font-bold text-gray-900">
                                {user.username}
                              </span>
                            </div>
                          )}
                        </td>

                        {/* ID */}
                        <td className="py-3.5 px-4 font-mono text-[11px] text-gray-500">
                          #{user._id.substring(user._id.length - 8)}
                        </td>

                        {/* Email */}
                        <td className="py-3.5 px-4">
                          {isEditing ? (
                            <input
                              type="email"
                              value={editableUserEmail}
                              onChange={(e) =>
                                setEditableUserEmail(e.target.value)
                              }
                              className="px-3 py-1.5 border border-pink-200 rounded-xl text-xs bg-white focus:outline-none focus:ring-2 focus:ring-pink-300"
                            />
                          ) : (
                            <a
                              href={`mailto:${user.email}`}
                              className="text-gray-600 hover:text-pink-600 hover:underline flex items-center gap-1.5"
                            >
                              <FiMail size={12} className="text-gray-400" />
                              <span>{user.email}</span>
                            </a>
                          )}
                        </td>

                        {/* Role */}
                        <td className="py-3.5 px-4 text-center">
                          <span
                            className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold ${
                              user.isAdmin
                                ? "bg-purple-50 text-purple-700 border border-purple-200"
                                : "bg-pink-50 text-pink-700 border border-pink-200"
                            }`}
                          >
                            <FaUserShield size={11} />
                            <span>{user.isAdmin ? "Admin" : "Customer"}</span>
                          </span>
                        </td>

                        {/* Actions */}
                        <td className="py-3.5 px-5 text-right">
                          <div className="flex items-center justify-end gap-2">
                            {isEditing ? (
                              <>
                                <button
                                  onClick={() => updateHandler(user._id)}
                                  className="p-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-600 text-white shadow-xs cursor-pointer"
                                  title="Save Changes"
                                >
                                  <FiCheck size={13} />
                                </button>
                                <button
                                  onClick={() => setEditableUserId(null)}
                                  className="p-1.5 rounded-lg bg-gray-200 hover:bg-gray-300 text-gray-700 cursor-pointer"
                                  title="Cancel"
                                >
                                  <FiX size={13} />
                                </button>
                              </>
                            ) : (
                              <button
                                onClick={() =>
                                  toggleEdit(user._id, user.username, user.email)
                                }
                                className="p-1.5 rounded-lg bg-pink-50 hover:bg-pink-100 text-pink-600 border border-pink-200 transition-colors cursor-pointer"
                                title="Edit user"
                              >
                                <FaEdit size={12} />
                              </button>
                            )}

                            {!user.isAdmin && (
                              <button
                                onClick={() => deleteHandler(user._id)}
                                className="p-1.5 rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-600 border border-rose-200 transition-colors cursor-pointer"
                                title="Delete user"
                              >
                                <FaTrash size={11} />
                              </button>
                            )}
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default UserList;
