import { useEffect, useState } from "react";
import { employeeApi } from "../api/employeeApi";
import { useParams, useNavigate } from "react-router-dom";
import Header from "../components/Header";

export default function EmployeeEditPage() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [form, setForm] = useState({
        first_name: "",
        last_name: "",
        email: ""
    });

    const [file, setFile] = useState(null);
    const [preview, setPreview] = useState(null);

    useEffect(() => {
        const load = async () => {
        try {
            const res = await employeeApi.getOne(id);
            setForm({
            first_name: res.data.first_name,
            last_name: res.data.last_name,
            email: res.data.email
            });

            if (res.data.profile_picture) {
            setPreview(`http://localhost:3002${res.data.profile_picture}`);
            }
        } catch (err) {
            alert("Failed to load employee");
        }
        };
        load();
    }, [id]);

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
        await employeeApi.update(id, fd, true);
        alert("Updated successfully");
        navigate("/employees");
        } catch (err) {
        alert("Update failed");
        }
    };

    return (
        <div>
        <Header />

        <div style={{ padding: "30px", maxWidth: "500px", margin: "0 auto" }}>
            <h2>Edit Employee</h2>

            {preview && (
            <img
                src={preview}
                alt=""
                style={{ width: 120, height: 120, borderRadius: "50%", objectFit: "cover" }}
            />
            )}

            <form onSubmit={submit} style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
            <input type="text" name="first_name" value={form.first_name} onChange={change} required style={inputStyle} />
            <input type="text" name="last_name" value={form.last_name} onChange={change} required style={inputStyle} />
            <input type="email" name="email" value={form.email} onChange={change} required style={inputStyle} />

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
    background: "#007BFF",
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
