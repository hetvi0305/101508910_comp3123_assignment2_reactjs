import { useNavigate } from "react-router-dom";

export default function Header() {
    const navigate = useNavigate();

    const logout = () => {
        localStorage.removeItem("token");
        navigate("/login");
    };

    const headerStyle = {
        background: "#007BFF",
        padding: "15px 25px",
        color: "white",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: "20px",
    };

    const btnStyle = {
        background: "white",
        color: "#007BFF",
        padding: "8px 16px",
        border: "none",
        borderRadius: "5px",
        cursor: "pointer",
        fontWeight: "bold",
    };

    return (
        <header style={headerStyle}>
        <h2 style={{ margin: 0 }}>Employee Management App</h2>
        <button onClick={logout} style={btnStyle}>Logout</button>
        </header>
    );
}
