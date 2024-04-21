import React from 'react';
import logo from '../assets/logo.svg';

export default function Footer() {
  return (
    <div>
      <footer className="bg-blue-100 mt-6">
        <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 lg:px-8">
          <div className="sm:flex sm:items-center sm:justify-between">
            <div className="flex justify-center text-teal-600 sm:justify-start">
              <img src={logo} height={60} width={70} alt />
            </div>
            <p className="mt-4 text-center text-black font-medium lg:mt-0 lg:text-right">
              Copyright © 2024. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>

  );
}
