import Card from "../components/common/Card";
import { Link } from "react-router-dom";

function AboutPage() {
    return (
        <Card>
            <div className="about">
                <h1>About</h1>
                <p>This is about page</p>
                <p>Version: 1.0.0</p>
                <Link to="/">Go back to Home</Link>
            </div>
        </Card>
    );
}

export default AboutPage;
