/* eslint-disable react-hooks/set-state-in-effect */
import Chart from "react-apexcharts";
import { useGetUsersQuery } from "../../redux/api/userApiSlice";
import {
  useGetTotalOrdersQuery,
  useGetTotalSalesByDateQuery,
  useGetTotalSalesQuery,
} from "../../redux/api/orderApiSlice";

import { useState, useEffect } from "react";
import AdminMenu from "./AdminMenu";
import OrderList from "./OrderList";
import Loader from "../../components/Loader";

const AdminDashboard = () => {
  const { data: sales, isLoading } = useGetTotalSalesQuery();
  const { data: customers, isLoading: loading } = useGetUsersQuery();
  const { data: orders, isLoading: loadingTwo } = useGetTotalOrdersQuery();
  const { data: salesDetail } = useGetTotalSalesByDateQuery();

    const [state, setState] = useState({
    options: {
      chart: {
        type: "line",
      },
      tooltip: {
        theme: "dark",
      },
      colors: ["#00E396"],
      dataLabels: {
        enabled: true,
      },
      stroke: {
        curve: "smooth",
      },
      title: {
        text: "Sales Trend",
        align: "left",
      },
      grid: {
        borderColor: "#ccc",
      },
      markers: {
        size: 1,
      },
      xaxis: {
        categories: [],
        title: {
          text: "Date",
        },
      },
      yaxis: {
        title: {
          text: "Sales",
        },
        min: 0,
      },
      legend: {
        position: "top",
        horizontalAlign: "right",
        floating: true,
        offsetY: -25,
        offsetX: -5,
      },
    },
    series: [{ name: "Sales", data: [] }],
  });

  useEffect(() => {
    if (salesDetail) {
      const formattedSalesDate = salesDetail.map((item) => ({
        x: item._id,
        y: item.totalSales,
      }))

     setState((prevState) => ({
        ...prevState,
        options: {
          ...prevState.options,
          xaxis: {
            categories: formattedSalesDate.map((item) => item.x),
          },
        },

        series: [
          { name: "Sales", data: formattedSalesDate.map((item) => item.y) },
        ],
      }));
    }
  }, [salesDetail]);
  return (
     <>
      <AdminMenu />

      <section className="px-2 md:px-8 xl:ml-16 md:ml-0">
        <div className="w-full max-w-7xl mx-auto flex flex-col md:flex-row md:justify-around flex-wrap gap-4">
          <div className="rounded-lg bg-black p-5 w-full sm:w-64 md:w-80 mt-5">
            <div className="font-bold rounded-full w-12 bg-pink-500 text-center p-3 mx-auto">
              $
            </div>

            <p className="mt-5">Sales</p>
            <h1 className="text-xl font-bold">
              $ {isLoading ? <Loader /> : sales.totalSales.toFixed(2)}
            </h1>
          </div>
          <div className="rounded-lg bg-black p-5 w-full sm:w-64 md:w-80 mt-5">
            <div className="font-bold rounded-full w-12 bg-pink-500 text-center p-3 mx-auto">
              $
            </div>

            <p className="mt-5">Customers</p>
            <h1 className="text-xl font-bold">
              $ {isLoading ? <Loader /> : customers?.length}
            </h1>
          </div>
          <div className="rounded-lg bg-black p-5 w-full sm:w-64 md:w-80 mt-5">
            <div className="font-bold rounded-full w-12 bg-pink-500 text-center p-3 mx-auto">
              $
            </div>

            <p className="mt-5">All Orders</p>
            <h1 className="text-xl font-bold">
              $ {isLoading ? <Loader /> : orders?.totalOrders}
            </h1>
          </div>
        </div>

        <div className="w-full flex flex-col lg:flex-row gap-8 mt-8">
          <div className="w-full lg:w-2/3">
            <Chart
              options={state.options}
              series={state.series}
              type="bar"
              width="100%"
            />
          </div>
          <div className="w-full lg:w-1/3">
            <OrderList />
          </div>
        </div>
      </section>
    </>
  )
}

export default AdminDashboard