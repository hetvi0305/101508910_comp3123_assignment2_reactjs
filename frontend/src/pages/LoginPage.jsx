import { useState } from "react";
import { authApi } from "../api/authApi";
import { useNavigate, Link } from "react-router-dom";

export default function LoginPage() {
    const navigate = useNavigate();

    const [form, setForm] = useState({
        email: "",
        password: "",
    });

    const change = (e) =>
        setForm({ ...form, [e.target.name]: e.target.value });

    const submit = async (e) => {
        e.preventDefault();

        try {
        const res = await authApi.login(form);
        localStorage.setItem("token", res.data.token);
        navigate("/employees");
        } catch (err) {
        alert(err.response?.data?.message || "Login failed");
        }
    };

    return (
        <div style={wrapper}>
        <div style={card}>
            <h2 style={{ textAlign: "center", marginBottom: "20px" }}>Login</h2>

            <form onSubmit={submit} style={formStyle}>
            <input
                name="email"
                type="email"
                placeholder="Email"
                onChange={change}
                required
                style={inputStyle}
            />

            <input
                name="password"
                type="password"
                placeholder="Password"
                onChange={change}
                required
                style={inputStyle}
            />

            <button type="submit" style={primaryBtn}>Login</button>
            </form>

            <p style={{ textAlign: "center", marginTop: "15px" }}>
            Don’t have an account?{" "}
            <Link to="/signup" style={linkStyle}>Sign Up</Link>
            </p>
        </div>
        </div>
    );
}

const wrapper = {
    height: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "#f4f4f4",
};

const card = {
    width: "350px",
    padding: "30px",
    background: "white",
    borderRadius: "8px",
    boxShadow: "0 0 10px rgba(0,0,0,0.1)",
};

const formStyle = {
    display: "flex",
    flexDirection: "column",
    gap: "15px",
};

const inputStyle = {
    padding: "12px",
    borderRadius: "5px",
    border: "1px solid #ccc",
    fontSize: "16px",
};

const primaryBtn = {
    background: "#007BFF",
    color: "white",
    padding: "12px",
    border: "none",
    borderRadius: "5px",
    fontSize: "16px",
    cursor: "pointer",
};

const linkStyle = {
    color: "#007BFF",
    textDecoration: "none",
};
