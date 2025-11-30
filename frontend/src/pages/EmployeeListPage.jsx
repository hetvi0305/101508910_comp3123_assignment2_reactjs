import { useEffect, useState } from "react";
import { employeeApi } from "../api/employeeApi";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";

export default function EmployeesListPage() {
    const [employees, setEmployees] = useState([]);
    const navigate = useNavigate();

    const loadEmployees = async () => {
        const res = await employeeApi.getAll();
        setEmployees(res.data);
    };

    useEffect(() => {
        loadEmployees();
    }, []);

    const deleteEmployee = async (id) => {
        if (!window.confirm("Are you sure?")) return;
        await employeeApi.remove(id);
        loadEmployees();
    };

    return (
        <div>
        <Header />

        <div style={{ padding: "30px" }}>
            <h2>Employees List</h2>

            <button
            onClick={() => navigate("/employees/create")}
            style={addBtn}
            >
            + Add Employee
            </button>

            <table style={tableStyle}>
            <thead>
                <tr style={{ background: "#f3f3f3" }}>
                <th style={thStyle}>Picture</th>
                <th style={thStyle}>First Name</th>
                <th style={thStyle}>Last Name</th>
                <th style={thStyle}>Email</th>
                <th style={thStyle}>Actions</th>
                </tr>
            </thead>

            <tbody>
                {employees.map((emp) => (
                <tr key={emp._id}>
                    <td style={tdStyle}>
                    {emp.profile_picture ? (
                        <img
                        src={`http://localhost:3002${emp.profile_picture}`}
                        alt=""
                        style={imgStyle}
                        />
                    ) : (
                        <div style={placeholderImg}></div>
                    )}
                    </td>
                    <td style={tdStyle}>{emp.first_name}</td>
                    <td style={tdStyle}>{emp.last_name}</td>
                    <td style={tdStyle}>{emp.email}</td>
                    <td style={tdStyle}>
                    <button onClick={() => navigate(`/employees/${emp._id}/edit`)} style={editBtn}>Edit</button>
                    <button onClick={() => deleteEmployee(emp._id)} style={deleteBtn}>Delete</button>
                    <button onClick={() => navigate(`/employees/${emp._id}`)} style={viewBtn}>View</button>
                    </td>
                </tr>
                ))}
            </tbody>
            </table>
        </div>
        </div>
    );
}

const tableStyle = {
        width: "100%",
        background: "white",
        borderCollapse: "collapse",
        boxShadow: "0 0 8px rgba(0,0,0,0.1)"
};

const thStyle = { padding: "12px", borderBottom: "1px solid #ccc" };
const tdStyle = { padding: "10px", borderBottom: "1px solid #eee" };

const imgStyle = { width: "50px", height: "50px", borderRadius: "50%", objectFit: "cover" };

const placeholderImg = {
    width: "50px",
    height: "50px",
    borderRadius: "50%",
    background: "#bbb"
};

const addBtn = {
    padding: "10px 20px",
    background: "#28A745",
    color: "white",
    borderRadius: "5px",
    border: "none",
    cursor: "pointer",
    marginBottom: "20px"
};

const editBtn = {
    background: "#007BFF",
    color: "white",
    border: "none",
    padding: "6px 12px",
    marginRight: "8px",
    borderRadius: "4px",
    cursor: "pointer"
};

const deleteBtn = {
    background: "#DC3545",
    color: "white",
    border: "none",
    padding: "6px 12px",
    marginRight: "8px",
    borderRadius: "4px",
    cursor: "pointer"
};

const viewBtn = {
    background: "#17A2B8",
    color: "white",
    border: "none",
    padding: "6px 12px",
    borderRadius: "4px",
    cursor: "pointer"
};
