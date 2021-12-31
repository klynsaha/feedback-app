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
        const response = await fetch("/feedback?_sort=id&_order=desc");
        const data = await response.json();

        setFeedbacks(data);
        setIsLoading(false);
    }, []);

    const addFeedback = async (newFeedback) => {
        const response = await fetch("/feedback", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newFeedback),
        });
        const data = await response.json();

        setFeedbacks([data, ...feedbacks]);
    };

    const deleteFeedback = async (id) => {
        if (!window.confirm("Are you sure you want to delete ?")) return;
        await fetch(`/feedback/${id}`, {
            method: "DELETE",
        });

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

    const updateFeedback = async (id, updatedFeedback) => {
        const response = await fetch(`/feedback/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(updatedFeedback),
        });
        const data = await response.json();

        setFeedbacks(
            feedbacks.map((item) =>
                item.id === id ? { ...item, ...data } : item
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
