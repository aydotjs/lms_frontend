import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import TeacherSidebar from "./TeacherSidebar";
import axios from "axios";


const baseUrl = "http://127.0.0.1:8000/api"; // Ensure this matches your backend URL

export default function ShowAssignment() {
    const [assignmentData, setAssignmentData] = useState([]);
    const [totalResult, setTotalResult] = useState(0);
    const { student_id } = useParams();
    const { teacher_id } = useParams();
    const [errorMsg, setErrorMsg] = useState("");

    useEffect(() => {
        // Validate course_id
        // if (!course_id) {
        //   setErrorMsg("No course ID provided.");
        //   console.error("No course_id found in URL parameters.");
        //   return;
        // }

        const url = `${baseUrl}/student-assignment/${teacher_id}/${student_id}`;
        console.log("Fetching URL:", url);

        axios
            .get(url)
            .then((res) => {
                console.log("Response Data:", res.data);
                if (res.data && res.data.length > 0) {
                    setAssignmentData(res.data);
                    setTotalResult(res.data.length);
                } else {
                    setErrorMsg("No asignment for this student.");
                }
            })
            .catch((error) => {
                console.error("Error fetching course chapters:", error);
                if (error.response) {
                    // Server responded with a status other than 2xx
                    if (error.response.status === 404) {
                        setErrorMsg("Course chapters not found.");
                    } else if (error.response.status === 401) {
                        setErrorMsg("Unauthorized access. Please log in.");
                    } else {
                        setErrorMsg("An unexpected error occurred.");
                    }
                } else if (error.request) {
                    // Request was made but no response received
                    setErrorMsg("No response from the server. Please try again later.");
                } else {
                    // Something else happened
                    setErrorMsg("Error: " + error.message);
                }
            });
    }, []);
    const Swal = require('sweetalert2');

    //   const handleDeleteClick = async (chapter_id) => {
    //     const result = await Swal.fire({
    //         title: 'Confirm',
    //         text: 'Are you sure you want to delete this chapter?',
    //         icon: 'info',
    //         confirmButtonText: 'Continue',
    //         showCancelButton: true
    //     });

    //     if (result.isConfirmed) {
    //         try {
    //             // Delete the chapter
    //             await axios.delete(baseUrl + '/chapter/' + chapter_id + "/");
    //             Swal.fire('success', 'This particular chapter has been deleted.');

    //             try {
    //                 // Fetch updated list of course chapters
    //                 const res = await axios.get(baseUrl + '/course-chapters/' + course_id);
    //                 setTotalResult(res.data.length);
    //                 setChapterData(res.data);
    //             } catch (error) {
    //                 console.error(error);
    //             }

    //         } catch (error) {
    //             Swal.fire('error', 'Chapter has not been deleted!');
    //         }
    //     } else {
    //         Swal.fire('error', 'Chapter has not been deleted!!');
    //     }
    // };


    return (
        <div className="container mt-4">
            <div className="row">
                <aside className="col-md-3">
                    <TeacherSidebar />
                </aside>
                <section className="col-md-9">
                    <div className="card">
                        <h5 className="card-header">All Assignments ({totalResult}) <Link className="btn btn-success float-end" to={"/add-assignment/" + student_id + "/" + teacher_id + "/"}>Add Assignment</Link></h5>
                        <div className="card-body">
                            {errorMsg && <p className="text-danger">{errorMsg}</p>}
                            {assignmentData.length > 0 ? (
                                <table className="table table-bordered">
                                    <thead>
                                        <tr>
                                            <th>Title</th>

                                        </tr>
                                    </thead>
                                    <tbody>
                                        {assignmentData.map((assignment, index) => (
                                            <tr key={index}>
                                                <td>
                                                    {assignment.title}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            ) : (
                                !errorMsg && <p>No Assignment found🙇</p>
                            )}
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
}
