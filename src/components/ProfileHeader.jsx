import { Edit, LogOut } from "lucide-react";
import DeleteAccountButton from "./buttons/DeleteAccountButton";

export default function ProfileHeader({ user, onEdit, onLogout }) {
  return (
    <div className="w-full bg-gray-100/80 rounded-2xl p-6 shadow-md flex flex-col items-center text-center">
      <h2 className="text-2xl font-bold tracking-tight text-gray-900">
        Welcome back, {user?.name || "User"}!
      </h2>
      <p className="text-gray-600">{user?.email}</p>

      <div className="flex gap-3 mt-6">
        <button
          onClick={onEdit}
          className="bg-gray-900 text-white px-6 py-2 rounded-xl font-medium shadow-md transition hover:bg-gray-800 flex items-center gap-2 cursor-pointer"
        >
          <Edit size={18} /> Edit Profile
        </button>

        <button
          onClick={onLogout}
          className="bg-red-600 text-white px-5 py-2 rounded-xl font-medium shadow-md transition hover:bg-red-700 flex items-center gap-2 cursor-pointer"
        >
          <LogOut size={18} /> Logout
        </button>
      </div>

      <DeleteAccountButton />
    </div>
  );
}
