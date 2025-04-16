import React from 'react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <div>
      <footer className="mt-8 p-4 border text-center bg-gradient-to-r from-indigo-600 via-pink-600 to-purple-700 text-white container mx-auto rounded">
        &copy; {currentYear} Dlithe Consultancy Pvt Ltd.
      </footer>
    </div>
  );
}
