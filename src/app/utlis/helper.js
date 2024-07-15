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
        case "info":
            toast.custom(<InfoToast text={text} />, options);  // Custom info toast example
            break;
        default:
            toast(text, options);
            break;
    }
};

// Example of a custom info toast component
const InfoToast = ({ text }) => (
    <div style={{ padding: '10px', backgroundColor: '#007BFF', color: '#fff', borderRadius: '4px' }}>
        {text}
    </div>
);
