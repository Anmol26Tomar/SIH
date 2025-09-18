import React from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  MapPin,
  BarChart3,
  Users,
  TreePine,
  Award,
  TrendingUp,
} from "lucide-react";

const HomePage: React.FC = () => {
  const states = [
    {
      id: "madhya-pradesh",
      name: "Madhya Pradesh",
      claims: 1245,
      approved: 892,
      pending: 353,
      area: "15,200 km²",
    },
    {
      id: "tripura",
      name: "Tripura",
      claims: 450,
      approved: 320,
      pending: 130,
      area: "4,800 km²",
    },
    {
      id: "odisha",
      name: "Odisha",
      claims: 890,
      approved: 634,
      pending: 256,
      area: "8,900 km²",
    },
    {
      id: "telangana",
      name: "Telangana",
      claims: 670,
      approved: 445,
      pending: 225,
      area: "6,700 km²",
    },
  ];

  const features = [
    {
      icon: MapPin,
      title: "GIS Mapping",
      description:
        "Interactive maps showing forest areas, settlements, and FRA implementation status",
    },
    {
      icon: BarChart3,
      title: "Analytics Dashboard",
      description:
        "Real-time data visualization and monitoring of FRA claims and approvals",
    },
    {
      icon: Users,
      title: "Stakeholder Management",
      description:
        "Track community participation and gram sabha decision-making processes",
    },
    {
      icon: TreePine,
      title: "Forest Conservation",
      description:
        "Monitor conservation efforts and sustainable forest management practices",
    },
  ];

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-green-400 to-green-800">
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              FRA Atlas
            </h1>
            <p className="text-xl md:text-2xl text-green-100 mb-8 max-w-3xl mx-auto">
              AI-powered WebGIS Decision Support System for Integrated
              Monitoring of Forest Rights Act Implementation.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/dashboard"
                className="inline-flex items-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-green-900 bg-white hover:bg-gray-50 transition-colors"
              >
                View Dashboard
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
              <Link
                to="/analytics"
                className="inline-flex items-center px-8 py-3 border-2 border-white text-base font-medium rounded-md text-white hover:bg-white hover:text-green-600 transition-colors"
              >
                Explore Analytics
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Implementation Overview
            </h2>
            <p className="text-lg text-gray-600">
              Current status across target states
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Users className="h-6 w-6 text-green-900" />
              </div>
              <div className="text-2xl font-bold text-gray-900">3,255</div>
              <div className="text-gray-600">Total Claims</div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Award className="h-6 w-6 text-blue-600" />
              </div>
              <div className="text-2xl font-bold text-gray-900">2,291</div>
              <div className="text-gray-600">Approved Claims</div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="h-6 w-6 text-orange-600" />
              </div>
              <div className="text-2xl font-bold text-gray-900">964</div>
              <div className="text-gray-600">Pending Review</div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <TreePine className="h-6 w-6 text-purple-600" />
              </div>
              <div className="text-2xl font-bold text-gray-900">35,600</div>
              <div className="text-gray-600">Total Area (km²)</div>
            </div>
          </div>

          {/* State Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {states.map((state) => (
              <Link
                key={state.id}
                to={`/state/${state.id}`}
                className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow border-l-4 border-green-500"
              >
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  {state.name}
                </h3>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Total Claims:</span>
                    <span className="font-semibold">{state.claims}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Approved:</span>
                    <span className="font-semibold text-green-900">
                      {state.approved}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Pending:</span>
                    <span className="font-semibold text-orange-600">
                      {state.pending}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Area:</span>
                    <span className="font-semibold">{state.area}</span>
                  </div>
                </div>
                <div className="mt-4 flex items-center text-green-900 text-sm font-medium">
                  View Details
                  <ArrowRight className="ml-1 h-4 w-4" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              System Features
            </h2>
            <p className="text-lg text-gray-600">
              Comprehensive tools for FRA monitoring and decision support
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature) => {
              const Icon = feature.icon;
              return (
                <div key={feature.title} className="text-center">
                  <div className="w-16 h-16 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <Icon className="h-8 w-8 text-green-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
