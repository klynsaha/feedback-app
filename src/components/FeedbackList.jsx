import { motion, AnimatePresence } from "framer-motion";
import React from "react";
import { useContext } from "react";
import FeedbackContext from "../Context/FeedbackContext";
import FeedbackItem from "./FeedbackItem";

function FeedbackList() {
    const { feedbacks } = useContext(FeedbackContext);

    if (!feedbacks || !feedbacks.length) return <div>No Feedback yet!</div>;
    return (
        <div className="feedback-list">
            <AnimatePresence>
                {feedbacks.map((feedback) => (
                    <motion.div
                        key={feedback.id}
                        inital={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    >
                        <FeedbackItem key={feedback.id} feedback={feedback} />
                    </motion.div>
                ))}
            </AnimatePresence>
        </div>
    );
}

export default FeedbackList;
