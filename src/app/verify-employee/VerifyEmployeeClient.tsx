'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import Image from 'next/image';
import { FaUser, FaIdCard, FaPhone, FaMapMarkerAlt, FaBriefcase, FaSearch } from 'react-icons/fa';

interface EmployeeData {
  employeeCode: string;
  name: string;
  designation: string;
  employeeId: string;
  phone: string;
  address: string;
  photoFilename: string;
  photoUrl: string;
  dateAdded: string;
}

export default function VerifyEmployeeClient() {
  const [code, setCode] = useState('');
  const [employee, setEmployee] = useState<EmployeeData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const searchParams = useSearchParams();

  // Auto-verify employee if code is provided in URL
  useEffect(() => {
    const urlCode = searchParams.get('code');
    if (urlCode && urlCode.trim()) {
      setCode(urlCode.trim());
      // Automatically verify the employee
      verifyEmployee(urlCode.trim());
    }
  }, [searchParams]);

  const verifyEmployee = async (employeeCode: string) => {
    if (!employeeCode.trim()) {
      setError('Please enter an employee code');
      return;
    }

    setLoading(true);
    setError('');
    setEmployee(null);

    try {
      const response = await fetch('/api/employee/verify', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ code: employeeCode.trim() }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setEmployee(data.data);
      } else {
        setError(data.error || 'Employee not found');
      }
    } catch (err) {
      setError('Failed to verify employee. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    verifyEmployee(code);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Employee Verification
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Enter employee code to verify credentials
          </p>
        </div>

        {/* Verification Form */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mb-8">
          <form onSubmit={handleVerify} className="space-y-4">
            <div>
              <label htmlFor="code" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Employee Code
              </label>
              <div className="relative">
                <input
                  type="text"
                  id="code"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  placeholder="Enter employee code"
                  className="w-full px-4 py-3 pl-12 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                  disabled={loading}
                />
                <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
              </div>
            </div>
            
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-primary-600 hover:bg-primary-700 disabled:bg-gray-400 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 flex items-center justify-center"
            >
              {loading ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  Verifying...
                </>
              ) : (
                'Verify Employee'
              )}
            </button>
          </form>

          {error && (
            <div className="mt-4 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
              <p className="text-red-600 dark:text-red-400">{error}</p>
            </div>
          )}
        </div>

        {/* Employee Card */}
        {employee && (
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
            <div className="p-6">
              <div className="flex flex-col md:flex-row items-center md:items-start space-y-4 md:space-y-0 md:space-x-6">
                {/* Photo */}
                <div className="flex-shrink-0 flex justify-center md:justify-start w-full md:w-auto">
                  <div className="relative w-32 h-32 rounded-lg overflow-hidden border-4 border-primary-500">
                    <img
                      src={employee.photoUrl}
                      alt={employee.name}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = '/logo_transparent_background.png';
                      }}
                    />
                  </div>
                </div>

                {/* Employee Details */}
                <div className="flex-1 space-y-4 w-full">
                  <div className="text-center md:text-left">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
                      {employee.name}
                    </h2>
                    <p className="text-lg text-primary-600 dark:text-primary-400 font-semibold">
                      {employee.designation}
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-center space-x-3">
                      <FaIdCard className="text-primary-500 text-lg" />
                      <div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Employee ID</p>
                        <p className="font-semibold text-gray-900 dark:text-white">{employee.employeeId}</p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-3">
                      <FaPhone className="text-primary-500 text-lg" />
                      <div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Phone</p>
                        <p className="font-semibold text-gray-900 dark:text-white">{employee.phone}</p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-3 md:col-span-2">
                      <FaMapMarkerAlt className="text-primary-500 text-lg" />
                      <div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Address</p>
                        <p className="font-semibold text-gray-900 dark:text-white">{employee.address}</p>
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                    <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
                      <span>Employee Code: {employee.employeeCode}</span>
                      <span>Added: {new Date(employee.dateAdded).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Verification Status */}
            <div className="bg-green-50 dark:bg-green-900/20 border-t border-green-200 dark:border-green-800 px-6 py-4">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span className="text-green-700 dark:text-green-400 font-semibold">
                  Employee Verified Successfully
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Instructions */}
        <div className="mt-8 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-blue-900 dark:text-blue-100 mb-2">
            How to Use
          </h3>
          <ul className="text-blue-800 dark:text-blue-200 space-y-1">
            <li>• Scan the QR code on the employee's ID card</li>
            <li>• Or manually enter the employee code in the form above</li>
            <li>• Click "Verify Employee" to view their details</li>
            <li>• This system helps prevent fake ID cards</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
