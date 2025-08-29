import React, { useState, useMemo } from 'react';
import { Search, Filter, ArrowUpDown } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const initialOrders = [
    { id: 'PUR-15627927', customer: 'Ralph Edwards', category: 'Bags', items: 4, size: 'Medium', amount: '$8.99' },
    { id: 'PUR-15627928', customer: 'Eleanor Pena', category: 'Accessories', items: 24, size: 'XS', amount: '$17.84' },
    { id: 'PUR-15627929', customer: 'Bessie Cooper', category: 'Bags', items: 13, size: 'S', amount: '$11.70' },
    { id: 'PUR-15627930', customer: 'Wade Warren', category: 'Bags', items: 7, size: 'M', amount: '$5.22' },
    { id: 'PUR-15627931', customer: 'Darrell Steward', category: 'Shoes', items: 12, size: 'EU 36-37', amount: '$14.81' },
    { id: 'PUR-15627932', customer: 'Cameron Williamson', category: 'Shoes', items: 2, size: 'EU 37', amount: '$14.81' },
    { id: 'PUR-15627933', customer: 'Kathryn Murphy', category: 'Shoes', items: 1, size: 'EU 38', amount: '$6.48' },
    { id: 'PUR-15627934', customer: 'Savannah Nguyen', category: 'Shoes', items: 21, size: 'EU 39', amount: '$124.81' },
    { id: 'PUR-15627935', customer: 'Annette Black', category: 'Bags', items: 16, size: 'L', amount: '$17.84' },
    { id: 'PUR-15627936', customer: 'Jenny Wilson', category: 'Accessories', items: 5, size: 'XL', amount: '$14.81' },
    { id: 'PUR-15627937', customer: 'Theresa Webb', category: 'Shoes', items: 2, size: 'EU 40', amount: '$107.84' },
];

const statusColor = {
  Delivered: 'bg-green-100 text-green-700',
  Ongoing: 'bg-yellow-100 text-yellow-800',
  Cancelled: 'bg-gray-300 text-gray-800',
  Returned: 'bg-red-100 text-red-600',
  Pickup: 'bg-blue-100 text-blue-700',
};

const statusList = ['All', 'Delivered', 'Ongoing', 'Pickup', 'Returned', 'Cancelled'];

export default function AllProductList() {
  const [originalOrders] = useState(initialOrders);
  const [orders, setOrders] = useState(initialOrders);
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilter, setShowFilter] = useState(false);
  const [sortOption, setSortOption] = useState('');
  const [currentPage, setCurrentPage] = useState(1);



  const [selectedRows, setSelectedRows] = useState([]);

  const itemsPerPage = 10;

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
        order.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
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


  const navigate = useNavigate();

  const handleViewOrder = (order) => {
    navigate('/admin/order-details', { state: { order } });
  };

  // Modal state
  const [modalOrder, setModalOrder] = useState(null);

  const allSelected = paginatedOrders.length > 0 && paginatedOrders.every((order) => selectedRows.includes(order.id));

  const toggleSelectAll = () => {
    if (allSelected) {
      setSelectedRows([]);
    } else {
      const newSelection = paginatedOrders.map((order) => order.id);
      setSelectedRows(newSelection);
    }
  };

  return (
    <div className="w-full px-10">
      <div className="flex justify-between items-center mb-[53.94px]">
        <h1 className="text-2xl font-bold">Product List</h1>
        <button className="bg-[#E94E30] text-white px-4 py-2 rounded-xl">Create New Product</button>
      </div>

      <div className="flex items-center justify-between space-x-4 mb-6">
        <div className="relative w-1/3">
          <Search className="absolute top-3 left-2 text-gray-400" size={18} />
          <input
            type="text"
            placeholder="Search for category by name or ID"
            className="pl-8 pr-4 py-2 border-2 border-[#878787] rounded-2xl w-full"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
          />
        </div>

        <div className="action flex gap-3 relative">
          <div>
            <button
              className="flex items-center gap-2 border px-4 py-1.5 rounded bg-[#F2F2F7]"
              onClick={() => setShowFilter(!showFilter)}
            >
              <Filter size={16} /> Filter
            </button>
            {showFilter && (
              <div className="absolute top-12 right-0 bg-white border p-4 rounded shadow z-10">
                <label className="block mb-2 font-semibold text-sm text-gray-700">Filter by Status</label>
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

          <div className="relative">
            <select
              className="appearance-none pl-8 pr-4 py-2 border rounded text-sm w-[107px] text-gray-700 bg-[#F2F2F7] focus:outline-none"
              value={sortOption}
              onChange={(e) => handleSort(e.target.value)}
            >
              <option value="">Sort by</option>
              <option value="date-asc">Date (Oldest First)</option>
              <option value="date-desc">Date (Newest First)</option>
              <option value="amount-asc">Amount (Low to High)</option>
              <option value="amount-desc">Amount (High to Low)</option>
            </select>
            <ArrowUpDown className="absolute left-2 top-3 text-gray-500" size={16} />
          </div>
          <div>
            <p>...</p>
          </div>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full text-left border-t">
          <thead>
            <tr className="border-b text-[#878787] bg-[#FFF4F0]">
               <th className="py-[20.5px] px-4 font-normal">
                <input
                  type="checkbox"
                  checked={allSelected}
                  onChange={toggleSelectAll}
                  className="accent-[#E94E30]"
                />
              </th>
              <th className="py-[20.5px] px-4 font-normal">Product ID</th>
              <th className="py-[20.5px] px-4 font-normal">Name</th>
              <th className="py-[20.5px] px-4 font-normal">Price</th>
              <th className="py-[20.5px] px-4 font-normal">Category</th>
              <th className="py-[20.5px] px-4 font-normal">Quantity</th>
              <th className="py-[20.5px] px-4 font-normal">Size</th>
              <th className="py-[20.5px] px-4 font-normal"></th>
            </tr>
          </thead>
          <tbody>
            {paginatedOrders.map((order, index) => (
              <tr
                key={index}
                className={`cursor-pointer transition duration-200 ${
                  index % 2 === 0 ? 'bg-white' : 'bg-[#F4F4F6]'
                }`}
              >
                <td className="py-[20.5px] px-4">
                  <input
                    type="checkbox"
                    className="accent-[#E94E30]"
                    checked={selectedRows.includes(order.id)}
                    onChange={() => toggleSelectRow(order.id)}
                  />
                </td>
                <td className="py-[20.5px] px-4">{order.id}</td>
                <td className="py-[20.5px] px-4">{order.customer}</td>
                <td className="py-2 px-4">{order.amount}</td>
                <td className="py-[20.5px] px-4">{order.category}</td>
                <td className="py-[20.5px] px-4">{order.items}</td>
                <td className="py-[20.5px] px-4">{order.size}</td>
                
                <td className='py-2 px-4 font-bold cursor-pointer relative'>
                  <span onClick={() => setModalOrder(order)}>...</span>
                  {modalOrder && modalOrder.id === order.id && (
                    <div className="absolute right-0 top-6 z-20 bg-white border rounded shadow p-2 min-w-[178px]">
                      <button
                        className="w-full text-center px-1 py-2  rounded hover:text-[#E94E30] font-semibold"
                        onClick={() => {
                          setModalOrder(null);
                          handleViewOrder(order);
                        }}
                      >
                        Edit
                      </button>
                      <button
                        className="w-full font-medium text-center px-3 py-2 bg-[#FFE4DA] text-[#E94E30] hover:bg-[#E94E30] hover:text-white rounded"
                        onClick={() => setModalOrder(null)}
                      >
                        Remove
                      </button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex items-center justify-between mt-6 text-sm">
        <div className="flex items-center space-x-2">
          <button
            className="px-2 py-4 text-[#878787] hover:bg-[#E94E30] hover:text-white rounded"
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          >
            Prev
          </button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              className={`rounded ${
                currentPage === page
                  ? 'px-[12px] py-4 bg-[#E94E30] text-white'
                  : 'px-[12px] py-4 text-[#878787]'
              }`}
            >
              {page}
            </button>
          ))}
          <button
            className="px-2 py-4 text-[#878787] hover:bg-[#E94E30] hover:text-white rounded"
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
        <div>
          Showing {paginatedOrders.length} of {orders.length} Results
        </div>
      </div>
      {/* Optional: Overlay to close modal when clicking outside */}
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
