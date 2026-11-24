import { useState } from "react";
import { createSimulation } from "../services/SimulationService";
import toast from "react-hot-toast";
import MyToast from "./toasts/MyToast";

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
            const toBoolean = (value) => (value === "" ? null : value === "true");

            const payload = {
                overEighteen: toBoolean(form.overEighteen),
                hasJobOffer: toBoolean(form.hasJobOffer),
                worksRemotely: toBoolean(form.worksRemotely),
                enrollmentConfirmed: toBoolean(form.enrollmentConfirmed),
                montlyIncome: form.montlyIncome
            };

            const result = await createSimulation(payload);

            onSuccess(result);

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
        }    };

    return (
        <section
            className="w-full bg-white max-w-xl mx-auto"
            aria-labelledby="simulation-form-title"
        >
            <form onSubmit={handleSubmit} className="flex flex-col gap-5">

                <section>
                    <label htmlFor="overEighteen" className="block text-sm font-medium mb-1">
                        Are you over 18?
                    </label>

                    <select
                        id="overEighteen"
                        aria-required="true"
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
                </section>

                <section>
                    <label htmlFor="hasJobOffer" className="block text-sm font-medium mb-1">
                        Do you have a job offer?
                    </label>

                    <select
                        id="hasJobOffer"
                        aria-required="true"
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
                </section>

                <section>
                    <label htmlFor="worksRemotely" className="block text-sm font-medium mb-1">
                        Do you work remotely?
                    </label>

                    <select
                        id="worksRemotely"
                        aria-required="true"
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
                </section>

                <section>
                    <label htmlFor="enrollmentConfirmed" className="block text-sm font-medium mb-1">
                        Is your enrollment confirmed?
                    </label>

                    <select
                        id="enrollmentConfirmed"
                        aria-required="true"
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
                </section>

                <section>
                    <label htmlFor="monthlyIncome" className="block text-sm font-medium mb-1">
                        Monthly Income
                    </label>

                    <input
                        id="monthlyIncome"
                        aria-required="true"
                        type="text"
                        value={form.montlyIncome}
                        onChange={(e) => handleChange("montlyIncome", e.target.value)}
                        className="border rounded-lg px-3 py-2 w-full"
                        placeholder="Example: 3000"
                    />

                    {errors.montlyIncome && (
                        <p className="text-red-500 text-sm mt-1">{errors.montlyIncome}</p>
                    )}
                </section>

                <section className="flex justify-center gap-4 mt-6">

                    <button
                        type="submit"
                        className="bg-gray-900 text-white px-6 py-2 rounded-xl hover:bg-gray-600 cursor-pointer"
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
                </section>
            </form>
        </section>
    );
}
