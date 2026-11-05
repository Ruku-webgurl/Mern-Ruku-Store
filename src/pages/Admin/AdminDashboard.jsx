import Chart from "react-apexcharts";
import { useGetUsersQuery } from "../../redux/api/userApiSlice";
import {
  useGetTotalOrdersQuery,
  useGetTotalSalesByDateQuery,
  useGetTotalSalesQuery,
  useGetOrdersQuery,
} from "../../redux/api/orderApiSlice";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import AdminMenu from "./AdminMenu";
import Loader from "../../components/Loader";
import {
  FiDollarSign,
  FiUsers,
  FiShoppingBag,
  FiTrendingUp,
  FiArrowRight,
  FiEye,
} from "react-icons/fi";
import { HiSparkles } from "react-icons/hi2";

const AdminDashboard = () => {
  const { data: sales, isLoading: loadingSales } = useGetTotalSalesQuery();
  const { data: customers, isLoading: loadingCustomers } = useGetUsersQuery();
  const { data: orders, isLoading: loadingOrders } = useGetTotalOrdersQuery();
  const { data: salesDetail } = useGetTotalSalesByDateQuery();
  const { data: recentOrders = [], isLoading: loadingRecentOrders } =
    useGetOrdersQuery();

  const [state, setState] = useState({
    options: {
      chart: {
        type: "area",
        toolbar: { show: false },
        fontFamily: "inherit",
      },
      tooltip: {
        theme: "light",
        x: { format: "dd MMM yyyy" },
      },
      colors: ["#ec4899"],
      fill: {
        type: "gradient",
        gradient: {
          shadeIntensity: 1,
          opacityFrom: 0.45,
          opacityTo: 0.05,
          stops: [0, 95, 100],
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: "smooth",
        width: 3,
      },
      grid: {
        borderColor: "#fce7f3",
        strokeDashArray: 4,
      },
      markers: {
        size: 4,
        colors: ["#ec4899"],
        strokeColors: "#fff",
        strokeWidth: 2,
        hover: { size: 6 },
      },
      xaxis: {
        categories: [],
        labels: {
          style: {
            colors: "#64748b",
            fontSize: "11px",
            fontWeight: 600,
          },
        },
        axisBorder: { show: false },
        axisTicks: { show: false },
      },
      yaxis: {
        labels: {
          formatter: (val) => `$${val}`,
          style: {
            colors: "#64748b",
            fontSize: "11px",
            fontWeight: 600,
          },
        },
        min: 0,
      },
    },
    series: [{ name: "Revenue", data: [] }],
  });

  useEffect(() => {
    if (salesDetail && Array.isArray(salesDetail)) {
      const formattedSalesDate = salesDetail.map((item) => ({
        x: item._id,
        y: Number(item.totalSales || 0),
      }));

      setState((prevState) => ({
        ...prevState,
        options: {
          ...prevState.options,
          xaxis: {
            categories: formattedSalesDate.map((item) => item.x),
          },
        },
        series: [
          {
            name: "Revenue",
            data: formattedSalesDate.map((item) => item.y),
          },
        ],
      }));
    }
  }, [salesDetail]);

  const totalSalesVal = sales?.totalSales
    ? Number(sales.totalSales).toFixed(2)
    : "0.00";
  const totalCustomersVal = customers?.length || 0;
  const totalOrdersVal = orders?.totalOrders || 0;

  return (
    <div className="min-h-screen bg-[#fffafb]">
      <AdminMenu />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        {/* Header Title */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-8">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-pink-50 border border-pink-200 text-pink-600 text-xs font-bold uppercase tracking-wider mb-2">
              <HiSparkles size={13} className="text-pink-500" />
              <span>Real-Time Store Performance</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight">
              Executive Dashboard
            </h1>
          </div>

          <div className="flex items-center gap-2">
            <Link
              to="/admin/productlist"
              className="px-4 py-2 rounded-full bg-gradient-to-r from-pink-500 to-rose-400 hover:from-pink-600 hover:to-rose-500 text-white text-xs font-bold shadow-sm shadow-pink-200 transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <span>+ Add New Product</span>
            </Link>
          </div>
        </div>

        {/* 3 Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {/* Card 1: Total Sales */}
          <div className="bg-white rounded-3xl p-6 border border-pink-100 shadow-sm shadow-pink-100/50 hover:shadow-md transition-all">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-extrabold text-gray-500 uppercase tracking-wider">
                Total Revenue
              </span>
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-pink-500 to-rose-400 flex items-center justify-center text-white shadow-md shadow-pink-200">
                <FiDollarSign size={20} />
              </div>
            </div>
            <div className="flex items-baseline gap-2">
              <h2 className="text-3xl font-black text-gray-900">
                {loadingSales ? <Loader /> : `$${totalSalesVal}`}
              </h2>
            </div>
            <div className="mt-3 flex items-center gap-1.5 text-xs font-bold text-emerald-600">
              <FiTrendingUp size={14} />
              <span>Gross completed transactions</span>
            </div>
          </div>

          {/* Card 2: Customers */}
          <div className="bg-white rounded-3xl p-6 border border-pink-100 shadow-sm shadow-pink-100/50 hover:shadow-md transition-all">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-extrabold text-gray-500 uppercase tracking-wider">
                Total Customers
              </span>
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-rose-400 to-pink-500 flex items-center justify-center text-white shadow-md shadow-pink-200">
                <FiUsers size={20} />
              </div>
            </div>
            <div className="flex items-baseline gap-2">
              <h2 className="text-3xl font-black text-gray-900">
                {loadingCustomers ? <Loader /> : totalCustomersVal}
              </h2>
            </div>
            <div className="mt-3 flex items-center gap-1.5 text-xs font-bold text-pink-600">
              <HiSparkles size={14} />
              <span>Registered customer accounts</span>
            </div>
          </div>

          {/* Card 3: Total Orders */}
          <div className="bg-white rounded-3xl p-6 border border-pink-100 shadow-sm shadow-pink-100/50 hover:shadow-md transition-all">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-extrabold text-gray-500 uppercase tracking-wider">
                Total Orders
              </span>
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-pink-500 to-rose-400 flex items-center justify-center text-white shadow-md shadow-pink-200">
                <FiShoppingBag size={20} />
              </div>
            </div>
            <div className="flex items-baseline gap-2">
              <h2 className="text-3xl font-black text-gray-900">
                {loadingOrders ? <Loader /> : totalOrdersVal}
              </h2>
            </div>
            <div className="mt-3 flex items-center gap-1.5 text-xs font-bold text-indigo-600">
              <FiTrendingUp size={14} />
              <span>All processed order requests</span>
            </div>
          </div>
        </div>

        {/* Charts & Recent Activity Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Revenue Analytics Chart (8 cols) */}
          <div className="lg:col-span-8 bg-white rounded-3xl p-6 sm:p-8 border border-pink-100 shadow-sm shadow-pink-100/50">
            <div className="flex items-center justify-between pb-4 mb-4 border-b border-pink-50">
              <div>
                <h3 className="text-lg font-black text-gray-900">
                  Revenue Analytics
                </h3>
                <p className="text-xs text-gray-500 mt-0.5">
                  Daily store income and volume curve
                </p>
              </div>
              <span className="px-3 py-1 rounded-full bg-pink-50 text-pink-700 text-xs font-bold border border-pink-200">
                Live Data
              </span>
            </div>

            <div className="w-full overflow-hidden">
              <Chart
                options={state.options}
                series={state.series}
                type="area"
                height={320}
                width="100%"
              />
            </div>
          </div>

          {/* Recent Orders Side Table (4 cols) */}
          <div className="lg:col-span-4 bg-white rounded-3xl p-6 border border-pink-100 shadow-sm shadow-pink-100/50">
            <div className="flex items-center justify-between pb-4 mb-4 border-b border-pink-50">
              <div>
                <h3 className="text-base font-black text-gray-900">
                  Recent Orders
                </h3>
                <p className="text-xs text-gray-500">Latest customer orders</p>
              </div>
              <Link
                to="/admin/orderlist"
                className="text-xs font-bold text-pink-600 hover:text-pink-700 flex items-center gap-1"
              >
                <span>View All</span>
                <FiArrowRight size={12} />
              </Link>
            </div>

            {loadingRecentOrders ? (
              <div className="py-8 flex justify-center">
                <Loader />
              </div>
            ) : !Array.isArray(recentOrders) || recentOrders.length === 0 ? (
              <div className="py-8 text-center text-xs text-gray-400">
                No orders processed yet
              </div>
            ) : (
              <div className="space-y-3">
                {recentOrders.slice(0, 5).map((order) => {
                  const firstItem = order.orderItems?.[0];
                  const imgSrc = firstItem?.image
                    ? firstItem.image.replace(/\\/g, "/")
                    : "/hero-podium-bg.jpg";

                  return (
                    <div
                      key={order._id}
                      className="p-3 rounded-2xl bg-pink-50/30 hover:bg-pink-50/70 border border-pink-100/80 transition-all flex items-center justify-between gap-3"
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <img
                          src={imgSrc}
                          alt="item"
                          onError={(e) => {
                            e.currentTarget.onerror = null;
                            e.currentTarget.src =
                              "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&q=80";
                          }}
                          className="w-10 h-10 rounded-xl object-contain bg-white p-1 border border-pink-100 shrink-0"
                        />
                        <div className="min-w-0">
                          <p className="text-xs font-bold text-gray-900 truncate">
                            {order.user?.username || "Guest Buyer"}
                          </p>
                          <p className="text-[11px] text-gray-500">
                            ${Number(order.totalPrice || 0).toFixed(2)}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        <span
                          className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                            order.isPaid
                              ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                              : "bg-amber-50 text-amber-700 border border-amber-200"
                          }`}
                        >
                          {order.isPaid ? "Paid" : "Pending"}
                        </span>

                        <Link
                          to={`/order/${order._id}`}
                          className="p-1.5 rounded-lg bg-white hover:bg-pink-100 text-gray-600 hover:text-pink-600 border border-pink-100 transition-colors"
                          title="View Order Details"
                        >
                          <FiEye size={13} />
                        </Link>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
