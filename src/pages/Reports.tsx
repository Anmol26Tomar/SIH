import React, { useState } from 'react';
import { Download, Filter, Calendar, FileText, PieChart, BarChart3 } from 'lucide-react';

const Reports: React.FC = () => {
  const [selectedState, setSelectedState] = useState('all');
  const [selectedPeriod, setSelectedPeriod] = useState('monthly');
  const [selectedType, setSelectedType] = useState('summary');

  const states = [
    { id: 'all', name: 'All States' },
    { id: 'madhya-pradesh', name: 'Madhya Pradesh' },
    { id: 'tripura', name: 'Tripura' },
    { id: 'odisha', name: 'Odisha' },
    { id: 'telangana', name: 'Telangana' }
  ];

  const reportTypes = [
    { 
      id: 'summary', 
      name: 'Executive Summary', 
      description: 'High-level overview of FRA implementation progress',
      icon: FileText 
    },
    { 
      id: 'detailed', 
      name: 'Detailed Analysis', 
      description: 'Comprehensive breakdown with charts and statistics',
      icon: BarChart3 
    },
    { 
      id: 'comparative', 
      name: 'Comparative Report', 
      description: 'State-wise and period comparison analysis',
      icon: PieChart 
    }
  ];

  const recentReports = [
    {
      title: 'Q2 2024 Implementation Summary',
      type: 'Executive Summary',
      date: '2024-06-30',
      size: '2.4 MB',
      downloads: 147
    },
    {
      title: 'Madhya Pradesh Detailed Analysis',
      type: 'Detailed Analysis',
      date: '2024-06-28',
      size: '8.7 MB',
      downloads: 89
    },
    {
      title: 'Tri-State Comparative Study',
      type: 'Comparative Report',
      date: '2024-06-25',
      size: '5.2 MB',
      downloads: 234
    },
    {
      title: 'Monthly Progress - June 2024',
      type: 'Executive Summary',
      date: '2024-06-15',
      size: '1.8 MB',
      downloads: 312
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Reports & Analytics</h1>
          <p className="text-gray-600 mt-2">Generate and access comprehensive FRA implementation reports</p>
        </div>

        {/* Report Generator */}
        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Generate New Report</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            {/* State Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Select State</label>
              <select
                value={selectedState}
                onChange={(e) => setSelectedState(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
              >
                {states.map((state) => (
                  <option key={state.id} value={state.id}>
                    {state.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Period Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Time Period</label>
              <select
                value={selectedPeriod}
                onChange={(e) => setSelectedPeriod(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
              >
                <option value="monthly">Current Month</option>
                <option value="quarterly">Current Quarter</option>
                <option value="yearly">Current Year</option>
                <option value="custom">Custom Range</option>
              </select>
            </div>

            {/* Format Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Report Format</label>
              <select className="w-full p-3 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500">
                <option value="pdf">PDF Document</option>
                <option value="excel">Excel Spreadsheet</option>
                <option value="csv">CSV Data</option>
              </select>
            </div>
          </div>

          {/* Report Type Selection */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-3">Report Type</label>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {reportTypes.map((type) => {
                const Icon = type.icon;
                return (
                  <div
                    key={type.id}
                    className={`p-4 border-2 rounded-lg cursor-pointer transition-colors ${
                      selectedType === type.id
                        ? 'border-green-500 bg-green-50'
                        : 'border-gray-200 hover:border-green-300'
                    }`}
                    onClick={() => setSelectedType(type.id)}
                  >
                    <div className="flex items-center space-x-3 mb-2">
                      <Icon className="h-5 w-5 text-green-900" />
                      <h4 className="font-medium text-gray-900">{type.name}</h4>
                    </div>
                    <p className="text-sm text-gray-600">{type.description}</p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Generate Button */}
          <div className="flex justify-end">
            <button className="inline-flex items-center px-6 py-3 bg-green-900 text-white font-medium rounded-md hover:bg-green-300 transition-colors">
              <Download className="h-5 w-5 mr-2" />
              Generate Report
            </button>
          </div>
        </div>

        {/* Recent Reports */}
        <div className="bg-white rounded-lg shadow-md">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">Recent Reports</h3>
              <div className="flex items-center space-x-2">
                <Filter className="h-5 w-5 text-gray-400" />
                <select className="border border-gray-300 rounded-md px-3 py-1 text-sm">
                  <option value="all">All Types</option>
                  <option value="summary">Executive Summary</option>
                  <option value="detailed">Detailed Analysis</option>
                  <option value="comparative">Comparative Report</option>
                </select>
              </div>
            </div>
          </div>

          <div className="divide-y divide-gray-200">
            {recentReports.map((report, index) => (
              <div key={index} className="p-6 hover:bg-gray-50 transition-colors">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <h4 className="text-lg font-medium text-gray-900 mb-1">{report.title}</h4>
                    <div className="flex items-center space-x-4 text-sm text-gray-600">
                      <span className="flex items-center">
                        <FileText className="h-4 w-4 mr-1" />
                        {report.type}
                      </span>
                      <span className="flex items-center">
                        <Calendar className="h-4 w-4 mr-1" />
                        {new Date(report.date).toLocaleDateString()}
                      </span>
                      <span>{report.size}</span>
                      <span>{report.downloads} downloads</span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button className="px-4 py-2 text-sm text-green-900 hover:text-green-800 font-medium">
                      View
                    </button>
                    <button className="inline-flex items-center px-4 py-2 bg-green-900 text-white text-sm font-medium rounded-md hover:bg-green-400 transition-colors">
                      <Download className="h-4 w-4 mr-1" />
                      Download
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Report Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
              <FileText className="h-6 w-6 text-blue-600" />
            </div>
            <div className="text-2xl font-bold text-gray-900">247</div>
            <div className="text-gray-600">Total Reports Generated</div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
              <Download className="h-6 w-6 text-green-900" />
            </div>
            <div className="text-2xl font-bold text-gray-900">1,847</div>
            <div className="text-gray-600">Total Downloads</div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-4">
              <BarChart3 className="h-6 w-6 text-purple-600" />
            </div>
            <div className="text-2xl font-bold text-gray-900">12</div>
            <div className="text-gray-600">Reports This Month</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reports;