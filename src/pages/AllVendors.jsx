import React, { useEffect, useState } from 'react';
import { getAllVendors, changeStatus } from "../services/api.service";
import { Store, Mail, Phone, MapPin, CheckCircle, XCircle, Clock, Ban, Eye, Edit, Trash2, Search, Filter, FileText, Building, CreditCard, Image } from 'lucide-react';
const apiUrl = import.meta.env.REACT_APP_API_URL;

const AllVendors = () => {

    const [vendors, setVendors] = useState([]);
    const [filteredVendors, setFilteredVendors] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');
    const [selectedVendor, setSelectedVendor] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [loading, setLoading] = useState(true);
    const [status, setStatus] = useState(true);

    useEffect(() => {
        fetchVendors();
    }, []);

    useEffect(() => {
        filterVendors();
    }, [searchTerm, statusFilter, vendors]);

    const fetchVendors = async () => {
        try {
            setLoading(true);
            const res = await getAllVendors();
            console.log("Vendors fetched:", res.data.vendors);
            setVendors(res.data.vendors);
            setFilteredVendors(res.data.vendors);
        } catch (error) {
            console.error("Failed to fetch vendors", error);
        } finally {
            setLoading(false);
        }
    };

    const filterVendors = () => {
        let filtered = vendors;

        // Search filter
        if (searchTerm) {
            filtered = filtered.filter(vendor =>
                vendor.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                vendor.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                vendor.shopName?.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        // Status filter
        if (statusFilter !== 'all') {
            filtered = filtered.filter(vendor => vendor.status === statusFilter);
        }

        setFilteredVendors(filtered);
    };

    const handleStatusChange = async (vendorId, newStatus) => {
        const data = {
            status: newStatus,
            reasonForRejection: "Nothing casual"
        };
        try {
            const res = await changeStatus(vendorId, data); // call API
            alert("Updated Successfully");
            console.log(res.data);
        } catch (error) {
            console.error(error);
            alert("Error Occurred");
        }
        await fetchVendors(); // refresh list
    };


    const handleDelete = async (vendorId) => {
        if (window.confirm('Are you sure you want to delete this vendor?')) {
            // Call API to delete vendor
            console.log(`Deleting vendor ${vendorId}`);
            await fetchVendors();
        }
    };

    const viewVendorDetails = (vendor) => {
        setSelectedVendor(vendor);
        setShowModal(true);
    };

    const getStatusBadge = (status) => {
        const statusConfig = {
            pending: { bg: 'bg-yellow-100', text: 'text-yellow-800', icon: Clock, label: 'Pending' },
            approved: { bg: 'bg-green-100', text: 'text-green-800', icon: CheckCircle, label: 'Approved' },
            rejected: { bg: 'bg-red-100', text: 'text-red-800', icon: XCircle, label: 'Rejected' },
            suspended: { bg: 'bg-gray-100', text: 'text-gray-800', icon: Ban, label: 'Suspended' }
        };

        const config = statusConfig[status] || statusConfig.pending;
        const Icon = config.icon;

        return (
            <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold ${config.bg} ${config.text}`}>
                <Icon className="w-3 h-3" />
                {config.label}
            </span>
        );
    };

    const stats = {
        total: vendors.length,
        pending: vendors.filter(v => v.status === 'pending').length,
        approved: vendors.filter(v => v.status === 'approved').length,
        rejected: vendors.filter(v => v.status === 'rejected').length
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
                    <p className="text-gray-600">Loading vendors...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 py-8 px-4 pt-2 ml-0 md:ml-2">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-4xl font-bold text-gray-800 mb-2 flex items-center gap-3">
                        <Store className="w-10 h-10 text-orange-600" />
                        Vendor Management
                    </h1>
                    <p className="text-gray-600">Manage all registered vendors and their applications</p>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
                    <div className="bg-white rounded-2xl shadow-md p-6 border-l-4 border-orange-500">
                        <p className="text-sm text-gray-600 mb-1">Total Vendors</p>
                        <p className="text-3xl font-bold text-gray-800">{stats.total}</p>
                    </div>
                    <div className="bg-white rounded-2xl shadow-md p-6 border-l-4 border-amber-500">
                        <p className="text-sm text-gray-600 mb-1">Pending</p>
                        <p className="text-3xl font-bold text-amber-600">{stats.pending}</p>
                    </div>
                    <div className="bg-white rounded-2xl shadow-md p-6 border-l-4 border-green-500">
                        <p className="text-sm text-gray-600 mb-1">Approved</p>
                        <p className="text-3xl font-bold text-green-600">{stats.approved}</p>
                    </div>
                    <div className="bg-white rounded-2xl shadow-md p-6 border-l-4 border-red-500">
                        <p className="text-sm text-gray-600 mb-1">Rejected</p>
                        <p className="text-3xl font-bold text-red-600">{stats.rejected}</p>
                    </div>
                </div>

                {/* Filters */}
                <div className="bg-white rounded-2xl shadow-md p-6 mb-8">
                    <div className="flex flex-col md:flex-row gap-4">
                        {/* Search */}
                        <div className="flex-1 relative">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                            <input
                                type="text"
                                placeholder="Search by name, email, or shop name..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-400 focus:border-blue-400 outline-none"
                            />
                        </div>

                        {/* Status Filter */}
                        <div className="relative">
                            <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                            <select
                                value={statusFilter}
                                onChange={(e) => setStatusFilter(e.target.value)}
                                className="pl-10 pr-8 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-400 focus:border-blue-400 outline-none appearance-none bg-white min-w-[180px]"
                            >
                                <option value="all">All Status</option>
                                <option value="pending">Pending</option>
                                <option value="approved">Approved</option>
                                <option value="rejected">Rejected</option>
                                <option value="suspended">Suspended</option>
                            </select>
                        </div>
                    </div>
                </div>

                {/* Vendors List */}
                <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                    {filteredVendors.length > 0 ? (
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
                                    <tr>
                                        <th className="px-6 py-4 text-left text-sm font-semibold">Vendor Info</th>
                                        <th className="px-6 py-4 text-left text-sm font-semibold">Contact</th>
                                        <th className="px-6 py-4 text-left text-sm font-semibold">Business</th>
                                        <th className="px-6 py-4 text-left text-sm font-semibold">Status</th>
                                        <th className="px-6 py-4 text-center text-sm font-semibold">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200">
                                    {filteredVendors.map((vendor) => (
                                        <tr key={vendor._id} className="hover:bg-gray-50 transition-colors">
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-3">
                                                    {vendor.shopLogo ? (
                                                        <img src={vendor.shopLogo} alt={vendor.shopName} className="w-12 h-12 rounded-full object-cover border-2 border-gray-200" />
                                                    ) : (
                                                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-400 to-indigo-500 flex items-center justify-center text-white font-bold">
                                                            {vendor.name?.charAt(0)}
                                                        </div>
                                                    )}
                                                    <div>
                                                        <p className="font-semibold text-gray-800">{vendor.name}</p>
                                                        <p className="text-xs text-gray-500">{vendor.shopName}</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="space-y-1">
                                                    <p className="text-sm text-gray-700 flex items-center gap-2">
                                                        <Mail className="w-4 h-4 text-gray-400" />
                                                        {vendor.email}
                                                    </p>
                                                    <p className="text-sm text-gray-700 flex items-center gap-2">
                                                        <Phone className="w-4 h-4 text-gray-400" />
                                                        {vendor.phone}
                                                    </p>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="space-y-1">
                                                    <p className="text-sm font-medium text-gray-800">{vendor.businessType}</p>
                                                    <p className="text-xs text-gray-500 flex items-center gap-1">
                                                        <MapPin className="w-3 h-3" />
                                                        {vendor.city}, {vendor.state}
                                                    </p>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                {getStatusBadge(vendor.status)}
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex items-center justify-center gap-2">
                                                    <button
                                                        onClick={() => viewVendorDetails(vendor)}
                                                        className="p-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 transition-colors"
                                                        title="View Details"
                                                    >
                                                        <Eye className="w-4 h-4" />
                                                    </button>
                                                    <button
                                                        className="p-2 bg-green-100 text-green-600 rounded-lg hover:bg-green-200 transition-colors"
                                                        title="Edit"
                                                    >
                                                        <Edit className="w-4 h-4" />
                                                    </button>
                                                    <button
                                                        onClick={() => handleDelete(vendor._id)}
                                                        className="p-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-colors"
                                                        title="Delete"
                                                    >
                                                        <Trash2 className="w-4 h-4" />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    ) : (
                        <div className="text-center py-16">
                            <Store className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                            <p className="text-gray-500 text-lg font-medium">No vendors found</p>
                            <p className="text-gray-400 text-sm">Try adjusting your search or filter criteria</p>
                        </div>
                    )}
                </div>
            </div>

            {/* Vendor Details Modal */}
            {showModal && selectedVendor && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 ml-64">
                    <div className="bg-white rounded-3xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
                        <div className="sticky top-0 bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-6 rounded-t-3xl">
                            <div className="flex justify-between items-start">
                                <div>
                                    <h2 className="text-2xl font-bold mb-2">{selectedVendor.name}</h2>
                                    <p className="text-blue-100">{selectedVendor.shopName}</p>
                                </div>
                                <button
                                    onClick={() => setShowModal(false)}
                                    className="text-white hover:bg-white hover:bg-opacity-20 p-2 rounded-lg transition-colors"
                                >
                                    ✕
                                </button>
                            </div>
                        </div>

                        <div className="p-6 space-y-6">
                            {/* Status Actions */}
                            <div className="bg-gray-50 rounded-2xl p-6">
                                <h3 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
                                    <CheckCircle className="w-5 h-5 text-blue-600" />
                                    Change Vendor Status
                                </h3>
                                <div className="flex flex-wrap gap-3">
                                    <button
                                        onClick={() => handleStatusChange(selectedVendor._id, 'approved')}
                                        className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors font-medium"
                                    >
                                        ✓ Approve
                                    </button>
                                    <button
                                        onClick={() => handleStatusChange(selectedVendor._id, 'rejected')}
                                        className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors font-medium"
                                    >
                                        ✕ Reject
                                    </button>
                                    <button
                                        onClick={() => handleStatusChange(selectedVendor._id, 'suspended')}
                                        className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors font-medium"
                                    >
                                        ⊘ Suspend
                                    </button>
                                    <button
                                        onClick={() => handleStatusChange(selectedVendor._id, 'pending')}
                                        className="px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition-colors font-medium"
                                    >
                                        ⏳ Set Pending
                                    </button>
                                </div>
                            </div>

                            {/* Personal Info */}
                            <div className="bg-blue-50 rounded-2xl p-6">
                                <h3 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
                                    <FileText className="w-5 h-5 text-blue-600" />
                                    Personal Information
                                </h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <p className="text-sm text-gray-600">Email</p>
                                        <p className="font-medium text-gray-800">{selectedVendor.email}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-600">Phone</p>
                                        <p className="font-medium text-gray-800">{selectedVendor.phone}</p>
                                    </div>
                                </div>
                            </div>

                            {/* Business Info */}
                            <div className="bg-purple-50 rounded-2xl p-6">
                                <h3 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
                                    <Building className="w-5 h-5 text-purple-600" />
                                    Business Information
                                </h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <p className="text-sm text-gray-600">Business Type</p>
                                        <p className="font-medium text-gray-800">{selectedVendor.businessType}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-600">GST Number</p>
                                        <p className="font-medium text-gray-800">{selectedVendor.gst || 'N/A'}</p>
                                    </div>
                                    <div className="md:col-span-2">
                                        <p className="text-sm text-gray-600">Address</p>
                                        <p className="font-medium text-gray-800">
                                            {selectedVendor.address}, {selectedVendor.city}, {selectedVendor.state} - {selectedVendor.pincode}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Bank Info */}
                            <div className="bg-green-50 rounded-2xl p-6">
                                <h3 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
                                    <CreditCard className="w-5 h-5 text-green-600" />
                                    Bank Details
                                </h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <p className="text-sm text-gray-600">Bank Name</p>
                                        <p className="font-medium text-gray-800">{selectedVendor.bankName}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-600">Account Holder</p>
                                        <p className="font-medium text-gray-800">{selectedVendor.accountHolderName}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-600">Account Number</p>
                                        <p className="font-medium text-gray-800">{selectedVendor.accountNumber}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-600">IFSC Code</p>
                                        <p className="font-medium text-gray-800">{selectedVendor.ifsc}</p>
                                    </div>
                                </div>
                            </div>

                            {/* Documents */}
                            <div className="bg-orange-50 rounded-2xl p-6">
                                <h3 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
                                    <Image className="w-5 h-5 text-orange-600" />
                                    Uploaded Documents
                                </h3>
                                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                    {selectedVendor.idProof && (
                                        <a
                                            href={`https://api.indiantra.com/${selectedVendor.idProof.replace(/\\/g, "/")}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="p-3 bg-white rounded-lg border-2 border-gray-200 hover:border-orange-400 transition-colors text-center"
                                        >
                                            <FileText className="w-6 h-6 text-orange-600 mx-auto mb-1" />
                                            <p className="text-xs font-medium text-gray-700">ID Proof</p>
                                        </a>
                                    )}
                                    {selectedVendor.panCard && (
                                        <a
                                            href={`https://api.indiantra.com/${selectedVendor.panCard.replace(/\\/g, "/")}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="p-3 bg-white rounded-lg border-2 border-gray-200 hover:border-orange-400 transition-colors text-center"
                                        >
                                            <FileText className="w-6 h-6 text-orange-600 mx-auto mb-1" />
                                            <p className="text-xs font-medium text-gray-700">PAN Card</p>
                                        </a>
                                    )}
                                    {selectedVendor.gstCertificate && (
                                        <a
                                            href={`https://api.indiantra.com/${selectedVendor.gstCertificate.replace(/\\/g, "/")}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="p-3 bg-white rounded-lg border-2 border-gray-200 hover:border-orange-400 transition-colors text-center"
                                        >
                                            <FileText className="w-6 h-6 text-orange-600 mx-auto mb-1" />
                                            <p className="text-xs font-medium text-gray-700">GST Certificate</p>
                                        </a>
                                    )}
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AllVendors;