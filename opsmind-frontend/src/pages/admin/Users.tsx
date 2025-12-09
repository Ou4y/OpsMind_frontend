import { PageHeader } from "../../components/common/PageHeader";
import { useState } from "react";
import { Search, Plus } from "lucide-react";

const initialUsers = [
  {
    name: "Ahmed Ibrahim",
    email: "Ahmed.Ibrahim@miu.edu.eg",
    role: "Student",
    status: "Active",
  },
  {
    name: "Osama Mohamed",
    email: "osama.it@miu.edu.eg",
    role: "Technician",
    status: "Active",
  },
  {
    name: "Yasmin Elkady",
    email: "yasmin.admin@miu.edu.eg",
    role: "Admin",
    status: "Active",
  },
];

export default function AdminUsers() {
  const [query, setQuery] = useState("");
  const [users, setUsers] = useState(initialUsers);

  const [isFormOpen, setIsFormOpen] = useState(false);

  // New User Form State
  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    role: "Student",
    status: "Active",
  });

  const filteredUsers = users.filter((u) =>
    (u.name + u.email + u.role + u.status)
      .toLowerCase()
      .includes(query.toLowerCase())
  );

  function handleCreateUser() {
    if (!newUser.name || !newUser.email) return;

    setUsers([...users, newUser]);
    setIsFormOpen(false);

    // Reset form
    setNewUser({
      name: "",
      email: "",
      role: "Student",
      status: "Active",
    });
  }

  return (
    <div className="space-y-10 relative">
      <PageHeader
        title="User Management"
        subtitle="Manage all registered users in the system"
      />

      <div className="bg-white dark:bg-slate-900 rounded-xl shadow p-8 border border-slate-200 dark:border-slate-800 space-y-6">

        {/* Top Row: Search + Create Button */}
        <div className="flex justify-between items-center gap-4">
          {/* Search Input */}
          <div className="relative w-full max-w-md">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
              size={18}
            />
            <input
              type="text"
              placeholder="Search users by name, email, role..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-lg border dark:bg-slate-800 dark:border-slate-700 dark:text-white"
            />
          </div>

          {/* Create User Button */}
          <button
            onClick={() => setIsFormOpen(true)}
            className="flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-lg shadow hover:opacity-90 transition"
          >
            <Plus size={18} />
            Create User
          </button>
        </div>

        {/* Users Table */}
        <table className="w-full text-left text-sm">
         <thead>
            <tr className="border-b text-slate-600 dark:text-slate-300">
              <th className="pb-3 font-semibold">Name</th>
              <th className="pb-3 font-semibold">Email</th>
              <th className="pb-3 font-semibold">Role</th>
              <th className="pb-3 font-semibold">Status</th>
              <th className="pb-3 font-semibold">Actions</th>
            </tr>
          </thead>

          <tbody>
              {filteredUsers.map((u, index) => (
                <tr
                  key={index}
                  className="border-b last:border-none dark:border-slate-700"
                >
                  <td className="py-4 font-medium dark:text-slate-200">{u.name}</td>

                  <td className="py-4 text-slate-600 dark:text-slate-400">
                    {u.email}
                  </td>

                  <td className="py-4">
                    <span
                      className={`
                        px-3 py-1 rounded-full text-xs font-semibold
                        ${
                          u.role === "Admin"
                            ? "bg-purple-100 text-purple-700 dark:bg-purple-800 dark:text-purple-200"
                            : u.role === "Technician"
                            ? "bg-blue-100 text-blue-700 dark:bg-blue-800 dark:text-blue-200"
                            : "bg-green-100 text-green-700 dark:bg-green-800 dark:text-green-200"
                        }
                      `}
                    >
                      {u.role}
                    </span>
                  </td>

                  <td className="py-4">
                    <span
                      className={`
                        px-3 py-1 rounded-full text-xs font-semibold
                        ${
                          u.status === "Active"
                            ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-800 dark:text-emerald-200"
                            : "bg-red-100 text-red-700 dark:bg-red-800 dark:text-red-200"
                        }
                      `}
                    >
                      {u.status}
                    </span>
                  </td>

                  {/* ACTION BUTTONS */}
                  <td className="py-4 flex gap-3">

                    {/* UPDATE BUTTON */}
                    <button
                      onClick={() => {
                        setNewUser(u);       // preload modal fields
                        setIsFormOpen(true);  // open modal
                      }}
                      className="
                        px-3 py-1.5 text-xs font-medium rounded-lg
                        bg-blue-500 text-white
                        hover:bg-blue-600
                        transition
                        shadow-sm
                      "
                    >
                      Update
                    </button>

                    {/* REMOVE BUTTON */}
                    <button
                      onClick={() => {
                        setUsers(users.filter((_, i) => i !== index));
                      }}
                      className="
                        px-3 py-1.5 text-xs font-medium rounded-lg
                        bg-red-500 text-white
                        hover:bg-red-600
                        transition
                        shadow-sm
                      "
                    >
                      Remove
                    </button>

                  </td>
                </tr>
              ))}

              {filteredUsers.length === 0 && (
                <tr>
                  <td
                    colSpan={5}
                    className="py-6 text-center text-slate-500 dark:text-slate-400"
                  >
                    No users found.
                  </td>
                </tr>
              )}
            </tbody>
        </table>
      </div>

      {/* ---------- CREATE USER FORM MODAL ---------- */}
     {/* ---------- CREATE USER FORM MODAL ---------- */}
{isFormOpen && (
  <>
    {/* Background Overlay */}
    <div
      className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 animate-fadeIn"
      onClick={() => setIsFormOpen(false)}
    />

    {/* Modal */}
    <div
      className="
        fixed left-1/2 top-1/2 z-50
        -translate-x-1/2 -translate-y-1/2
        w-full max-w-lg
        bg-white/95 dark:bg-slate-900/90
        backdrop-blur-xl
        p-10 rounded-2xl
        shadow-[0_12px_40px_rgba(0,0,0,0.25)]
        border border-slate-200/60 dark:border-slate-700/40
        animate-modalPop
        space-y-6
      "
    >
      {/* Title */}
      <h2 className="text-2xl font-bold text-slate-800 dark:text-white tracking-tight">
        Create New User
      </h2>

      {/* Form */}
      <div className="space-y-5">
        
        {/* Name */}
        <div className="space-y-1.5">
          <label className="font-medium text-slate-700 dark:text-slate-300">
            Full Name
          </label>
          <input
            type="text"
            value={newUser.name}
            onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
            className="
              w-full p-3 rounded-xl border border-slate-300 dark:border-slate-700
              bg-white dark:bg-slate-800
              text-slate-900 dark:text-slate-100
              focus:ring-2 focus:ring-primary/70 
              focus:border-primary/70
              outline-none transition-all
            "
          />
        </div>

        {/* Email */}
        <div className="space-y-1.5">
          <label className="font-medium text-slate-700 dark:text-slate-300">
            Email
          </label>
          <input
            type="email"
            value={newUser.email}
            onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
            className="
              w-full p-3 rounded-xl border border-slate-300 dark:border-slate-700
              bg-white dark:bg-slate-800
              text-slate-900 dark:text-slate-100
              focus:ring-2 focus:ring-primary/70
              focus:border-primary/70
              outline-none transition-all
            "
          />
        </div>

        {/* Role */}
        <div className="space-y-1.5">
          <label className="font-medium text-slate-700 dark:text-slate-300">
            Role
          </label>
          <select
            value={newUser.role}
            onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
            className="
              w-full p-3 rounded-xl border border-slate-300 dark:border-slate-700
              bg-white dark:bg-slate-800
              text-slate-900 dark:text-slate-100
              focus:ring-2 focus:ring-primary/70
              focus:border-primary/70
              outline-none transition-all
            "
          >
            <option>Student</option>
            <option>Technician</option>
            <option>Admin</option>
          </select>
        </div>

        {/* Status */}
        <div className="space-y-1.5">
          <label className="font-medium text-slate-700 dark:text-slate-300">
            Status
          </label>
          <select
            value={newUser.status}
            onChange={(e) => setNewUser({ ...newUser, status: e.target.value })}
            className="
              w-full p-3 rounded-xl border border-slate-300 dark:border-slate-700
              bg-white dark:bg-slate-800
              text-slate-900 dark:text-slate-100
              focus:ring-2 focus:ring-primary/70
              focus:border-primary/70
              outline-none transition-all
            "
          >
            <option>Active</option>
            <option>Inactive</option>
          </select>
        </div>
      </div>

      {/* Modal Buttons */}
      <div className="flex justify-end gap-4 pt-4">
        <button
          className="
            px-5 py-2.5 rounded-xl border
            bg-slate-100 dark:bg-slate-800
            text-slate-700 dark:text-slate-200
            hover:bg-slate-200 dark:hover:bg-slate-700
            transition shadow-sm
          "
          onClick={() => setIsFormOpen(false)}
        >
          Cancel
        </button>

        <button
          onClick={handleCreateUser}
          className="
            px-6 py-2.5 rounded-xl 
            bg-primary text-white
            shadow hover:opacity-90 transition
          "
        >
          Create User
        </button>
      </div>
    </div>
  </>
)}
    </div>
  );
}