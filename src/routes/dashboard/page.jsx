import { useState } from "react";
import {
  Users,
  ShoppingCart,
  Package,
  DollarSign,
  TrendingUp,
  TrendingDown,
  Clock,
  CheckCircle,
  Calendar,
  Store,
  Star,
  Activity,
  ArrowUpRight
} from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";

const DashboardPage = () => {
  const userlen = localStorage.getItem('userlen');
  // Mock data - replace with actual API calls
  const stats = {
    totalCustomers: userlen,
    totalProducts: 456,
    totalRevenue: 89750,
    pendingOrders: 23,
    completedOrders: 1198,
    activeVendors: 47,
    totalReviews: 3421
  };

  const changes = {
    customers: 12.5,
    orders: 8.3,
    products: -2.1,
    revenue: 15.8
  };

  // Chart data
  const revenueData = [
    { name: "Mon", revenue: 4200 },
    { name: "Tue", revenue: 5100 },
    { name: "Wed", revenue: 4800 },
    { name: "Thu", revenue: 6200 },
    { name: "Fri", revenue: 7100 },
    { name: "Sat", revenue: 8500 },
    { name: "Sun", revenue: 6800 }
  ];

  const categoryData = [
    { name: "Electronics", value: 35, color: "#3b82f6" },
    { name: "Fashion", value: 25, color: "#ec4899" },
    { name: "Home & Garden", value: 20, color: "#10b981" },
    { name: "Sports", value: 12, color: "#f59e0b" },
    { name: "Others", value: 8, color: "#8b5cf6" }
  ];

  const recentOrders = [
    { id: "#ORD-2847", customer: "John Doe", amount: 249.99, status: "completed", time: "2 mins ago" },
    { id: "#ORD-2846", customer: "Jane Smith", amount: 189.50, status: "pending", time: "15 mins ago" },
    { id: "#ORD-2845", customer: "Mike Johnson", amount: 399.99, status: "processing", time: "1 hour ago" },
    { id: "#ORD-2844", customer: "Sarah Williams", amount: 149.99, status: "completed", time: "2 hours ago" },
    { id: "#ORD-2843", customer: "Tom Brown", amount: 599.00, status: "completed", time: "3 hours ago" }
  ];

  const topProducts = [
    { name: "Wireless Headphones", sales: 234, revenue: 23400, trend: "up" },
    { name: "Smart Watch", sales: 189, revenue: 37800, trend: "up" },
    { name: "Laptop Stand", sales: 156, revenue: 7800, trend: "down" },
    { name: "USB-C Cable", sales: 423, revenue: 8460, trend: "up" },
    { name: "Phone Case", sales: 312, revenue: 6240, trend: "up" }
  ];

  const StatCard = ({ icon: Icon, title, value, change, color, subtitle }) => (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 hover:shadow-lg transition-all duration-300 hover:scale-[1.02]">
      <div className="flex items-start justify-between mb-4">
        <div className={`rounded-xl p-3 ${color}`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
        {change !== undefined && (
          <div className={`flex items-center gap-1 text-sm font-semibold ${
            change >= 0 ? "text-green-600" : "text-red-600"
          }`}>
            {change >= 0 ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
            {Math.abs(change)}%
          </div>
        )}
      </div>
      <h3 className="text-slate-600 text-sm font-medium mb-1">{title}</h3>
      <p className="text-3xl font-bold text-slate-900 mb-1">
        {value}
      </p>
      {subtitle && (
        <p className="text-xs text-slate-500">{subtitle}</p>
      )}
    </div>
  );

  const getStatusColor = (status) => {
    switch(status) {
      case "completed": return "bg-green-100 text-green-700";
      case "pending": return "bg-yellow-100 text-yellow-700";
      case "processing": return "bg-blue-100 text-blue-700";
      default: return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-slate-900 mb-2">
            Dashboard Overview
          </h1>
          <p className="text-slate-600 flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard
            icon={Users}
            title="Total Customers"
            // value={stats.totalCustomers.toLocaleString()}
            change={changes.customers}
            color="bg-gradient-to-br from-blue-500 to-blue-600"
            subtitle="Active users"
          />
        </div>

        {/* Secondary Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white rounded-xl p-4 shadow-sm border border-slate-200">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-100 rounded-lg">
                <CheckCircle className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-slate-900">{stats.completedOrders}</p>
                <p className="text-xs text-slate-600">Completed Orders</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-sm border border-slate-200">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-yellow-100 rounded-lg">
                <Clock className="w-5 h-5 text-yellow-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-slate-900">{stats.pendingOrders}</p>
                <p className="text-xs text-slate-600">Pending Orders</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-sm border border-slate-200">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-indigo-100 rounded-lg">
                <Store className="w-5 h-5 text-indigo-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-slate-900">{stats.activeVendors}</p>
                <p className="text-xs text-slate-600">Active Vendors</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-sm border border-slate-200">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-pink-100 rounded-lg">
                <Star className="w-5 h-5 text-pink-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-slate-900">{stats.totalReviews}</p>
                <p className="text-xs text-slate-600">Total Reviews</p>
              </div>
            </div>
          </div>
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Revenue Chart */}
          <div className="lg:col-span-2 bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-xl font-bold text-slate-900">Revenue Overview</h3>
                <p className="text-sm text-slate-600">Last 7 days performance</p>
              </div>
              <Activity className="w-5 h-5 text-blue-600" />
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="name" stroke="#6b7280" />
                <YAxis stroke="#6b7280" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#1e293b', 
                    border: 'none', 
                    borderRadius: '8px',
                    color: '#fff'
                  }} 
                />
                <Line 
                  type="monotone" 
                  dataKey="revenue" 
                  stroke="#3b82f6" 
                  strokeWidth={3}
                  dot={{ fill: '#3b82f6', r: 4 }}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Category Distribution */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
            <h3 className="text-xl font-bold text-slate-900 mb-2">Sales by Category</h3>
            <p className="text-sm text-slate-600 mb-4">Distribution breakdown</p>
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="space-y-2 mt-4">
              {categoryData.map((cat, idx) => (
                <div key={idx} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: cat.color }}></div>
                    <span className="text-sm text-slate-700">{cat.name}</span>
                  </div>
                  <span className="text-sm font-semibold text-slate-900">{cat.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Tables Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Orders */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-slate-900">Recent Orders</h3>
              <button className="text-sm text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1">
                View All <ArrowUpRight className="w-4 h-4" />
              </button>
            </div>
            <div className="space-y-3">
              {recentOrders.map((order, idx) => (
                <div key={idx} className="flex items-center justify-between p-3 rounded-xl hover:bg-slate-50 transition-colors">
                  <div className="flex-1">
                    <p className="font-semibold text-slate-900">{order.id}</p>
                    <p className="text-sm text-slate-600">{order.customer}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-slate-900">${order.amount}</p>
                    <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(order.status)}`}>
                      {order.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Top Products */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-slate-900">Top Products</h3>
              <button className="text-sm text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1">
                View All <ArrowUpRight className="w-4 h-4" />
              </button>
            </div>
            <div className="space-y-3">
              {topProducts.map((product, idx) => (
                <div key={idx} className="flex items-center justify-between p-3 rounded-xl hover:bg-slate-50 transition-colors">
                  <div className="flex items-center gap-3 flex-1">
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center text-white font-bold">
                      {idx + 1}
                    </div>
                    <div>
                      <p className="font-semibold text-slate-900">{product.name}</p>
                      <p className="text-sm text-slate-600">{product.sales} sales</p>
                    </div>
                  </div>
                  <div className="text-right flex items-center gap-2">
                    <p className="font-bold text-slate-900">${product.revenue.toLocaleString()}</p>
                    {product.trend === "up" ? (
                      <TrendingUp className="w-4 h-4 text-green-600" />
                    ) : (
                      <TrendingDown className="w-4 h-4 text-red-600" />
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default DashboardPage;