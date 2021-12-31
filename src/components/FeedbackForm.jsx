import React from "react";
import { useState, useContext, useEffect } from "react";
import FeedbackContext from "../Context/FeedbackContext";
import Card from "./common/Card";
import Button from "./common/Button";
import RatingSelect from "./RatingSelect";

function FeedbackForm() {
    const { addFeedback, feedbackEdit, updateFeedback } =
        useContext(FeedbackContext);

    const [rating, setRating] = useState(10);
    const [text, setText] = useState("");
    const [btnDisabled, setBtnDisabled] = useState(true);
    const [message, setMessage] = useState();

    const handleTextChange = (evt) => {
        const inputVal = evt.target.value;
        setText(inputVal);

        if (!inputVal) {
            setBtnDisabled(true);
            setMessage(null);
        } else if (inputVal !== "" && inputVal.trim().length <= 10) {
            setBtnDisabled(true);
            setMessage("Text must be atleast 10 characters");
        } else {
            setBtnDisabled(false);
            setMessage(null);
        }
    };

    useEffect(() => {
        if (feedbackEdit.edit) {
            setBtnDisabled(false);
            setRating(feedbackEdit.feedback.rating);
            setText(feedbackEdit.feedback.text);
        }
    }, [feedbackEdit]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (text.trim().length <= 10) return;
        const newFeedback = {
            rating,
            text,
        };
        if (feedbackEdit.edit) {
            updateFeedback(feedbackEdit.feedback.id, newFeedback);
        } else {
            addFeedback(newFeedback);
        }
        setText("");
    };

    return (
        <Card>
            <form onSubmit={handleSubmit}>
                <h2>How would you rate your service with us ?</h2>
                <RatingSelect select={(userRating) => setRating(userRating)} />
                <div className="input-group">
                    <input
                        type="text"
                        placeholder="write a review"
                        onChange={handleTextChange}
                        value={text}
                    />
                    <Button type="submit" isDisabled={btnDisabled}>
                        Send
                    </Button>
                </div>
                {message && <div className="message">{message}</div>}
            </form>
        </Card>
    );
}

export default FeedbackForm;
