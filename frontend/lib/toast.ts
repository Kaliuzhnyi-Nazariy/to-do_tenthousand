import toast from "react-hot-toast";

export const toastSuccess = (message: string) => {
  toast.success(message ?? "Successfully!", {
    className: "bg-(--success)",
  });
};

export const toastError = (message?: string) => {
  toast.error(message ?? "Successfully!", {
    className: "bg-(--destructive)",
  });
};
