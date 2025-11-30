import { useState } from "react";
import { employeeApi } from "../api/employeeApi";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";

export default function EmployeeCreatePage() {
    const navigate = useNavigate();

    const [form, setForm] = useState({
        first_name: "",
        last_name: "",
        email: ""
    });

    const [file, setFile] = useState(null);
    const [preview, setPreview] = useState(null);

    const change = (e) =>
        setForm({ ...form, [e.target.name]: e.target.value });

    const handleFile = (e) => {
        const f = e.target.files[0];
        setFile(f);
        setPreview(URL.createObjectURL(f));
    };

    const submit = async (e) => {
        e.preventDefault();

        const fd = new FormData();
        fd.append("first_name", form.first_name);
        fd.append("last_name", form.last_name);
        fd.append("email", form.email);

        if (file) fd.append("profile_picture", file);

        try {
        await employeeApi.create(fd, true);
        alert("Employee created!");
        navigate("/employees");
        } catch (err) {
        alert("Failed to create employee");
        }
    };

    return (
        <div>
        <Header />

        <div style={{ padding: "30px", maxWidth: "500px", margin: "0 auto" }}>
            <h2>Add Employee</h2>

            {preview && (
            <img
                src={preview}
                alt="preview"
                style={{ width: 120, height: 120, borderRadius: "50%", objectFit: "cover" }}
            />
            )}

            <form onSubmit={submit} style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
            <input type="text" name="first_name" placeholder="First Name" onChange={change} required style={inputStyle} />
            <input type="text" name="last_name" placeholder="Last Name" onChange={change} required style={inputStyle} />
            <input type="email" name="email" placeholder="Email" onChange={change} required style={inputStyle} />

            {/* Picture upload */}
            <input type="file" accept="image/*" onChange={handleFile} />

            <div style={{ display: "flex", gap: "10px" }}>
                <button type="submit" style={saveBtn}>Save</button>
                <button type="button" style={cancelBtn} onClick={() => navigate("/employees")}>Cancel</button>
            </div>
            </form>
        </div>
        </div>
    );
}

const inputStyle = {
    padding: "12px",
    borderRadius: "5px",
    border: "1px solid #ccc"
};

const saveBtn = {
    background: "#28A745",
    color: "white",
    padding: "10px 20px",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer"
};

const cancelBtn = {
    background: "#6c757d",
    color: "white",
    padding: "10px 20px",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer"
};
