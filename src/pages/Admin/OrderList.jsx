import Message from "../../components/Message";
import Loader from "../../components/Loader";
import { Link } from "react-router-dom";
import { useGetOrdersQuery } from "../../redux/api/orderApiSlice";
import AdminMenu from "./AdminMenu";
import moment from "moment";
import { FiEye, FiShoppingBag, FiCheck, FiClock } from "react-icons/fi";

const OrderList = () => {
  const { data: orders = [], isLoading, error } = useGetOrdersQuery();

  return (
    <div className="min-h-screen bg-[#fffafb]">
      <AdminMenu />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-8">
          <div>
            <h1 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight">
              Order Management
            </h1>
            <p className="text-xs sm:text-sm text-gray-500 mt-1">
              Review customer orders, fulfillment status, and transaction details.
            </p>
          </div>
          <span className="self-start sm:self-auto px-3.5 py-1.5 rounded-full bg-pink-50 text-pink-700 text-xs font-bold border border-pink-200">
            {orders.length} total orders
          </span>
        </div>

        {/* Content Card */}
        {isLoading ? (
          <div className="py-20 flex justify-center">
            <Loader />
          </div>
        ) : error ? (
          <div className="max-w-xl mx-auto my-8">
            <Message variant="error">
              {error?.data?.message || error?.error || "Failed to load orders."}
            </Message>
          </div>
        ) : orders.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 text-center border border-pink-100 shadow-sm max-w-lg mx-auto">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-pink-50 border border-pink-100 flex items-center justify-center text-pink-500 text-2xl">
              <FiShoppingBag />
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">
              No orders found
            </h3>
            <p className="text-xs text-gray-500">
              Customer orders will appear here once purchases are placed.
            </p>
          </div>
        ) : (
          <div className="bg-white rounded-3xl border border-pink-100 shadow-sm shadow-pink-100/50 overflow-hidden">
            <div className="overflow-x-auto soft-pink-scrollbar">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-pink-50/50 border-b border-pink-100 text-[11px] font-extrabold text-gray-600 uppercase tracking-wider">
                    <th className="py-4 px-5">Item</th>
                    <th className="py-4 px-4">Order ID</th>
                    <th className="py-4 px-4">Customer</th>
                    <th className="py-4 px-4">Date</th>
                    <th className="py-4 px-4">Total</th>
                    <th className="py-4 px-4 text-center">Payment</th>
                    <th className="py-4 px-4 text-center">Delivery</th>
                    <th className="py-4 px-5 text-right">Action</th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-pink-50 text-xs text-gray-700">
                  {orders.map((order) => {
                    const firstItem = order.orderItems?.[0];
                    const imgSrc = firstItem?.image
                      ? firstItem.image.replace(/\\/g, "/")
                      : "/hero-podium-bg.jpg";

                    return (
                      <tr
                        key={order._id}
                        className="hover:bg-pink-50/30 transition-colors"
                      >
                        {/* Thumbnail */}
                        <td className="py-3.5 px-5">
                          <img
                            src={imgSrc}
                            alt="product thumbnail"
                            onError={(e) => {
                              e.currentTarget.onerror = null;
                              e.currentTarget.src =
                                "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&q=80";
                            }}
                            className="w-12 h-12 rounded-xl object-contain bg-pink-50/40 p-1 border border-pink-100"
                          />
                        </td>

                        {/* Order ID */}
                        <td className="py-3.5 px-4 font-mono text-[11px] text-gray-500">
                          #{order._id.substring(order._id.length - 8)}
                        </td>

                        {/* Customer */}
                        <td className="py-3.5 px-4 font-semibold text-gray-900">
                          {order.user?.username || "Guest User"}
                        </td>

                        {/* Date */}
                        <td className="py-3.5 px-4 text-gray-500 whitespace-nowrap">
                          {order.createdAt
                            ? moment(order.createdAt).format("MMM DD, YYYY")
                            : "N/A"}
                        </td>

                        {/* Total */}
                        <td className="py-3.5 px-4 font-black text-pink-600">
                          ${Number(order.totalPrice || 0).toFixed(2)}
                        </td>

                        {/* Payment Status */}
                        <td className="py-3.5 px-4 text-center">
                          <span
                            className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold ${
                              order.isPaid
                                ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                                : "bg-amber-50 text-amber-700 border border-amber-200"
                            }`}
                          >
                            {order.isPaid ? (
                              <FiCheck size={11} />
                            ) : (
                              <FiClock size={11} />
                            )}
                            <span>{order.isPaid ? "Paid" : "Pending"}</span>
                          </span>
                        </td>

                        {/* Delivery Status */}
                        <td className="py-3.5 px-4 text-center">
                          <span
                            className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold ${
                              order.isDelivered
                                ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                                : "bg-sky-50 text-sky-700 border border-sky-200"
                            }`}
                          >
                            {order.isDelivered ? (
                              <FiCheck size={11} />
                            ) : (
                              <FiClock size={11} />
                            )}
                            <span>
                              {order.isDelivered ? "Delivered" : "Processing"}
                            </span>
                          </span>
                        </td>

                        {/* Action Link */}
                        <td className="py-3.5 px-5 text-right">
                          <Link
                            to={`/order/${order._id}`}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-pink-50 hover:bg-pink-100 text-pink-700 text-xs font-bold border border-pink-200 transition-all cursor-pointer"
                          >
                            <FiEye size={12} />
                            <span>Details</span>
                          </Link>
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

export default OrderList;
