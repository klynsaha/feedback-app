import React from "react";
import Card from "./common/Card";
import { FaTimes } from "react-icons/fa";

function FeedbackItem({ feedback, handleDelete }) {
    return (
        <Card reverse={true}>
            <div className="num-display">{feedback.rating}</div>
            <button className="close" onClick={() => handleDelete(feedback.id)}>
                <FaTimes color="purple" />
            </button>
            <div className="text-display">{feedback.text}</div>
        </Card>
    );
}

export default FeedbackItem;
