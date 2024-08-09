import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function ResetPass() {
  return (
    <div className="min-h-screen flex flex-col justify-between bg-gray-50">
      <Navbar />

      <div className="flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md space-y-8">
          <div>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
              Reset Password
            </h2>
            <p className="mt-2 text-center text-sm text-gray-600">
              Enter your email and new password to reset your password.
            </p>
          </div>

          <form className="mt-8 space-y-6 bg-white p-8 rounded-lg shadow-lg">
            <div className="rounded-md shadow-sm space-y-4">
              <div>
                <label htmlFor="email" className="sr-only">Email address</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  className="appearance-none rounded-t-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  placeholder="Email address"
                />
              </div>

              <div>
                <label htmlFor="new-password" className="sr-only">New Password</label>
                <input
                  id="new-password"
                  name="password"
                  type="password"
                  required
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  placeholder="New Password"
                />
              </div>

              <div>
                <label htmlFor="confirm-password" className="sr-only">Confirm New Password</label>
                <input
                  id="confirm-password"
                  name="confirmPassword"
                  type="password"
                  required
                  className="appearance-none rounded-b-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  placeholder="Confirm New Password"
                />
              </div>
            </div>

            <div className="flex items-center justify-between mt-6">
              <button
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Reset Password
              </button>
            </div>
          </form>

          <p className="text-center text-gray-500 text-xs mt-4">
            &copy;2024 HealthEase. All rights reserved.
          </p>
        </div>
      </div>

      <Footer />
    </div>
  );
}
