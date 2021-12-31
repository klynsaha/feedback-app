import React from "react";
import { useContext } from "react";
import FeedbackContext from "../Context/FeedbackContext";
import Card from "./common/Card";
import { FaTimes, FaEdit } from "react-icons/fa";

function FeedbackItem({ feedback }) {
    const { editFeedback, deleteFeedback } = useContext(FeedbackContext);

    return (
        <Card reverse={true}>
            <div className="num-display">{feedback.rating}</div>
            <button
                className="close"
                onClick={() => deleteFeedback(feedback.id)}
            >
                <FaTimes color="purple" />
            </button>
            <button className="edit" onClick={() => editFeedback(feedback)}>
                <FaEdit color="purple" />
            </button>
            <div className="text-display">{feedback.text}</div>
        </Card>
    );
}

export default FeedbackItem;
