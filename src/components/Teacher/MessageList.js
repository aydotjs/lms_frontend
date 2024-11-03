import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

const baseUrl = 'http://127.0.0.1:8000/api';

function MessageList(props) {
    const [msgData, setMsgData] = useState([]);
    const teacherId = props.teacherId;

    // // Fetch quiz data on page load
    // useEffect(() => {
    //     async function fetchQuizData() {
    //         try {
    //             const response = await axios.get(`${baseUrl}/teacher-quiz/${teacherId}`);
    //             setMsgData(response.data);
    //         } catch (error) {
    //             console.error('Error fetching quiz data:', error);
    //             Swal.fire('Error', 'Could not fetch quiz data', 'error');
    //         }
    //     }

    //     fetchQuizData();
    // }, [teacherId]);

    return (
        <>
            <div className="row">
                {/* From Another user */}
                <div className="col-5">
                    <div className="alert alert-primary mb-1">
                       This is from Aisha
                    </div>
                    <small className="text-muted">22-07-2022 10:34</small>
                </div>
            </div>

            {/* My Messages */}
            <div className="row">
                {/* From Another user */}
                <div className="col-5 offset-7">
                    <div className="alert alert-success mb-1">
                    This is from Me
                    </div>
                    <small className="text-muted">22-07-2022 10:34</small>
                </div>
            </div>
        </>
    );
}

export default MessageList;
