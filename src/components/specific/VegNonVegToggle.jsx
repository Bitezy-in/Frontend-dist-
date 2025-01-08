import React, { useState } from 'react';

const VegNonVegToggle = () => {

  return (
    <div className="flex items-center gap-1">
      <div className="flex items-center">
        <label className="inline-flex items-center me-5 cursor-pointer">
          <input type="checkbox" value="" className="sr-only peer" />
          <div className="relative w-11 h-6 bg-gray-500 rounded-full peer dark:bg-gray-400 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-green-800"></div>
          <span className="ms-3 text-sm font-medium text-gray-900">Veg</span>
        </label>
        <label className="inline-flex items-center me-5 cursor-pointer">
          <input type="checkbox" value="" className="sr-only peer" />
          <div className="relative w-11 h-6 bg-gray-500 rounded-full peer dark:bg-gray-400 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-red-700"></div>
          <span className="ms-3 text-sm font-medium text-gray-900">Non-Veg</span>
        </label>
      </div>
    </div >
  );
};

export default VegNonVegToggle;