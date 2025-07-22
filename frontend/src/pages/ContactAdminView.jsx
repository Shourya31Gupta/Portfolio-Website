import React from "react";
import AdminMessages from "../components/AdminMessages";

export default function ContactAdminView() {
  return (
    <div className="min-h-screen bg-black text-white p-6">
      <h1 className="text-3xl font-bold mb-4">Admin Panel: Contact Messages</h1>
      <AdminMessages />
    </div>
  );
}
