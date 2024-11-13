import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

// Base URL for the API
const baseUrl = 'http://127.0.0.1:8000/api';

function MessageList(props) {
    // State to hold messages data
    const [msgData, setMsgData] = useState([]);

    // Fetch initial messages when the component loads
    useEffect(() => {
        const fetchInitialMessages = async () => {
            try {
                const response = await axios.get(`${baseUrl}/get-messages/${props.teacher_id}/${props.student_id}`);
                setMsgData(response.data);
            } catch (error) {
                console.error("Error fetching messages:", error);
            }
        };

        fetchInitialMessages();
    }, [props.teacher_id, props.student_id]); // Dependencies ensure this runs when teacher_id or student_id changes

    // Function to manually fetch messages, also scrolls to the latest message
    const fetchMsgs = async () => {
        try {
            const response = await axios.get(`${baseUrl}/get-messages/${props.teacher_id}/${props.student_id}`);
            setMsgData(response.data);

            // Automatically scroll to the bottom of the message list
            const objDiv = document.getElementById("msgList");
            objDiv.scrollTop = objDiv.scrollHeight;
        } catch (error) {
            console.error("Error refreshing messages:", error);
        }
    };

    // Inline styling for the message list container
    const msgListStyle = {
        height: "500px",
        overflow: "auto",
    };

    return (
        <>
            {/* Refresh button to manually fetch messages */}
            <span className="btn btn-sm btn-secondary" onClick={fetchMsgs} title="Refresh">
                <i className="bi bi-bootstrap-reboot"></i>
            </span>

            {/* Message list container */}
            <div style={msgListStyle} id="msgList">
                {
                    // Map through msgData and display each message
                    msgData.map((row, index) => (
                        <div className="row mb-4" key={index}>
                            {/* Display messages from the student on the left side */}
                            {row.msg_from !== 'teacher' && (
                                <div className="col-5">
                                    <div className="alert alert-primary mb-1">
                                        {row.msg_text}
                                    </div>
                                    <small className="text-muted">{row.msg_time}</small>
                                </div>
                            )}

                            {/* Display messages from the teacher on the right side */}
                            {row.msg_from === 'teacher' && (
                                <div className="col-5 offset-7">
                                    <div className="alert alert-success mb-1">
                                        {row.msg_text}
                                    </div>
                                    <small className="text-muted">{row.msg_time}</small>
                                </div>
                            )}
                        </div>
                    ))
                }
            </div>
        </>
    );
}

export default MessageList;
