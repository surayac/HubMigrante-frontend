import toast from "react-hot-toast";
import { deleteMyUser } from "../../services/UserService";
import MyToast from "../toasts/MyToast";
import ConfirmToast from "../toasts/ConfirmToast";
import { useAuth } from "../../context/AuthContext";

export default function DeleteAccountButton() {
  const { logout } = useAuth();

  const handleDelete = () => {
    toast.custom((t) => (
      <ConfirmToast
        message="Are you sure you want to delete your account?"
        onConfirm={async () => {
          try {
            await deleteMyUser();
            logout();

            toast.custom(
              <MyToast
                title="Account deleted"
                message="Your account was removed successfully."
                type="success"
              />
            );

            setTimeout(() => {
              window.location.href = "/";
            }, 1200);

          } catch (err) {
            console.error("Error deleting account:", err);

            toast.custom(
              <MyToast
                title="Deletion failed"
                message="Could not delete your account."
                type="error"
              />
            );
          }
        }}
      />
    ));
  };

  return (
    <button
      onClick={handleDelete}
      className="mt-4 text-sm text-red-600 underline cursor-pointer"
    >
      Delete Account
    </button>
  );
}
