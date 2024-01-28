import React from "react";
import { useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";

function preprocessFeedback(feedback) {
    // Remove lines that start with "start" and end with "end"
    const filteredFeedback = feedback
        .split("\n")
        .filter((line) => !line.startsWith("`") && !line.endsWith("`"))
        .join("\n");

    return filteredFeedback;
}

function renderValue(value) {
    // If the value is an object, recursively render its properties
    if (typeof value === "object" && value !== null) {
        return (
            <ul>
                {Object.entries(value).map(([nestedKey, nestedValue]) => (
                    <li key={nestedKey}>
                        <strong>{nestedKey}:</strong> {renderValue(nestedValue)}
                    </li>
                ))}
            </ul>
        );
    }
    // Otherwise, render the value directly
    return value;
}

function Feedback() {
    const location = useLocation();
    let feedback = location.state.feedback;

    // Preprocess feedback to remove specific lines
    feedback = preprocessFeedback(feedback);

    // Parse the JSON string into an object
    const feedbackObject = JSON.parse(feedback);

    // Extract keys and values from the object
    const feedbackEntries = Object.entries(feedbackObject);

    return (
        <div>
            <Navbar />
            <div>
                {feedbackEntries.map(([key, value]) => (
                    <div key={key}>
                        <strong>{key}:</strong> {renderValue(value)}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Feedback;
