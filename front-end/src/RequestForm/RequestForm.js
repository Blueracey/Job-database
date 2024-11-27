import React, { useState } from "react";
import axios from "axios"; // Import axios for making HTTP requests
import "./RequestForm.css";

function RequestForm({ visible, onClose, loggedInUserId }) {
    const [title, setTitle] = useState("");
    const [requestType, setRequestType] = useState("Feature");
    const [details, setDetails] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validation for title and details
        if (!title.trim()) {
            setErrorMessage("Title is required.");
            return;
        }
        if (!details.trim()) {
            setErrorMessage("Details are required.");
            return;
        }

        // Prepare data for backend
        const requestData = {
            title: title.trim(),
            media_type: requestType,
            details: details.trim(),
            user_id: loggedInUserId, // Use dynamically provided logged-in user ID
        };

        try {
            //Axios POST request to backend
            const response = await axios.post("http://localhost:8091/api/requests", requestData);
            console.log("Request submitted successfully:", response.data);

            // Success message
            alert("Request submitted successfully!");

            // Clear the form after submission
            setTitle("");
            setRequestType("Feature");
            setDetails("");
            setErrorMessage(""); // Clear error messages

            // Close the form
            onClose();
        } catch (error) {
            console.error("Error submitting the request:", error);
            alert("Failed to submit the request. Please try again.");
        }
    };

    const handleCancel = () => {
        // Reset form fields
        setTitle("");
        setRequestType("Feature");
        setDetails("");
        setErrorMessage(""); // Clear error messages

        // Close the form
        onClose();
    };

    return (
        <div className={`request-form-overlay ${visible ? "" : "hidden"}`}>
            <div className="request-form-title">Request Form</div>
            {errorMessage && <div className="error-message">{errorMessage}</div>}
            <form onSubmit={handleSubmit} className="request-form-fields">
                <div className="request-form-field">
                    <label htmlFor="title">Title:</label>
                    <input
                        type="text"
                        id="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Enter title..."
                    />
                </div>
                <div className="request-form-field">
                    <label htmlFor="requestType">Request Type:</label>
                    <select
                        id="requestType"
                        value={requestType}
                        onChange={(e) => setRequestType(e.target.value)}
                    >
                        <option value="Feature">Feature</option>
                        <option value="Bug">Bug</option>
                        <option value="Improvement">Improvement</option>
                        <option value="Other">Other</option>
                    </select>
                </div>
                <div className="request-form-field">
                    <label htmlFor="details">Details:</label>
                    <textarea
                        id="details"
                        value={details}
                        onChange={(e) => setDetails(e.target.value)}
                        placeholder="Enter details..."
                    ></textarea>
                </div>
                <div className="request-form-buttons">
                    <button type="submit" className="submit-button">
                        Submit
                    </button>
                    <button
                        type="button"
                        onClick={handleCancel}
                        className="cancel-button"
                    >
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    );
}

export default RequestForm;
