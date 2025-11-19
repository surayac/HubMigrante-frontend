import { useState } from "react";
import { createSimulation } from "../services/SimulationService";
import toast from "react-hot-toast";
import MyToast from "../components/MyToast";

export default function SimulationForm({ onClose, onSuccess }) {

    const [form, setForm] = useState({
        overEighteen: "",
        hasJobOffer: "",
        worksRemotely: "",
        enrollmentConfirmed: "",
        montlyIncome: ""
    });

    const [errors, setErrors] = useState({});

    const handleChange = (field, value) => {
        setForm({ ...form, [field]: value });
        setErrors({ ...errors, [field]: null });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors({});

        try {
            const payload = {
                overEighteen: form.overEighteen === "true",
                hasJobOffer: form.hasJobOffer === "true",
                worksRemotely: form.worksRemotely === "true",
                enrollmentConfirmed: form.enrollmentConfirmed === "true",
                montlyIncome: form.montlyIncome
            };

            const result = await createSimulation(payload);

            toast.custom(
                <MyToast
                    title="Simulation created!"
                    message={result.message || "Your simulation was saved successfully."}
                    type="success"
                />
            );

            if (onSuccess) onSuccess(result);
            onClose();

        } catch (err) {
            console.error("Simulation error:", err);

            const backend = err.response?.data;

            if (backend?.errors) {
                const mapped = {};
                backend.errors.forEach(msg => {

                    if (msg.includes("overEighteen")) mapped.overEighteen = msg;
                    if (msg.includes("hasJobOffer")) mapped.hasJobOffer = msg;
                    if (msg.includes("worksRemotely")) mapped.worksRemotely = msg;
                    if (msg.includes("enrollmentConfirmed")) mapped.enrollmentConfirmed = msg;
                    if (msg.includes("montlyIncome")) mapped.montlyIncome = msg;
                });
                setErrors(mapped);

            } else if (backend?.message) {
                toast.custom(
                    <MyToast
                        title="Validation error"
                        message={backend.message}
                        type="error"
                    />
                );
            } else {
                toast.custom(
                    <MyToast
                        title="Unexpected error"
                        message="Something went wrong. Try again."
                        type="error"
                    />
                );
            }
        }
    };

    return (
        <section
            className="w-full bg-white max-w-xl mx-auto"
            aria-labelledby="simulation-form-title"
        >
            <form onSubmit={handleSubmit} className="flex flex-col gap-5">

                <div>
                    <label className="block text-sm font-medium mb-1">
                        Are you over 18?
                    </label>

                    <select
                        value={form.overEighteen}
                        onChange={(e) => handleChange("overEighteen", e.target.value)}
                        className="border rounded-lg px-3 py-2 w-full"
                    >
                        <option value="">Select...</option>
                        <option value="true">Yes</option>
                        <option value="false">No</option>
                    </select>

                    {errors.overEighteen && (
                        <p className="text-red-500 text-sm mt-1">{errors.overEighteen}</p>
                    )}
                </div>

                <div>
                    <label className="block text-sm font-medium mb-1">
                        Do you have a job offer?
                    </label>

                    <select
                        value={form.hasJobOffer}
                        onChange={(e) => handleChange("hasJobOffer", e.target.value)}
                        className="border rounded-lg px-3 py-2 w-full"
                    >
                        <option value="">Select...</option>
                        <option value="true">Yes</option>
                        <option value="false">No</option>
                    </select>

                    {errors.hasJobOffer && (
                        <p className="text-red-500 text-sm mt-1">{errors.hasJobOffer}</p>
                    )}
                </div>

                <div>
                    <label className="block text-sm font-medium mb-1">
                        Do you work remotely?
                    </label>

                    <select
                        value={form.worksRemotely}
                        onChange={(e) => handleChange("worksRemotely", e.target.value)}
                        className="border rounded-lg px-3 py-2 w-full"
                    >
                        <option value="">Select...</option>
                        <option value="true">Yes</option>
                        <option value="false">No</option>
                    </select>

                    {errors.worksRemotely && (
                        <p className="text-red-500 text-sm mt-1">{errors.worksRemotely}</p>
                    )}
                </div>

                <div>
                    <label className="block text-sm font-medium mb-1">
                        Is your enrollment confirmed?
                    </label>

                    <select
                        value={form.enrollmentConfirmed}
                        onChange={(e) => handleChange("enrollmentConfirmed", e.target.value)}
                        className="border rounded-lg px-3 py-2 w-full"
                    >
                        <option value="">Select...</option>
                        <option value="true">Yes</option>
                        <option value="false">No</option>
                    </select>

                    {errors.enrollmentConfirmed && (
                        <p className="text-red-500 text-sm mt-1">{errors.enrollmentConfirmed}</p>
                    )}
                </div>

                <div>
                    <label className="block text-sm font-medium mb-1">
                        Monthly Income
                    </label>

                    <input
                        type="text"
                        value={form.montlyIncome}
                        onChange={(e) => handleChange("montlyIncome", e.target.value)}
                        className="border rounded-lg px-3 py-2 w-full"
                        placeholder="Example: 3000"
                    />

                    {errors.montlyIncome && (
                        <p className="text-red-500 text-sm mt-1">{errors.montlyIncome}</p>
                    )}
                </div>

                <div className="flex justify-center gap-4 mt-6">

                    <button
                        type="submit"
                        className="bg-gray-900 text-white px-6 py-2 rounded-xl hover:bg-gray-800 cursor-pointer"
                    >
                        Save Simulation
                    </button>

                    <button
                        type="button"
                        onClick={onClose}
                        className="bg-gray-300 text-gray-800 px-6 py-2 rounded-xl hover:bg-gray-400 cursor-pointer"
                    >
                        Cancel
                    </button>
                </div>
            </form>
        </section>
    );
}
