import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
    const navigate = useNavigate();

    const logout = () => {
        localStorage.removeItem("token");
        navigate("/login");
    };

    return (
        <nav style={{ padding: 20, background: "#eee" }}>
        <Link to="/employees" style={{ marginRight: 20 }}>Employees</Link>
        <button onClick={logout}>Logout</button>
        </nav>
    );
}
