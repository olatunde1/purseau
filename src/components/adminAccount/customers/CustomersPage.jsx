import { useState, useRef, useEffect, useMemo } from "react";
import { Search, MoreHorizontal } from "lucide-react";
import { useNavigate } from "react-router-dom";
import useGetAdminUsers from "@/hooks/api/queries/admin/useGetAdminUsers";

const CustomersPage = () => {
  const [search, setSearch] = useState("");
  const [selectedRows, setSelectedRows] = useState([]);
  const [menuOpen, setMenuOpen] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const navigate = useNavigate();
  const menuRef = useRef(null);

  const { data, isPending } = useGetAdminUsers({ page: currentPage });
  const users = data?.data?.users?.items ?? [];
  const pagedInfo = data?.data?.users?.pagedInfo;

  // ✅ Search filter
  const filteredUsers = useMemo(() => {
    if (!search) return users;
    return users.filter(
      (user) =>
        `${user.firstName ?? ""} ${user.lastName ?? ""}`
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        (user.email ?? "").toLowerCase().includes(search.toLowerCase()) ||
        (user.phoneNumber ?? "").toLowerCase().includes(search.toLowerCase())
    );
  }, [search, users]);

  // ✅ Select all
  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedRows(filteredUsers.map((u) => u._id));
    } else {
      setSelectedRows([]);
    }
  };

  // ✅ Single select
  const handleRowSelect = (id) => {
    setSelectedRows((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const handleViewUser = (user) => {
    navigate("/admin/customer-information", { state: { user } });
  };

  // ✅ Close dropdown when clicked outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuOpen(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // ✅ Pagination controls
  const goToPage = (page) => {
    // console.log("Switching to page:", page);
    // if (page < 1 || page > pagedInfo?.total / itemsPerPage) return;
    setCurrentPage(page);
  };

  if (isPending) {
    return (
      <div className="w-full flex justify-center items-center h-64">
        <p className="text-gray-500">Loading customers...</p>
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-0 lg:p-0 max-w-7xl mx-auto relative">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
        <h1 className="text-xl sm:text-2xl font-bold text-gray-800">
          Customers
        </h1>
        <div className="relative w-full sm:w-64">
          <input
            type="text"
            placeholder="Search customer"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border rounded-lg pl-8 pr-3 py-2 text-sm w-full focus:ring-1 focus:ring-[#E94E30] outline-none"
          />
          <Search size={16} className="absolute left-2 top-2.5 text-gray-400" />
        </div>
      </div>

      {/* Table */}
      <div className="bg-white shadow rounded-lg overflow-x-auto">
        <table className="w-full text-sm min-w-[600px]">
          <thead className="bg-[#FFF4F0] text-[#878787]">
            <tr>
              <th className="p-3 text-center">
                <input
                  type="checkbox"
                  onChange={handleSelectAll}
                  checked={
                    filteredUsers.length > 0 &&
                    selectedRows.length === filteredUsers.length
                  }
                />
              </th>
              <th className="text-left p-3 py-5">Name</th>
              <th className="text-left p-3">Email</th>
              <th className="text-left p-3">Phone</th>
              <th className="text-left p-3">Verified</th>
              <th className="text-left p-3">Joined</th>
              <th className="p-3"></th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.length > 0 ? (
              filteredUsers.map((u, idx) => {
                const rowBg = idx % 2 === 0 ? "bg-white" : "bg-[#F8F8F8]";
                const fullName = `${u.firstName ?? ""} ${u.lastName ?? ""}`;
                const date = new Date(u.createdAt).toLocaleDateString();
                return (
                  <tr
                    key={u._id}
                    className={`border-t ${rowBg} hover:bg-gray-50 transition`}
                  >
                    <td className="p-3 text-center">
                      <input
                        type="checkbox"
                        checked={selectedRows.includes(u._id)}
                        onChange={() => handleRowSelect(u._id)}
                      />
                    </td>
                    <td className="p-3 py-5 font-medium">{fullName}</td>
                    <td className="p-3 text-gray-600">{u.email}</td>
                    <td className="p-3">{u.phoneNumber ?? "—"}</td>
                    <td className="p-3">
                      {u.isVerified ? (
                        <span className="text-green-600 font-medium">
                          Verified
                        </span>
                      ) : (
                        <span className="text-red-500 font-medium">
                          Unverified
                        </span>
                      )}
                    </td>
                    <td className="p-3 whitespace-nowrap">{date}</td>
                    <td className="p-3 text-center relative">
                      <button
                        className="p-1 hover:bg-gray-100 rounded"
                        onClick={() =>
                          setMenuOpen(menuOpen === u._id ? null : u._id)
                        }
                      >
                        <MoreHorizontal size={18} />
                      </button>

                      {menuOpen === u._id && (
                        <div
                          ref={menuRef}
                          className="absolute right-0 top-8 z-20 bg-white border rounded shadow-md p-2 min-w-[160px]"
                        >
                          <button
                            className="w-full text-center px-2 py-2 rounded hover:bg-gray-100 font-semibold"
                            onClick={() => {
                              setMenuOpen(null);
                              handleViewUser(u);
                            }}
                          >
                            View
                          </button>
                          <button
                            className="w-full text-center px-2 py-2 text-[#E94E30] hover:bg-red-50 rounded"
                            onClick={() => {
                              // handle delete if needed
                              setMenuOpen(null);
                            }}
                          >
                            Delete
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td
                  colSpan={7}
                  className="text-center py-6 text-gray-500 italic"
                >
                  No users found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {pagedInfo && (
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mt-6 text-sm">
          <div className="flex justify-center sm:justify-start gap-2 flex-wrap">
            <button
              onClick={() => goToPage(currentPage - 1)}
              disabled={!pagedInfo.hasPrevious}
              className="px-3 py-1 border rounded-lg disabled:opacity-50"
            >
              Prev
            </button>

            {/* Numbered Pagination */}
            {Array.from(
              { length: Math.ceil(pagedInfo.total / pagedInfo.limit) },
              (_, index) => (
                <button
                  key={index}
                  onClick={() => goToPage(index + 1)}
                  className={`px-3 py-1 border rounded-lg ${
                    currentPage === index + 1
                      ? "bg-[#E94E30] text-white border-[#E94E30]"
                      : "hover:bg-gray-100"
                  }`}
                >
                  {index + 1}
                </button>
              )
            )}

            <button
              onClick={() => goToPage(currentPage + 1)}
              disabled={!pagedInfo.hasNext}
              className="px-3 py-1 border rounded-lg disabled:opacity-50"
            >
              Next
            </button>
          </div>

          <p className="text-center sm:text-right text-gray-600">
            Showing {filteredUsers.length} of {pagedInfo.total} users
          </p>
        </div>
      )}
    </div>
  );
};

export default CustomersPage;
