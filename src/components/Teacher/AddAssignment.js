import TeacherSidebar from "./TeacherSidebar";
import axios from "axios";
import { useState } from "react";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";
const baseUrl = "http://127.0.0.1:8000/api";
export default function AddAssignment() {
    const [assignmentData, setAssignmentData] = useState({
        title: "",
        detail: "",
    });

    const handleChange = (event) => {
        setAssignmentData({
            ...assignmentData,
            [event.target.name]: event.target.value,
        });
    };

    const { student_id } = useParams();
    const { teacher_id } = useParams();
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
                        window.location.reload();
                    }

                });
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="container mt-4">
            <div className="row">
                <aside className="col-md-3">
                    <TeacherSidebar />
                </aside>
                <div className="col-9">
                    <div className="card">
                        <h5 className="card-header">Add Assignment</h5>
                        <div className="card-body">
                            <form>
                                <div className="mb-3">
                                    <label for="title" className="form-label">
                                        Title
                                    </label>
                                    <input
                                        type="text"
                                        id="title"
                                        name="title"
                                        className="form-control"
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label for="description" className="form-label">
                                        Description
                                    </label>
                                    <textarea
                                        id="detail"
                                        name="detail"
                                        className="form-control"
                                        onChange={handleChange}
                                    ></textarea>
                                </div>
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
