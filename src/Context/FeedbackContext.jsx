import { createContext, useState } from "react";
import FeedbackData from "../data/FeedbackData";
import { v4 as uuidv4 } from "uuid";

const FeedbackContext = createContext();

export const FeedbackProvider = ({ children }) => {
    const [feedbacks, setFeedbacks] = useState(FeedbackData);
    const [feedbackEdit, setFeedbackEdit] = useState({
        feedback: {},
        edit: false,
    });

    const addFeedback = (newFeedback) => {
        console.log(newFeedback);
        newFeedback.id = uuidv4();
        setFeedbacks([newFeedback, ...feedbacks]);
    };

    const deleteFeedback = (id) => {
        if (!window.confirm("Are you sure you want to delete ?")) return;
        setFeedbacks((feedbacks) => {
            return feedbacks.filter((feedback) => feedback.id !== id);
        });
    };

    const editFeedback = (feedback) => {
        setFeedbackEdit({
            feedback,
            edit: true,
        });
    };

    const updateFeedback = (id, updatedFeedback) => {
        setFeedbacks(
            feedbacks.map((item) =>
                item.id === id ? { ...item, ...updatedFeedback } : item
            )
        );
    };

    return (
        <FeedbackContext.Provider
            value={{
                feedbacks,
                feedbackEdit,
                addFeedback,
                deleteFeedback,
                editFeedback,
                updateFeedback,
            }}
        >
            {children}
        </FeedbackContext.Provider>
    );
};

export default FeedbackContext;
