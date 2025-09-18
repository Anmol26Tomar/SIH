import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  ResponsiveContainer,
} from "recharts";
import {
  TrendingUp,
  TrendingDown,
  Users,
  FileCheck,
  Clock,
  TreePine,
} from "lucide-react";

const Dashboard: React.FC = () => {
  const stateData = [
    { name: "Madhya Pradesh", claims: 1245, approved: 892, pending: 353 },
    { name: "Tripura", claims: 450, approved: 320, pending: 130 },
    { name: "Odisha", claims: 890, approved: 634, pending: 256 },
    { name: "Telangana", claims: 670, approved: 445, pending: 225 },
  ];

  const approvalData = [
    { name: "Approved", value: 2291, color: "#059669" },
    { name: "Pending", value: 964, color: "#F59E0B" },
    { name: "Rejected", value: 180, color: "#DC2626" },
  ];

  const monthlyTrend = [
    { month: "Jan", approvals: 45, applications: 67 },
    { month: "Feb", approvals: 52, applications: 73 },
    { month: "Mar", approvals: 48, applications: 69 },
    { month: "Apr", approvals: 61, applications: 85 },
    { month: "May", approvals: 55, applications: 78 },
    { month: "Jun", approvals: 67, applications: 92 },
  ];

  const kpiData = [
    {
      title: "Total Claims",
      value: "3,255",
      change: "+12%",
      trend: "up",
      icon: Users,
      color: "blue",
    },
    {
      title: "Approval Rate",
      value: "70.4%",
      change: "+5.2%",
      trend: "up",
      icon: FileCheck,
      color: "green",
    },
    {
      title: "Avg. Processing Time",
      value: "45 days",
      change: "-8 days",
      trend: "down",
      icon: Clock,
      color: "orange",
    },
    {
      title: "Forest Area Covered",
      value: "35,600 km²",
      change: "+2.1%",
      trend: "up",
      icon: TreePine,
      color: "purple",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            FRA Implementation Dashboard
          </h1>
          <p className="text-gray-600 mt-2">
            Real-time monitoring and analytics for Forest Rights Act
            implementation
          </p>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {kpiData.map((kpi) => {
            const Icon = kpi.icon;
            const colorClasses = {
              blue: "bg-blue-50 text-blue-600",
              green: "bg-green-50 text-green-600",
              orange: "bg-orange-50 text-orange-600",
              purple: "bg-purple-50 text-purple-600",
            };

            return (
              <div
                key={kpi.title}
                className="bg-white p-6 rounded-lg shadow-md"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">
                      {kpi.title}
                    </p>
                    <p className="text-2xl font-bold text-gray-900 mt-1">
                      {kpi.value}
                    </p>
                  </div>
                  <div
                    className={`p-3 rounded-lg ${
                      colorClasses[kpi.color as keyof typeof colorClasses]
                    }`}
                  >
                    <Icon className="h-6 w-6" />
                  </div>
                </div>
                <div className="mt-4 flex items-center">
                  {kpi.trend === "up" ? (
                    <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                  ) : (
                    <TrendingDown className="h-4 w-4 text-green-500 mr-1" />
                  )}
                  <span className="text-sm text-green-600 font-medium">
                    {kpi.change}
                  </span>
                  <span className="text-sm text-gray-500 ml-1">
                    from last month
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* State-wise Claims Chart */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              State-wise Claims Status
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={stateData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                <YAxis />
                <Tooltip />
                <Bar dataKey="approved" fill="#059669" name="Approved" />
                <Bar dataKey="pending" fill="#F59E0B" name="Pending" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Approval Status Pie Chart */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Overall Approval Status
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={approvalData}
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  dataKey="value"
                  /* label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`} */
                  label={({
                    name,
                    percent,
                  }: {
                    name?: string;
                    percent?: number;
                  }) => `${name} ${(percent ?? 0 * 100).toFixed(0)}%`}
                >
                  {approvalData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Monthly Trend Chart */}
        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Monthly Application & Approval Trends
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={monthlyTrend}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="applications"
                stroke="#3B82F6"
                name="Applications"
                strokeWidth={2}
              />
              <Line
                type="monotone"
                dataKey="approvals"
                stroke="#059669"
                name="Approvals"
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Recent Activities */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Recent Activities
          </h3>
          <div className="space-y-4">
            <div className="flex items-start space-x-3 p-3 bg-green-50 rounded-lg">
              <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
              <div>
                <p className="text-sm font-medium text-gray-900">
                  45 new claims approved in Madhya Pradesh
                </p>
                <p className="text-xs text-gray-500">2 hours ago</p>
              </div>
            </div>
            <div className="flex items-start space-x-3 p-3 bg-blue-50 rounded-lg">
              <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
              <div>
                <p className="text-sm font-medium text-gray-900">
                  New GIS data uploaded for Odisha region
                </p>
                <p className="text-xs text-gray-500">5 hours ago</p>
              </div>
            </div>
            <div className="flex items-start space-x-3 p-3 bg-orange-50 rounded-lg">
              <div className="w-2 h-2 bg-orange-500 rounded-full mt-2"></div>
              <div>
                <p className="text-sm font-medium text-gray-900">
                  Pending review for 23 claims in Telangana
                </p>
                <p className="text-xs text-gray-500">1 day ago</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
