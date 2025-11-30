import { useEffect, useState } from "react";
import { employeeApi } from "../api/employeeApi";
import { useParams, useNavigate } from "react-router-dom";
import Header from "../components/Header";

export default function EmployeeDetailPage() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [employee, setEmployee] = useState(null);
    const [file, setFile] = useState(null);

    useEffect(() => {
        const load = async () => {
        try {
            const res = await employeeApi.getOne(id);
            setEmployee(res.data);
        } catch (err) {
            console.log("Error loading employee:", err);
        }
        };

        load();
    }, [id]);

    const handleUpload = async (e) => {
        e.preventDefault();

        if (!file) {
        alert("Please choose a file first.");
        return;
        }

        const formData = new FormData();
        formData.append("profile_picture", file);

        try {
        await employeeApi.update(id, formData, true);
        alert("Profile picture updated!");
        window.location.reload();
        } catch (err) {
        alert("Upload failed");
        }
    };

    if (!employee) return <p style={{ padding: 20 }}>Loading...</p>;

    return (
        <div>
        <Header />

        <div style={{ padding: "30px", maxWidth: "500px", margin: "0 auto" }}>
            <h2>Employee Details</h2>

            {/* Profile Picture */}
            <div style={{ marginBottom: "20px", textAlign: "center" }}>
            {employee.profile_picture ? (
                <img
                src={`http://localhost:3002${employee.profile_picture}`}
                alt="Profile"
                style={{
                    width: "150px",
                    height: "150px",
                    borderRadius: "50%",
                    objectFit: "cover",
                    marginBottom: "10px",
                    border: "3px solid #ddd"
                }}
                />
            ) : (
                <div
                style={{
                    width: "150px",
                    height: "150px",
                    borderRadius: "50%",
                    background: "#ccc",
                    margin: "0 auto 10px auto"
                }}
                ></div>
            )}
            </div>

            {/* Basic Details */}
            <div style={{ marginBottom: "20px" }}>
            <p><strong>First Name:</strong> {employee.first_name}</p>
            <p><strong>Last Name:</strong> {employee.last_name}</p>
            <p><strong>Email:</strong> {employee.email}</p>
            </div>

            {/* Upload New Image */}
            <form onSubmit={handleUpload} style={{ marginBottom: "25px" }}>
            <label style={{ fontWeight: "bold" }}>Upload New Profile Picture:</label>
            <input
                type="file"
                accept="image/*"
                onChange={(e) => setFile(e.target.files[0])}
                style={fileInput}
            />

            <button type="submit" style={uploadBtn}>
                Upload Picture
            </button>
            </form>

            {/* Back Button */}
            <button
            onClick={() => navigate("/employees")}
            style={backBtn}
            >
            Back to List
            </button>

        </div>
        </div>
    );
}

const fileInput = {
    margin: "10px 0",
    display: "block"
};

const uploadBtn = {
    padding: "10px 20px",
    background: "#007BFF",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "16px",
    marginBottom: "10px"
};

const backBtn = {
    padding: "10px 20px",
    background: "#6c757d",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "16px"
};
