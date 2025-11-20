import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import SimulationForm from "../../src/components/SimulationForm";
import { createSimulation } from "../../src/services/SimulationService";

vi.mock("../../src/services/SimulationService", () => ({
    createSimulation: vi.fn(),
}));

describe("SimulationForm", () => {
    let onCloseMock;
    let onSuccessMock;

    beforeEach(() => {
        onCloseMock = vi.fn();
        onSuccessMock = vi.fn();
    });

    it("renders all fields", () => {
        render(<SimulationForm onClose={onCloseMock} onSuccess={onSuccessMock} />);

        expect(screen.getByLabelText("Are you over 18?")).toBeInTheDocument();
        expect(screen.getByLabelText("Do you have a job offer?")).toBeInTheDocument();
        expect(screen.getByLabelText("Do you work remotely?")).toBeInTheDocument();
        expect(screen.getByLabelText("Is your enrollment confirmed?")).toBeInTheDocument();
        expect(screen.getByLabelText("Monthly Income")).toBeInTheDocument();
    });

    it("updates fields correctly", () => {
        render(<SimulationForm onClose={onCloseMock} onSuccess={onSuccessMock} />);

        const incomeInput = screen.getByPlaceholderText("Example: 3000");
        fireEvent.change(incomeInput, { target: { value: "3500" } });

        expect(incomeInput.value).toBe("3500");
    });

    it("submits a valid form and calls onSuccess", async () => {
        createSimulation.mockResolvedValue({
            visaType: "Work",
            message: "Since you have a job offer, we recommend the Work visa.",
        });

        render(<SimulationForm onClose={onCloseMock} onSuccess={onSuccessMock} />);

        fireEvent.change(screen.getByLabelText("Are you over 18?"), {
            target: { value: "true" },
        });
        fireEvent.change(screen.getByLabelText("Do you have a job offer?"), {
            target: { value: "true" },
        });
        fireEvent.change(screen.getByLabelText("Do you work remotely?"), {
            target: { value: "false" },
        });
        fireEvent.change(screen.getByLabelText("Is your enrollment confirmed?"), {
            target: { value: "false" },
        });
        fireEvent.change(screen.getByPlaceholderText("Example: 3000"), {
            target: { value: "4000" },
        });

        fireEvent.click(screen.getByRole("button", { name: "Save Simulation" }));

        await waitFor(() => {
            expect(createSimulation).toHaveBeenCalledTimes(1);
            expect(onSuccessMock).toHaveBeenCalledTimes(1);
        });
    });

    it("shows validation errors returned from backend", async () => {
        createSimulation.mockRejectedValue({
            response: {
                data: {
                    errors: ["Field montlyIncome is mandatory."],
                },
            },
        });

        render(<SimulationForm onClose={onCloseMock} onSuccess={onSuccessMock} />);

        fireEvent.click(screen.getByRole("button", { name: "Save Simulation" }));

        const errorMsg = await screen.findByText("Field montlyIncome is mandatory.");

        expect(errorMsg).toBeInTheDocument();
    });

    it("calls onClose when Cancel is clicked", () => {
        render(<SimulationForm onClose={onCloseMock} onSuccess={onSuccessMock} />);

        fireEvent.click(screen.getByRole("button", { name: "Cancel" }));

        expect(onCloseMock).toHaveBeenCalledTimes(1);
    });
});
