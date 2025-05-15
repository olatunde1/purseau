import React from 'react';
import Sidebar from './Sidebar'; // Import Sidebar
import Navbar from './Navbar'; // Import Navbar
import { Outlet } from 'react-router-dom'; // Import Outlet for nested routes

export default function Admin() {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Navbar />
        <main className="p-6">
          <Outlet /> {/* Render nested routes here */}
        </main>
      </div>
    </div>
  );
}
