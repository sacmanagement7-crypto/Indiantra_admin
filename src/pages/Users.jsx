import React, { useEffect, useState } from "react";
import { Search, Trash2, Mail, Phone, MapPin, User, Calendar, Shield, AlertTriangle } from "lucide-react";
// 👇 Import your API service
import { getAllusers } from "../services/api.service";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [deleteModal, setDeleteModal] = useState(null);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const fetchuser = async () => {
      try {
        const res = await getAllusers();
        setUsers(res.data.user);
        const userlen = res.data.user.length;
        localStorage.setItem('userlen',userlen);
      } catch (error) {
        console.error("❌ Failed to fetch users", error);
        alert("Something went wrong");
      } finally {
        setLoading(false);
      }
    };
    fetchuser();
  }, []);

  const handleDeleteUser = async (userId) => {
    setDeleting(true);
    try {
      // 👇 Replace with your actual delete API call
      // await deleteUser(userId);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setUsers(users.filter(user => user._id !== userId));
      setDeleteModal(null);
      alert("✅ User deleted successfully");
    } catch (error) {
      console.error("❌ Failed to delete user", error);
      alert("Failed to delete user");
    } finally {
      setDeleting(false);
    }
  };

  const filteredUsers = users.filter(user => {
    const search = searchTerm.toLowerCase();
    return (
      user.name?.toLowerCase().includes(search) ||
      user.email?.toLowerCase().includes(search) ||
      user.phone?.toLowerCase().includes(search)
    );
  });

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-amber-600 mx-auto"></div>
          <p className="mt-4 text-gray-700 font-medium">Loading users...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 p-6 md:p-10">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="bg-amber-600 p-3 rounded-xl">
              <User className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-800">User Management</h1>
              <p className="text-gray-600">Manage and monitor all registered users</p>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-amber-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 font-medium">Total Users</p>
                <p className="text-3xl font-bold text-gray-900 mt-1">{users.length}</p>
              </div>
              <div className="bg-amber-100 p-4 rounded-xl">
                <User className="w-8 h-8 text-amber-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-green-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 font-medium">Active Users</p>
                <p className="text-3xl font-bold text-gray-900 mt-1">{users.length}</p>
              </div>
              <div className="bg-green-100 p-4 rounded-xl">
                <Shield className="w-8 h-8 text-green-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-blue-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 font-medium">Search Results</p>
                <p className="text-3xl font-bold text-gray-900 mt-1">{filteredUsers.length}</p>
              </div>
              <div className="bg-blue-100 p-4 rounded-xl">
                <Search className="w-8 h-8 text-blue-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Search Bar */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search by name, email, or phone number..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all"
            />
          </div>
        </div>

        {/* No Users Found */}
        {filteredUsers.length === 0 && (
          <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
            <div className="bg-gray-100 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-4">
              <User className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">No users found</h3>
            <p className="text-gray-600">
              {searchTerm ? "Try adjusting your search terms" : "No users have been registered yet"}
            </p>
          </div>
        )}

        {/* Users Grid */}
        {filteredUsers.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredUsers.map((user) => (
              <div
                key={user._id}
                className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden group"
              >
                {/* Header with Avatar */}
                <div className="bg-gradient-to-r from-amber-500 to-orange-500 p-6 relative">
                  <div className="absolute top-4 right-4">
                    <button
                      onClick={() => setDeleteModal(user)}
                      className="bg-white/20 hover:bg-red-500 backdrop-blur-sm p-2 rounded-lg transition-all duration-300 group/delete"
                      title="Delete user"
                    >
                      <Trash2 className="w-5 h-5 text-white" />
                    </button>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 flex items-center justify-center rounded-full bg-white text-amber-600 font-bold text-2xl shadow-lg">
                      {user.name?.[0]?.toUpperCase() || "U"}
                    </div>
                    <div className="text-white">
                      <h2 className="font-bold text-xl">{user.name || "Unknown"}</h2>
                      <div className="flex items-center gap-1 mt-1">
                        <Calendar className="w-3 h-3" />
                        <span className="text-xs opacity-90">
                          Joined {formatDate(user.createdAt)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* User Details */}
                <div className="p-6 space-y-4">
                  {/* Email */}
                  <div className="flex items-start gap-3">
                    <div className="bg-blue-100 p-2 rounded-lg flex-shrink-0">
                      <Mail className="w-4 h-4 text-blue-600" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs text-gray-500 font-medium mb-1">Email Address</p>
                      <p className="text-sm text-gray-800 truncate">{user.email || "Not provided"}</p>
                    </div>
                  </div>

                  {/* Phone */}
                  <div className="flex items-start gap-3">
                    <div className="bg-green-100 p-2 rounded-lg flex-shrink-0">
                      <Phone className="w-4 h-4 text-green-600" />
                    </div>
                    <div className="flex-1">
                      <p className="text-xs text-gray-500 font-medium mb-1">Phone Number</p>
                      <p className="text-sm text-gray-800">{user.phone || "Not provided"}</p>
                    </div>
                  </div>

                  {/* Address */}
                  {user.address && (
                    <div className="flex items-start gap-3">
                      <div className="bg-purple-100 p-2 rounded-lg flex-shrink-0">
                        <MapPin className="w-4 h-4 text-purple-600" />
                      </div>
                      <div className="flex-1">
                        <p className="text-xs text-gray-500 font-medium mb-1">Address</p>
                        <p className="text-sm text-gray-800">
                          {user.address.street && `${user.address.street}, `}
                          {user.address.city && `${user.address.city}`}
                          {user.address.state && `, ${user.address.state}`}
                          {user.address.zip && ` - ${user.address.zip}`}
                        </p>
                      </div>
                    </div>
                  )}

                  {/* User ID */}
                  <div className="pt-3 border-t border-gray-100">
                    <p className="text-xs text-gray-500 font-medium mb-1">User ID</p>
                    <p className="text-xs text-gray-600 font-mono bg-gray-50 px-2 py-1 rounded">
                      {user._id}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      {deleteModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-md w-full shadow-2xl">
            {/* Modal Header */}
            <div className="bg-red-50 p-6 rounded-t-2xl border-b border-red-100">
              <div className="flex items-center gap-4">
                <div className="bg-red-100 p-3 rounded-full">
                  <AlertTriangle className="w-8 h-8 text-red-600" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900">Delete User</h3>
                  <p className="text-sm text-gray-600 mt-1">This action cannot be undone</p>
                </div>
              </div>
            </div>

            {/* Modal Body */}
            <div className="p-6">
              <div className="bg-gray-50 rounded-xl p-4 mb-4">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-12 h-12 flex items-center justify-center rounded-full bg-amber-100 text-amber-600 font-bold text-lg">
                    {deleteModal.name?.[0]?.toUpperCase() || "U"}
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">{deleteModal.name}</p>
                    <p className="text-sm text-gray-600">{deleteModal.email}</p>
                  </div>
                </div>
              </div>
              
              <p className="text-gray-700 mb-2">
                Are you sure you want to delete this user account?
              </p>
              <p className="text-sm text-gray-600">
                All user data, orders, and information will be permanently removed from the system.
              </p>
            </div>

            {/* Modal Footer */}
            <div className="bg-gray-50 p-6 rounded-b-2xl flex gap-3">
              <button
                onClick={() => setDeleteModal(null)}
                disabled={deleting}
                className="flex-1 px-4 py-3 border-2 border-gray-300 text-gray-700 font-semibold rounded-xl hover:bg-gray-100 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDeleteUser(deleteModal._id)}
                disabled={deleting}
                className="flex-1 px-4 py-3 bg-red-600 text-white font-semibold rounded-xl hover:bg-red-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {deleting ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    Deleting...
                  </>
                ) : (
                  <>
                    <Trash2 className="w-5 h-5" />
                    Delete User
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Users;