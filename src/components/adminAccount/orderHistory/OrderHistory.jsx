import { useState, useMemo } from 'react';
import { Search, Filter, ArrowUpDown } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const initialOrders = [
  { id: 'PUR-15627927', customer: 'Ralph Edwards', product: 'Prada Mini Bag', date: '2020-10-28', items: 4, status: 'Ongoing', amount: '$8.99' },
  { id: 'PUR-15627928', customer: 'Eleanor Pena', product: 'Gucci, 1995 Horsebit', date: '2020-10-23', items: 24, status: 'Ongoing', amount: '$17.84' },
  { id: 'PUR-15627929', customer: 'Bessie Cooper', product: 'Chanel, Boy Flap', date: '2020-10-30', items: 13, status: 'Delivered', amount: '$11.70' },
  { id: 'PUR-15627930', customer: 'Wade Warren', product: 'Hermès Birkin 25', date: '2020-11-01', items: 7, status: 'Cancelled', amount: '$5.22' },
  { id: 'PUR-15627931', customer: 'Darrell Steward', product: 'Gucci Mules', date: '2020-10-16', items: 12, status: 'Returned', amount: '$14.81' },
  { id: 'PUR-15627932', customer: 'Cameron Williamson', product: 'Jimmy Choo Pumps', date: '2020-10-27', items: 2, status: 'Delivered', amount: '$14.81' },
  { id: 'PUR-15627933', customer: 'Kathryn Murphy', product: 'Valentino Studded Shoe', date: '2020-10-29', items: 1, status: 'Delivered', amount: '$6.48' },
  { id: 'PUR-15627934', customer: 'Savannah Nguyen', product: 'Aquazurra Heels', date: '2020-10-17', items: 21, status: 'Pickup', amount: '$124.81' },
  { id: 'PUR-15627935', customer: 'Annette Black', product: 'Chanel, Boy Flap', date: '2020-10-20', items: 16, status: 'Delivered', amount: '$17.84' },
  { id: 'PUR-15627936', customer: 'Jenny Wilson', product: 'Gucci, 1995 Horsebit', date: '2020-10-25', items: 5, status: 'Cancelled', amount: '$14.81' },
  { id: 'PUR-15627937', customer: 'Theresa Webb', product: 'Valentino Studded Shoe', date: '2020-10-26', items: 2, status: 'Delivered', amount: '$107.84' },
];

const statusColor = {
  Delivered: 'bg-green-100 text-green-700',
  Ongoing: 'bg-yellow-100 text-yellow-800',
  Cancelled: 'bg-gray-300 text-gray-800',
  Returned: 'bg-red-100 text-red-600',
  Pickup: 'bg-blue-100 text-blue-700',
};

const statusList = ['All', 'Delivered', 'Ongoing', 'Pickup', 'Returned', 'Cancelled'];

export default function OrderHistory({ showCreateButton = true }) {
  const [originalOrders] = useState(initialOrders);
  const [orders, setOrders] = useState(initialOrders);
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilter, setShowFilter] = useState(false);
  const [sortOption, setSortOption] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const navigate = useNavigate();

  const handleSort = (value) => {
    setSortOption(value);
    let sorted = [...orders];
    switch (value) {
      case 'amount-asc':
        sorted.sort((a, b) => parseFloat(a.amount.slice(1)) - parseFloat(b.amount.slice(1)));
        break;
      case 'amount-desc':
        sorted.sort((a, b) => parseFloat(b.amount.slice(1)) - parseFloat(a.amount.slice(1)));
        break;
      case 'date-asc':
        sorted.sort((a, b) => new Date(a.date) - new Date(b.date));
        break;
      case 'date-desc':
        sorted.sort((a, b) => new Date(b.date) - new Date(a.date));
        break;
      default:
        sorted = [...originalOrders];
    }
    setOrders(sorted);
    setCurrentPage(1);
  };

  const filteredOrders = useMemo(() => {
    return orders.filter((order) => {
      const matchesStatus = selectedStatus === 'All' || order.status === selectedStatus;
      const matchesSearch =
        order.product.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.id.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesStatus && matchesSearch;
    });
  }, [orders, selectedStatus, searchTerm]);

  const paginatedOrders = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredOrders.slice(start, start + itemsPerPage);
  }, [filteredOrders, currentPage]);

  const totalPages = Math.ceil(filteredOrders.length / itemsPerPage);

  const counts = useMemo(() => {
    const count = { All: orders.length };
    orders.forEach((order) => {
      count[order.status] = (count[order.status] || 0) + 1;
    });
    return count;
  }, [orders]);

  const handleViewOrder = (order) => {
    navigate('/admin/order-details', { state: { order } });
  };

  const [modalOrder, setModalOrder] = useState(null);


  return (
    <div className="w-full px-4 sm:px-2 md:px-0 lg:px-0 py-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between sm:items-center mb-8 gap-4">
        <h1 className="text-xl sm:text-2xl font-bold">Orders History</h1>
      {showCreateButton && (
          <button className="bg-[#E94E30]  text-white px-4 py-2 rounded-md hover:bg-[#cd3213] transition">
            Create Order
          </button>
        )}
      </div>

      {/* Search + Filter + Sort */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div className="relative w-full md:w-1/3">
          <Search className="absolute top-3 left-2 text-gray-400" size={18} />
          <input
            type="text"
            placeholder="Search by product or ID"
            className="pl-8 pr-4 py-2 border border-gray-300 rounded-2xl w-full text-sm focus:outline-none focus:ring-2 focus:ring-[#E94E30]"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
          />
        </div>

        <div className="flex flex-wrap md:flex-nowrap gap-3 justify-between md:justify-end">
          {/* Filter */}
          <div className="relative">
            <button
              className="flex items-center gap-2 border px-4 py-2 rounded bg-[#F2F2F7] text-sm"
              onClick={() => setShowFilter(!showFilter)}
            >
              <Filter size={16} /> Filter
            </button>
            {showFilter && (
              <div className="absolute top-12 right-0 bg-white border p-4 rounded shadow z-10 w-40">
                <label className="block mb-2 font-semibold text-sm text-gray-700">Status</label>
                <select
                  className="border p-2 w-full rounded text-sm"
                  value={selectedStatus}
                  onChange={(e) => {
                    setSelectedStatus(e.target.value);
                    setShowFilter(false);
                    setCurrentPage(1);
                  }}
                >
                  {statusList.map((status) => (
                    <option key={status} value={status}>
                      {status}
                    </option>
                  ))}
                </select>
              </div>
            )}
          </div>

          {/* Sort */}
          <div className="relative">
            <ArrowUpDown className="absolute left-2 top-3 text-gray-500" size={16} />
            <select
              className="appearance-none pl-8 pr-4 py-2 border rounded text-sm w-full sm:w-[140px] bg-[#F2F2F7] text-gray-700 focus:outline-none"
              value={sortOption}
              onChange={(e) => handleSort(e.target.value)}
            >
              <option value="">Sort by</option>
              <option value="date-asc">Date ↑</option>
              <option value="date-desc">Date ↓</option>
              <option value="amount-asc">Amount ↑</option>
              <option value="amount-desc">Amount ↓</option>
            </select>
          </div>
        </div>
      </div>

      {/* Status Tabs */}
      <div className="flex flex-wrap justify-center sm:justify-start gap-4 mb-6 text-sm">
        {statusList.map((status) => (
          <span
            key={status}
            onClick={() => {
              setSelectedStatus(status);
              setCurrentPage(1);
            }}
            className={`font-semibold cursor-pointer ${
              selectedStatus === status ? 'text-[#E94E30]' : 'text-gray-700'
            }`}
          >
            {status.toUpperCase()} ({counts[status === 'All' ? 'All' : status] || 0})
          </span>
        ))}
      </div>

      {/* Table */}
      <div className="overflow-x-auto border rounded-md">
        <table className="min-w-full text-left text-sm">
          <thead>
            <tr className="border-b bg-[#FFF4F0] text-gray-600 text-xs sm:text-sm">
              <th className="py-3 px-4 font-medium">Order ID</th>
              <th className="py-3 px-4 font-medium">Customer</th>
              <th className="py-3 px-4 font-medium">Product</th>
              <th className="py-3 px-4 font-medium">Date</th>
              <th className="py-3 px-4 font-medium">Items</th>
              <th className="py-3 px-4 font-medium">Status</th>
              <th className="py-3 px-4 font-medium">Amount</th>
              <th className="py-3 px-4"></th>
            </tr>
          </thead>
          <tbody>
            {paginatedOrders.map((order, index) => (
              <tr
                key={order.id}
                className={`transition duration-200 ${
                  index % 2 === 0 ? 'bg-white' : 'bg-[#F9F9FB]'
                } hover:bg-[#FFEFEA]`}
              >
                <td className="py-3 px-4">{order.id}</td>
                <td className="py-3 px-4">{order.customer}</td>
                <td className="py-3 px-4">{order.product}</td>
                <td className="py-3 px-4">{new Date(order.date).toDateString()}</td>
                <td className="py-3 px-4">{order.items}</td>
                <td className="py-3 px-4">
                  <span className={`px-2 py-1 rounded text-xs font-medium ${statusColor[order.status]}`}>
                    {order.status}
                  </span>
                </td>
                <td className="py-3 px-4">{order.amount}</td>
                <td className="py-3 px-4 font-bold cursor-pointer relative">
                  <span onClick={() => setModalOrder(order)}>...</span>
                  {modalOrder && modalOrder.id === order.id && (
                    <div className="absolute right-0 top-6 z-20 bg-white border rounded shadow p-2 w-40">
                      <button
                        className="w-full text-left px-2 py-2 hover:bg-[#FFE4DA] hover:text-[#E94E30] rounded text-sm font-semibold"
                        onClick={() => {
                          setModalOrder(null);
                          handleViewOrder(order);
                        }}
                      >
                        View Details
                      </button>
                      <button
                        className="w-full text-left px-2 py-2 text-gray-500 hover:text-[#E94E30] hover:bg-gray-100 rounded text-sm"
                        onClick={() => setModalOrder(null)}
                      >
                        Cancel
                      </button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex flex-col sm:flex-row items-center justify-between mt-6 text-sm gap-3">
        <div className="flex items-center flex-wrap justify-center gap-2">
          <button
            className="px-3 py-2 text-gray-600 border rounded hover:bg-[#E94E30] hover:text-white disabled:opacity-50"
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          >
            Prev
          </button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              className={`px-3 py-2 border rounded ${
                currentPage === page
                  ? 'bg-[#E94E30] text-white'
                  : 'text-gray-600 hover:bg-[#FFEFEA]'
              }`}
            >
              {page}
            </button>
          ))}
          <button
            className="px-3 py-2 text-gray-600 border rounded hover:bg-[#E94E30] hover:text-white disabled:opacity-50"
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
        <p className="text-gray-500 text-center sm:text-right">
          Showing {paginatedOrders.length} of {orders.length} results
        </p>
      </div>

      {modalOrder && (
        <div
          className="fixed inset-0 z-10"
          onClick={() => setModalOrder(null)}
          style={{ background: 'transparent' }}
        />
      )}
    </div>
  );
}
