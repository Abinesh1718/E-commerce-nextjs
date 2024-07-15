import toast from "react-hot-toast";

export const makeToast = (text, type = "success") => {
    const options = {
        style: {
            borderRadius: "4px",
            background: "#333",
            color: "#fff",
        },
    };

    switch (type) {
        case "success":
            toast.success(text, options);
            break;
        case "error":
            toast.error(text, options);
            break;

        default:
            toast(text, options);
            break;
    }
};

