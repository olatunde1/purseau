import { useMemo } from "react";
import {
  ArrowUpRight,
  ArrowDownRight,
  Plus,
  MoreHorizontal,
} from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import useGetAdminOverview from "@/hooks/api/queries/admin/useGetAdminOverview";

const OverviewPage = () => {
  const { data: overview, isPending } = useGetAdminOverview();

  const overviewData = overview?.data || {};

  // const data = useMemo(
  //   () => [
  //     { month: "Jan", Orders: 60, Revenue: 70, Customers: 50 },
  //     { month: "Feb", Orders: 40, Revenue: 50, Customers: 40 },
  //     { month: "Mar", Orders: 80, Revenue: 90, Customers: 70 },
  //     { month: "Apr", Orders: 70, Revenue: 60, Customers: 50 },
  //     { month: "May", Orders: 50, Revenue: 40, Customers: 60 },
  //     { month: "Jun", Orders: 90, Revenue: 100, Customers: 80 },
  //     { month: "Jul", Orders: 80, Revenue: 85, Customers: 70 },
  //     { month: "Aug", Orders: 75, Revenue: 70, Customers: 65 },
  //     { month: "Sep", Orders: 60, Revenue: 55, Customers: 50 },
  //     { month: "Oct", Orders: 95, Revenue: 90, Customers: 85 },
  //     { month: "Nov", Orders: 70, Revenue: 60, Customers: 55 },
  //     { month: "Dec", Orders: 85, Revenue: 95, Customers: 75 },
  //   ],
  //   []
  // );

  const data = useMemo(() => {
    if (!overviewData?.monthlyPerformance) return [];

    const monthNames = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];

    return overviewData.monthlyPerformance.map((item) => ({
      month: monthNames[item.month - 1] || `M${item.month}`,
      Orders: Number(item.totalOrders) || 0,
      Revenue: Number(item.totalRevenue) || 0,
      Customers: Number(item.totalUsers) || 0,
    }));
  }, [overviewData]);

  const orders = [
    {
      id: "PUR-15627927",
      customer: "Ralph Edwards",
      product: "Prada Mini Bag",
      date: "Oct 28, 2020",
      items: 4,
      status: "Ongoing",
      amount: "$8.99",
    },
    {
      id: "PUR-15627928",
      customer: "Eleanor Pena",
      product: "Gucci, 1995 Horsebit",
      date: "Oct 23, 2020",
      items: 24,
      status: "Ongoing",
      amount: "$17.84",
    },
    {
      id: "PUR-15627929",
      customer: "Bessie Cooper",
      product: "Chanel, Boy Flap",
      date: "Oct 30, 2020",
      items: 13,
      status: "Delivered",
      amount: "$11.70",
    },
    {
      id: "PUR-15627930",
      customer: "Wade Warren",
      product: "Hermès Birkin 25",
      date: "Nov 01, 2020",
      items: 7,
      status: "Cancelled",
      amount: "$5.22",
    },
    {
      id: "PUR-15627931",
      customer: "Darrell Steward",
      product: "Gucci Mules",
      date: "Oct 16, 2020",
      items: 12,
      status: "Returned",
      amount: "$14.81",
    },
    {
      id: "PUR-15627932",
      customer: "Cameron Williamson",
      product: "Jimmy Choo Pumps",
      date: "Oct 27, 2020",
      items: 2,
      status: "Delivered",
      amount: "$14.81",
    },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case "Delivered":
        return "text-green-700 bg-green-100";
      case "Ongoing":
        return "text-yellow-700 bg-yellow-100";
      case "Cancelled":
        return "text-red-700 bg-red-100";
      case "Returned":
        return "text-orange-700 bg-orange-100";
      case "Pickup":
        return "text-blue-700 bg-blue-100";
      default:
        return "text-gray-700 bg-gray-100";
    }
  };

  return (
    <div className="w-full min-h-screen bg-gray-50 p-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <h1 className="text-2xl font-semibold text-gray-800 mb-4 md:mb-0">
          Overview
        </h1>
        <button className="flex items-center gap-2 bg-[#E94E30] text-white px-5 py-2 rounded-lg hover:bg-[#bf290b] transition w-fit">
          <Plus size={18} /> Create New Product
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
        <div className="bg-white p-2 rounded-xl shadow-sm">
          <p className="text-gray-500 text-sm">Total Orders</p>
          <h2 className="text-2xl font-bold mt-2">
            {overviewData?.totalOrders || 0}
          </h2>
          {/* <div className="flex items-center gap-2 mt-1 text-green-600 text-sm font-medium">
            <ArrowUpRight size={16} /> +25% since last month
          </div> */}
        </div>

        <div className="bg-white p-2 rounded-xl shadow-sm">
          <p className="text-gray-500 text-sm">Total Revenue</p>
          <h2 className="text-2xl font-bold mt-2">
            ₦{overviewData?.totalRevenue?.toLocaleString() || 0}
          </h2>
          {/* <div className="flex items-center gap-2 mt-1 text-green-600 text-sm font-medium">
            <ArrowUpRight size={16} /> +25% since last month
          </div> */}
        </div>

        <div className="bg-white p-2 rounded-xl shadow-sm">
          <p className="text-gray-500 text-sm">Total Customers</p>
          <h2 className="text-2xl font-bold mt-2">
            {overviewData?.totalUsers || 0}
          </h2>
          {/* <div className="flex items-center gap-2 mt-1 text-red-600 text-sm font-medium">
            <ArrowDownRight size={16} /> -13% since last month
          </div> */}
        </div>
      </div>

      {/* Chart */}
      <div className="bg-white p-3 rounded-xl shadow-sm mb-10">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-gray-700">
            Performance Summary
          </h2>
          <span className="text-sm text-gray-500">2025</span>
        </div>

        <ResponsiveContainer width="100%" height={320}>
          <BarChart
            data={data}
            margin={{ top: 20, right: 40, left: 40, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />

            {/* Left axis (Orders + Customers) */}
            <YAxis
              yAxisId="left"
              label={{
                value: "Orders / Customers",
                angle: -90,
                position: "right",
                style: { textAnchor: "middle", fill: "#555", fontSize: 12 },
              }}
            />

            {/* Right axis (Revenue) */}
            <YAxis
              yAxisId="right"
              orientation="right"
              label={{
                value: "Revenue (₦)",
                angle: 90,
                position: "left",
                style: { textAnchor: "middle", fill: "#555", fontSize: 12 },
              }}
            />

            <Tooltip />
            <Legend />

            {/* Bars */}
            <Bar
              yAxisId="left"
              dataKey="Orders"
              fill="#E94E30"
              radius={[6, 6, 0, 0]}
              barSize={15}
            />
            <Bar
              yAxisId="left"
              dataKey="Customers"
              fill="#C7A17A"
              radius={[6, 6, 0, 0]}
              barSize={15}
            />
            <Bar
              yAxisId="right"
              dataKey="Revenue"
              fill="#00A878"
              radius={[6, 6, 0, 0]}
              barSize={15}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Order History */}
      <div className="flex justify-between items-center pt-8 mb-8">
        <h2 className="text-lg font-semibold text-gray-700">Order History</h2>
        <button className="bg-[#E94E30] text-white px-5 py-2 rounded-lg hover:bg-[#bf290b] transition w-fit">
          View More
        </button>
      </div>
      <div className="bg-white rounded-xl shadow-sm  pb-4 sm:p-0 overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead>
            <tr className="border-b text-gray-600">
              <th className="text-left py-3 px-2">Order ID</th>
              <th className="text-left py-3 px-2">Customer</th>
              <th className="text-left py-3 px-2">Product</th>
              <th className="text-left py-3 px-2">Date</th>
              <th className="text-left py-3 px-2">Items</th>
              <th className="text-left py-3 px-2">Status</th>
              <th className="text-left py-3 px-2">Amount</th>
              <th className="text-center py-3 px-2">...</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr
                key={order.id}
                className="border-b hover:bg-gray-50 transition"
              >
                <td className="py-3 px-2">{order.id}</td>
                <td className="py-3 px-2">{order.customer}</td>
                <td className="py-3 px-2">{order.product}</td>
                <td className="py-3 px-2">{order.date}</td>
                <td className="py-3 px-2">{order.items} Items</td>
                <td className="py-3 px-2">
                  <span
                    className={`px-3 py-1 rounded-md text-xs font-medium ${getStatusColor(
                      order.status
                    )}`}
                  >
                    {order.status}
                  </span>
                </td>
                <td className="py-3 px-2">{order.amount}</td>
                <td className="py-3 px-2 text-center">
                  <button className="p-1 rounded hover:bg-gray-100">
                    <MoreHorizontal size={18} className="text-gray-600" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OverviewPage;
