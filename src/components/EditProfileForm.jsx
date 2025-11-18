import { useState } from "react";
import { updateMyUser } from "../services/UserService";

export default function EditProfileForm({ user, onClose }) {

    const [name, setName] = useState(user?.name || "");
    const [email, setEmail] = useState(user?.email || "");
    const [password, setPassword] = useState("");

    const handleSubmit = async () => {
        try {
            await updateMyUser({
                name,
                email,
                password: password || null
            });

            onClose(); 
            window.location.reload();
        } catch (err) {
            console.error("Error updating profile:", err);
            alert("Could not update profile.");
        }
    };

    return (
        <div className="w-full bg-white rounded-xl p-6 shadow-md border">
            <h3 className="text-xl font-bold text-gray-900 mb-4 text-center">
                Edit Profile
            </h3>

            <div className="flex flex-col gap-4">

                <input
                    className="border rounded-lg px-3 py-2"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Full name"
                />

                <input
                    className="border rounded-lg px-3 py-2"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                />

                <input
                    className="border rounded-lg px-3 py-2"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="New Password (optional)"
                />

                <div className="flex gap-4 mt-4 justify-center">
                    <button
                        onClick={handleSubmit}
                        className="bg-gray-900 text-white px-6 py-2 rounded-xl hover:bg-gray-800 cursor-pointer"
                    >
                        Save
                    </button>

                    <button
                        onClick={onClose}
                        className="bg-gray-300 text-gray-800 px-6 py-2 rounded-xl hover:bg-gray-400 cursor-pointer"
                    >
                        Cancel
                    </button>
                </div>

            </div>
        </div>
    );
}
