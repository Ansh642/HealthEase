import React from 'react';
import logo from '../assets/logo.svg';

export default function Footer() {
  return (
     <div>
        <footer class="bg-blue-100 mt-6">
  <div class="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 lg:px-8">
    <div class="sm:flex sm:items-center sm:justify-between">
      <div class="flex justify-center text-teal-600 sm:justify-start">
        <img src={logo} height={60} width={70} alt="" />
      </div>

      <p class="mt-4 text-center text-gray-800 lg:mt-0 lg:text-right">
        Copyright &copy; 2024. All rights reserved.
      </p>
    </div>
  </div>
</footer>
     </div>
  );
}
