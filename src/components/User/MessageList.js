import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

const baseUrl = "https://Ambesten.pythonanywhere.com/api";

function MessageList(props) {
  const [msgData, setMsgData] = useState([]);

  // Fetch messages when the component mounts
  useEffect(() => {
    // Initial fetch of messages between teacher and student
    const fetchInitialMessages = async () => {
      try {
        const response = await axios.get(`${baseUrl}/get-messages/${props.teacher_id}/${props.student_id}`);
        setMsgData(response.data);
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    };
    
    fetchInitialMessages();
  }, [props.teacher_id, props.student_id]);  // Dependency array ensures this runs when IDs change

  // Fetch the latest messages (useful for manual refresh)
  const fetchMsgs = async () => {
    try {
      const response = await axios.get(`${baseUrl}/get-messages/${props.teacher_id}/${props.student_id}`);
      setMsgData(response.data);

      // Auto-scroll to the bottom of the message list after fetching new messages
      const msgListDiv = document.getElementById("msgList");
      if (msgListDiv) {
        msgListDiv.scrollTop = msgListDiv.scrollHeight;
      }
    } catch (error) {
      console.error("Error refreshing messages:", error);
    }
  };

  // CSS for the message list container
  const msgListStyle = {
    height: "500px",
    overflow: "auto",
  };

  return (
    <>
      {/* Refresh button to manually refresh message list */}
      <span className="btn btn-sm btn-secondary" onClick={fetchMsgs} title="Refresh">
        <i className="bi bi-bootstrap-reboot"></i>
      </span>

      {/* Message list container */}
      <div style={msgListStyle} id="msgList">
        {
          // Loop through the messages and display them
          msgData.map((message, index) => (
            <div className="row mb-4" key={index}>
              {/* Messages from teacher */}
              {message.msg_from !== 'student' && (
                <div className="col-5">
                  <div className="alert alert-primary mb-1">
                    {message.msg_text}
                  </div>
                  <small className="text-muted">{message.msg_time}</small>
                </div>
              )}

              {/* Messages from student */}
              {message.msg_from === 'student' && (
                <div className="col-5 offset-7">
                  <div className="alert alert-success mb-1">
                    {message.msg_text}
                  </div>
                  <small className="text-muted">{message.msg_time}</small>
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
