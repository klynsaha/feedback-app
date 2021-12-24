import React from "react";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import FeedbackList from "./components/FeedbackList";
import FeedbackStats from "./components/FeedbackStats";
import FeedbackForm from "./components/FeedbackForm";
import FeedbackData from "./data/FeedbackData";
import AboutPage from "./pages/AboutPage";

function App() {
    const [feedbacks, setFeedbacks] = useState(FeedbackData);

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

    return (
        <Router>
            <Header />
            <div className="container">
                <Routes>
                    <Route
                        exact
                        path="/"
                        element={
                            <>
                                <FeedbackForm handleAdd={addFeedback} />
                                <FeedbackStats feedbacks={feedbacks} />
                                <FeedbackList
                                    feedbacks={feedbacks}
                                    handleDelete={deleteFeedback}
                                />
                            </>
                        }
                    ></Route>
                    <Route exact path="/about" element={<AboutPage />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
