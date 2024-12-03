import { useState } from "react";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";
import TeacherSidebar from "./TeacherSidebar";

const baseUrl = "https://Ambesten.pythonanywhere.com/api";

export default function AddAssignment() {
    // State for storing assignment data inputs
    const [assignmentData, setAssignmentData] = useState({
        title: "",
        detail: "",
    });

    // Retrieve student and teacher IDs from route parameters
    const { student_id } = useParams();
    const { teacher_id } = useParams();

    // Handle input changes to update assignment data state
    const handleChange = (event) => {
        setAssignmentData({
            ...assignmentData,
            [event.target.name]: event.target.value,
        });
    };

    // Submit the form data to the server
    const formSubmit = () => {
        const _formData = new FormData();
        _formData.append("teacher", teacher_id);
        _formData.append("title", assignmentData.title);
        _formData.append("detail", assignmentData.detail);
        _formData.append("student", student_id);

        try {
            axios
                .post(baseUrl + "/student-assignment/" + teacher_id + "/" + student_id + "/", _formData, {
                    headers: {
                        "content-type": "multipart/form-data",
                    },
                })
                .then((res) => {
                    // Show success notification on successful submission
                    if (res.status === 200 || res.status === 201) {
                        Swal.fire({
                            title: 'Assignment has been added',
                            icon: 'success',
                            toast: true,
                            timer: 3000,
                            position: 'top-right',
                            timerProgressBar: true,
                            showConfirmButton: false
                        });
                        // Reload page to refresh the form
                        window.location.reload();
                    }
                });
        } catch (error) {
            console.log("Error submitting assignment:", error);
        }
    };

    return (
        <div className="container mt-4">
            <div className="row">
                {/* Sidebar for teacher-specific navigation */}
                <aside className="col-md-3">
                    <TeacherSidebar />
                </aside>

                <div className="col-9">
                    <div className="card">
                        <h5 className="card-header">Add Assignment</h5>
                        <div className="card-body">
                            <form>
                                {/* Assignment Title Input */}
                                <div className="mb-3">
                                    <label htmlFor="title" className="form-label">Title</label>
                                    <input
                                        type="text"
                                        id="title"
                                        name="title"
                                        className="form-control"
                                        onChange={handleChange}
                                    />
                                </div>

                                {/* Assignment Description Input */}
                                <div className="mb-3">
                                    <label htmlFor="description" className="form-label">Description</label>
                                    <textarea
                                        id="detail"
                                        name="detail"
                                        className="form-control"
                                        onChange={handleChange}
                                    ></textarea>
                                </div>

                                {/* Submit Button */}
                                <button
                                    type="button"
                                    onClick={formSubmit}
                                    className="btn btn-primary"
                                >
                                    Submit
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
