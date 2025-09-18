import React from 'react';
import { MapPin, Mail,} from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-2">
            <div className="flex items-center space-x-3 mb-4">
              <MapPin className="h-8 w-8 text-green-200" />
              <div>
                <h3 className="text-xl font-bold">FRA Atlas</h3>
                <p className="text-gray-400">WebGIS Decision Support System</p>
              </div>
            </div>
            <p className="text-gray-400 mb-4 max-w-md">
              AI-powered monitoring and analysis platform for Forest Rights Act implementation 
              across Madhya Pradesh, Tripura, Odisha, and Telangana.
            </p>
            <div className="flex space-x-4">
              <div className="flex items-center text-sm text-gray-400">
                <Mail className="h-4 w-4 mr-2" />
                contact@fra-atlas.gov.in
              </div>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Target States</h4>
            <ul className="space-y-2 text-gray-400">
              <li>Madhya Pradesh</li>
              <li>Tripura</li>
              <li>Odisha</li>
              <li>Telangana</li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Features</h4>
            <ul className="space-y-2 text-gray-400">
              <li>Real-time Monitoring</li>
              <li>GIS Mapping</li>
              <li>Data Analytics</li>
              <li>Report Generation</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2025 FRA Atlas - Decision Support System. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;