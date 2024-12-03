import TeacherSidebar from "./TeacherSidebar"; // Importing the sidebar for navigation
import axios from "axios"; // Axios for making HTTP requests
import { useState } from "react"; // useState hook for managing component state
import { useParams } from "react-router-dom"; // useParams hook for retrieving route parameters
import { toast, ToastContainer } from "react-toastify"; // React Toastify for displaying notifications
import "react-toastify/dist/ReactToastify.css"; // Importing Toastify styles

// Base URL for the API
const baseUrl = "https://Ambesten.pythonanywhere.com/api";

// Component for adding a new chapter to a course
export default function AddChapter() {
  // State to manage form data for adding a chapter
  const [chapterData, setChapterData] = useState({
    title: "",
    description: "",
    video: null, // Store video file
    remarks: "",
  });

  // State to manage loading status during the form submission process
  const [isLoading, setIsLoading] = useState(false);

  // Extracting the course_id from URL parameters using useParams hook
  const { course_id } = useParams();

  // Handler for form text input changes (title, description, remarks)
  const handleChange = (event) => {
    setChapterData({
      ...chapterData,
      [event.target.name]: event.target.value, // Update the respective form field in state
    });
  };

  // Handler for file input changes (video upload)
  const handleFileChange = (event) => {
    setChapterData({
      ...chapterData,
      video: event.target.files[0], // Store the selected video file in state
    });
  };

  // Function to handle form submission
  const formSubmit = async () => {
    setIsLoading(true); // Start loading state
    const formData = new FormData(); // Creating FormData object to send form data including file

    // Append form fields to FormData
    formData.append("course", course_id); // Include course ID
    formData.append("title", chapterData.title); // Include chapter title
    formData.append("description", chapterData.description); // Include description
    formData.append("video", chapterData.video, chapterData.video.name); // Include video file and its name
    formData.append("remarks", chapterData.remarks); // Include any remarks

    // Display toast notification for upload progress
    const loadingToastId = toast.info("Uploading chapter, please wait...", { autoClose: false });

    try {
      // Making a POST request to the backend API to upload chapter data
      const res = await axios.post(`${baseUrl}/chapter/`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      // Update the toast notification to show success message once the upload is complete
      toast.update(loadingToastId, {
        render: "Chapter uploaded successfully!",
        type: "success",
        autoClose: 5000, // Close the toast after 5 seconds
      });

      // Reload the page after successful upload
      window.location.reload();
    } catch (error) {
      // Handle error and update the toast notification to show error message
      console.error("Error submitting chapter:", error.response?.data || error.message);
      toast.update(loadingToastId, {
        render: "Error uploading chapter. Please try again.",
        type: "error",
        autoClose: 5000,
      });
    } finally {
      setIsLoading(false); // End loading state
    }
  };

  return (
    <div className="container mt-4">
      {/* ToastContainer for displaying notifications */}
      <ToastContainer />

      <div className="row">
        {/* Sidebar for teacher navigation */}
        <aside className="col-md-3">
          <TeacherSidebar />
        </aside>

        {/* Main content area for the Add Chapter form */}
        <div className="col-9">
          <div className="card">
            <h5 className="card-header">Add Chapter</h5>
            <div className="card-body">
              <form>
                {/* Input for chapter title */}
                <div className="mb-3">
                  <label htmlFor="title" className="form-label">Title</label>
                  <input
                    type="text"
                    id="title"
                    name="title"
                    className="form-control"
                    onChange={handleChange} // Handle changes to the title input
                  />
                </div>

                {/* Textarea for chapter description */}
                <div className="mb-3">
                  <label htmlFor="description" className="form-label">Description</label>
                  <textarea
                    id="description"
                    name="description"
                    className="form-control"
                    onChange={handleChange} // Handle changes to the description input
                  ></textarea>
                </div>

                {/* File input for uploading a video */}
                <div className="mb-3">
                  <label htmlFor="video" className="form-label">Video</label>
                  <input
                    type="file"
                    id="video"
                    name="video"
                    onChange={handleFileChange} // Handle file upload (video)
                    className="form-control"
                  />
                </div>

                {/* Textarea for additional remarks */}
                <div className="mb-3">
                  <label htmlFor="remarks" className="form-label">Remarks</label>
                  <textarea
                    id="remarks"
                    name="remarks"
                    className="form-control"
                    onChange={handleChange} // Handle changes to the remarks input
                  ></textarea>
                </div>

                {/* Button to submit the form and upload the chapter */}
                <button
                  type="button"
                  onClick={formSubmit} // Trigger form submission on click
                  className="btn btn-primary"
                  disabled={isLoading} // Disable button while uploading
                >
                  {isLoading ? "Uploading..." : "Upload Chapter"} {/* Show loading text if uploading */}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
