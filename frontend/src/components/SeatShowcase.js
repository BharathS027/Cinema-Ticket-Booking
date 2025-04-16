import React from 'react';

const SeatShowcase = () => {
  return (
    <div className="flex justify-center mt-6">
      <ul className="flex gap-4 text-sm text-gray-700">
        <li className="flex items-center gap-1">
          <div className="w-4 h-4 bg-white border border-gray-300 rounded" /> Available
        </li>
        <li className="flex items-center gap-1">
          <div className="w-4 h-4 bg-white border-2 border-yellow-400 rounded" /> Recommended
        </li>
        <li className="flex items-center gap-1">
          <div className="w-4 h-4 bg-green-500 rounded" /> Selected
        </li>
        <li className="flex items-center gap-1">
          <div className="w-4 h-4 bg-gray-400 rounded" /> Occupied
        </li>
      </ul>
    </div>
  );
};

export default SeatShowcase;
