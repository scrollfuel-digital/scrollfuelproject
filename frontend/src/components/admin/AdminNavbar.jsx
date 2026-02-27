import { useNavigate } from "react-router-dom";

export default function AdminNavbar() {

    const navigate = useNavigate();

    const logout = () => {

        localStorage.removeItem("token");
        localStorage.removeItem("user");

        navigate("/admin/auth");
    };

    return (
        <div className="bg-black text-white shadow px-6 py-4 flex justify-between">

            <h1 className="text-xl font-bold">
                Admin Panel
            </h1>

            <button
                onClick={logout}
                className="bg-red-500 text-white px-4 py-2 rounded"
            >
                Logout
            </button>

        </div>
    );
}