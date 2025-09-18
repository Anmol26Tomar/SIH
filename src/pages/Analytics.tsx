import React from 'react';
import { LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ScatterChart, Scatter } from 'recharts';
import { TrendingUp, Users, Clock, MapPin } from 'lucide-react';

const Analytics: React.FC = () => {
  const performanceData = [
    { quarter: 'Q1 2023', applications: 234, approvals: 167, efficiency: 71.4 },
    { quarter: 'Q2 2023', applications: 289, approvals: 198, efficiency: 68.5 },
    { quarter: 'Q3 2023', applications: 345, approvals: 256, efficiency: 74.2 },
    { quarter: 'Q4 2023', applications: 298, approvals: 223, efficiency: 74.8 },
    { quarter: 'Q1 2024', applications: 387, approvals: 295, efficiency: 76.2 },
    { quarter: 'Q2 2024', applications: 421, approvals: 334, efficiency: 79.3 }
  ];

  const timelineData = [
    { month: 'Jan', applications: 145, approvals: 98, avgTime: 52 },
    { month: 'Feb', applications: 167, approvals: 134, avgTime: 48 },
    { month: 'Mar', applications: 189, approvals: 145, avgTime: 45 },
    { month: 'Apr', applications: 234, approvals: 189, avgTime: 42 },
    { month: 'May', applications: 256, approvals: 203, avgTime: 39 },
    { month: 'Jun', applications: 278, approvals: 234, avgTime: 36 }
  ];

  const correlationData = [
    { forestCover: 45, approvalRate: 68, state: 'MP' },
    { forestCover: 73, approvalRate: 71, state: 'Tripura' },
    { forestCover: 33, approvalRate: 71, state: 'Odisha' },
    { forestCover: 24, approvalRate: 66, state: 'Telangana' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Advanced Analytics</h1>
          <p className="text-gray-600 mt-2">Deep insights into FRA implementation patterns and trends</p>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Approval Efficiency</p>
                <p className="text-2xl font-bold text-green-600">79.3%</p>
                <p className="text-xs text-gray-500">+3.1% from last quarter</p>
              </div>
              <TrendingUp className="h-8 w-8 text-green-600" />
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Active Communities</p>
                <p className="text-2xl font-bold text-blue-600">1,847</p>
                <p className="text-xs text-gray-500">+156 new registrations</p>
              </div>
              <Users className="h-8 w-8 text-blue-600" />
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Avg Processing Time</p>
                <p className="text-2xl font-bold text-orange-600">36 days</p>
                <p className="text-xs text-gray-500">-16 days improvement</p>
              </div>
              <Clock className="h-8 w-8 text-orange-600" />
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Coverage Area</p>
                <p className="text-2xl font-bold text-purple-600">35,600 km²</p>
                <p className="text-xs text-gray-500">Across 4 states</p>
              </div>
              <MapPin className="h-8 w-8 text-purple-600" />
            </div>
          </div>
        </div>

        {/* Performance Trends */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Quarterly Performance Trends</h3>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={performanceData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="quarter" />
                <YAxis />
                <Tooltip />
                <Area type="monotone" dataKey="applications" stackId="1" stroke="#3B82F6" fill="#3B82F6" fillOpacity={0.6} name="Applications" />
                <Area type="monotone" dataKey="approvals" stackId="2" stroke="#059669" fill="#059669" fillOpacity={0.8} name="Approvals" />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Processing Time Analysis</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={timelineData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis yAxisId="left" />
                <YAxis yAxisId="right" orientation="right" />
                <Tooltip />
                <Line yAxisId="left" type="monotone" dataKey="approvals" stroke="#059669" strokeWidth={2} name="Approvals" />
                <Line yAxisId="right" type="monotone" dataKey="avgTime" stroke="#F59E0B" strokeWidth={2} name="Avg Time (days)" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Correlation Analysis */}
        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Forest Cover vs Approval Rate Correlation</h3>
          <ResponsiveContainer width="100%" height={300}>
            <ScatterChart data={correlationData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="forestCover" name="Forest Cover %" />
              <YAxis dataKey="approvalRate" name="Approval Rate %" />
              <Tooltip cursor={{ strokeDasharray: '3 3' }} />
              <Scatter dataKey="approvalRate" fill="#059669" />
            </ScatterChart>
          </ResponsiveContainer>
        </div>

        {/* Insights Panel */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Key Insights</h3>
            <div className="space-y-4">
              <div className="p-4 bg-green-50 rounded-lg">
                <h4 className="font-medium text-green-800">Processing Efficiency Improved</h4>
                <p className="text-sm text-green-600 mt-1">
                  Average processing time reduced by 31% over the last 6 months due to digital workflow implementation.
                </p>
              </div>
              <div className="p-4 bg-blue-50 rounded-lg">
                <h4 className="font-medium text-blue-800">Seasonal Patterns Identified</h4>
                <p className="text-sm text-blue-600 mt-1">
                  Higher application rates observed during post-monsoon seasons across all target states.
                </p>
              </div>
              <div className="p-4 bg-purple-50 rounded-lg">
                <h4 className="font-medium text-purple-800">State Performance Variance</h4>
                <p className="text-sm text-purple-600 mt-1">
                  Tripura shows highest efficiency (79.3%) while Telangana has potential for improvement.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Recommendations</h3>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                <div>
                  <p className="text-sm font-medium text-gray-900">Expand Digital Platform</p>
                  <p className="text-xs text-gray-600">Scale successful digital workflow to remaining districts</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                <div>
                  <p className="text-sm font-medium text-gray-900">Community Training Programs</p>
                  <p className="text-xs text-gray-600">Increase awareness and application quality in underperforming regions</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-orange-500 rounded-full mt-2"></div>
                <div>
                  <p className="text-sm font-medium text-gray-900">Resource Optimization</p>
                  <p className="text-xs text-gray-600">Allocate additional staff during peak application periods</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-purple-500 rounded-full mt-2"></div>
                <div>
                  <p className="text-sm font-medium text-gray-900">Predictive Analytics</p>
                  <p className="text-xs text-gray-600">Implement ML models for application volume forecasting</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;