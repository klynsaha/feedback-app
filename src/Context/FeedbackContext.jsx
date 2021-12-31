import { createContext, useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";

const FeedbackContext = createContext();

export const FeedbackProvider = ({ children }) => {
    const [isLoading, setIsLoading] = useState(true);
    const [feedbacks, setFeedbacks] = useState([]);
    const [feedbackEdit, setFeedbackEdit] = useState({
        feedback: {},
        edit: false,
    });

    useEffect(async () => {
        const response = await fetch(
            "http://localhost:5001/Feedback?_sort=id&_order=desc"
        );
        const data = await response.json();
        setFeedbacks(data);
        setIsLoading(false);
    }, []);

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
                isLoading,
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
