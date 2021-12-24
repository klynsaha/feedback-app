import Card from "../components/common/Card";

function AboutPage() {
    return (
        <Card>
            <div className="about">
                <h1>About</h1>
                <p>This is about page</p>
                <p>Version: 1.0.0</p>
                <a href="/">Go back to Home</a>
            </div>
        </Card>
    );
}

export default AboutPage;
